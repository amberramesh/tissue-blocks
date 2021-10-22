<template>
  <div id="app">
    <label for="source">Source: </label>
    <select id="source" v-model="selectedConfig" @change="initGraph">
      <option v-for="c, i in allConfigs" :key="i" :value="i">{{ c.label }}</option>
    </select>
    <br /><br />
    <label for="selected_cell_type">Sort By: </label>
    <select id="selected_cell_type" v-model="sortBy" @change="reorderAndUpdate">
      <option v-for="name, i in cellTypes" :key="i" :value="name">{{ name }}</option>
    </select>
    &nbsp;
    <select id="order_type" v-model="orderType" @change="reorderAndUpdate">
      <option selected value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
    <br /><br />
    <label for="group_by">Group By: </label>
    <select id="group_by" v-model="groupBy" @change="reorderAndUpdate">
      <option v-for="group, i in groupTypes" :key="i" :value="group.value">{{ group.name }}</option>
    </select>
    <br /><br />
    <label>Y-Axis: </label>
    <input type="radio" id="raw_count" name="yAxisAttr" value="count" v-model="yAxisAttr">
    <label for="raw_count">Raw Count</label>
    <input type="radio" id="percentage" name="yAxisAttr" value="percentage" v-model="yAxisAttr">
    <label for="percentage">Percentage</label>
    <canvas id="stackedBars" ref="stackedBars" width="1280" height="720"></canvas>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'
import { OrderType, GroupType, Configs } from './constants'
import pick from 'lodash.pick'

export default {
  name: 'App',
  data() {
    return {
      chart: null,
      colorPalette: [],
      cellMap: new Map([['None', []]]),
      yAxisAttr: 'count',
      sortBy: 'None',
      orderType: OrderType.Ascending,
      cellTypes: [],
      groupBy: GroupType.None,
      selectedConfig: 0,
      allConfigs: Configs
    }
  },
  computed: {
    config() {
      return Configs[this.selectedConfig]
    },
    yAxisLabel() {
      return this.yAxisAttr === 'count' ? 'Cell Count' : 'Cell Proportion'
    },
    groupTypes() {
      return Object.entries(this.config.groupTypes)
        .reduce((types, [name, value]) => {
          types.push({ name, value })
          return types
        }, [{
          name: 'None',
          value: GroupType.None
        }])
    }
  },
  methods: {
    getRandomColor() {
      return this.colorPalette.length ? this.colorPalette.pop() : `#${parseInt(Math.random() * (Math.pow(16, 6))).toString(16).padStart(6, '0')}`;
    },
    getOrdering() {
      const orderedDatasets = this.cellMap.get(this.sortBy)
        // Exclude ASCT+B and Azimuth bars while ordering
        .slice(this.config.fixed)
        .sort((d1, d2) => parseFloat(d1[this.yAxisAttr] || 0) - parseFloat(d2[this.yAxisAttr] || 0))
      if (this.groupBy !== GroupType.None) {
        orderedDatasets.sort((d1, d2) => {
          if (Number.isInteger(parseInt(d1[this.groupBy]))) {
            return parseInt(d1[this.groupBy]) - parseInt(d2[this.groupBy])
          }
          return (d1[this.groupBy] ?? '').localeCompare(d2[this.groupBy] ?? '')
        })
      }
      return orderedDatasets.map(dataset => dataset.id)
    },
    reorderDatasets() {
      let ordering = this.getOrdering()
      ordering = Array(this.config.fixed).fill().map((_, i) => i).concat(
        this.orderType === OrderType.Ascending ? ordering : ordering.reverse())
      this.chart.data.datasets.forEach(d => {
        const datasets = this.cellMap.get(d.label)
        const orderedDatasets = ordering.map(i => datasets[i])
        d.data.splice(0, d.data.length, ...orderedDatasets.map(cellProps => cellProps[this.yAxisAttr]))
      })
      this.chart.data.labels.splice(0, this.config.datasets.length, ...ordering.map(i => {
        if (this.groupBy !== GroupType.None) {
          const group = this.cellMap.get(this.sortBy)[i][this.groupBy]
          return this.config.datasets[i] + (group ? ` (${group})` : '')
        }
        return this.config.datasets[i]
      }))
    },
    async initGraph() {
      // Reset all parameters
      if (this.chart) {
        this.chart.destroy()
      }
      this.sortBy = 'None'
      this.groupBy = GroupType.None
      this.orderType = OrderType.Ascending
      this.cellMap.clear()
      this.colorPalette.splice(0, this.colorPalette.length, ...this.config.colorPalette)
      const graphData = []
      const cellTypes = new Set()

      // Create map from unsorted initial dataset
      for (const title of this.config.datasets) {
        const csvData = await csv(`${this.config.basePath}${title}.csv`)
        csvData.forEach(row => {
          cellTypes.add(row['cell_type'])
        })
        graphData.push(csvData)
      }
      // Add 'None' type for default ordering
      // Then append the sorted cell names across all datasets
      this.cellTypes = ['None'].concat(Array.from(cellTypes).sort())
      // 3D Map of cell types vs. attributes over each dataset
      // Third-dimension is the dataset object rather than another array
      this.cellTypes.forEach(ct => {
        // Array of d objects where d is number of datasets
        const cellXDatasets = []
        for (const [id, dataset] of graphData.entries()) {
          const cellProps = dataset.find(obj => obj['cell_type'] === ct) || {}
          const groupProps = dataset.find(obj => Object.values(this.config.groupTypes).every(group => group in obj)) || {}
          Object.assign(cellProps, {
            id,
            ...pick(groupProps, Object.values(this.config.groupTypes))
          })
          cellXDatasets.push(cellProps)
        }
        this.cellMap.set(ct, cellXDatasets)
      })

      const ctx = this.$refs.stackedBars.getContext('2d');
      const chartObj = {
        type: 'bar',
        data: {
          labels: [...this.config.datasets],
          // Exclude 'None' type while creating datasets
          datasets: this.cellTypes.slice(1).map(label => {
            return {
              label,
              data: this.cellMap.get(label).map(cellProps => cellProps[this.yAxisAttr]),
              backgroundColor: this.getRandomColor()
            }
          })
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Cell Type Count Comparison'
            },
            legend: {
              position: 'right'
            }
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Datasets'
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: this.yAxisLabel
              },
              max: this.yAxisAttr === 'percentage' ? 100 : null
            }
          }
        }
      };
      // eslint-disable-next-line
      this.chart = new Chart(ctx, chartObj);
    },
    reorderAndUpdate() {
      this.reorderDatasets()
      this.chart.update()
    }
  },
  watch: {
    yAxisAttr() {
      this.chart.options.scales.y.max = this.yAxisAttr === 'percentage' ? 100 : null
      this.chart.options.scales.y.title.text = this.yAxisLabel
      this.reorderAndUpdate()
    }
  },
  async mounted() {
    this.initGraph()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
