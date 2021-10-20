<template>
  <div id="app">
    <label for="selected_cell_type">Sort By: </label>
    <select id="selected_cell_type" v-model="selectedCellType" @change="reorderAndUpdate">
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
      <option v-for="group, i in GroupType" :key="i" :value="group.value">{{ group.name }}</option>
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
import { BASE_URL, datasets, colorPaletteSmall, OrderType, GroupType } from './constants'

export default {
  name: 'App',
  data() {
    return {
      chart: null,
      colorPalette: [...colorPaletteSmall],
      cellMap: new Map([['None', []]]),
      yAxisAttr: 'count',
      selectedCellType: 'None',
      orderType: OrderType.Ascending,
      cellTypes: [],
      groupBy: GroupType.None,
      GroupType: Object.entries(GroupType)
        .reduce((types, [name, value]) => {
          types.push({ name, value })
          return types
        }, [])
    }
  },
  computed: {
    yAxisLabel() {
      return this.yAxisAttr === 'count' ? 'Cell Count' : 'Cell Proportion'
    }
  },
  methods: {
    getRandomColor() {
      return this.colorPalette.length ? this.colorPalette.pop() : `#${parseInt(Math.random() * (Math.pow(16, 6))).toString(16).padStart(6, '0')}`;
    },
    getOrdering() {
      const orderedDatasets = this.cellMap.get(this.selectedCellType)
        // Exclude ASCT+B and Azimuth bars while ordering
        .slice(1)
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
      ordering = [0].concat(
        this.orderType === OrderType.Ascending ? ordering : ordering.reverse())
      this.chart.data.datasets.forEach(d => {
        const datasets = this.cellMap.get(d.label)
        const orderedDatasets = ordering.map(i => datasets[i])
        d.data.splice(0, d.data.length, ...orderedDatasets.map(cellProps => cellProps[this.yAxisAttr]))
      })
      this.chart.data.labels.splice(0, datasets.length, ...ordering.map(i => {
        if (this.groupBy !== GroupType.None) {
          return datasets[i] + ` (${this.cellMap.get(this.selectedCellType)[i][this.groupBy]})`
        }
        return datasets[i]
      }))
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
    this.cellMap.clear()
    this.colorPalette.splice(0, this.length, ...colorPaletteSmall);
    const graphData = [];
    let cellTypes = new Set();
    // Unsorted initial dataset
    for (const [, title] of datasets.entries()) {
      const csvData = await csv(`${BASE_URL}${title}.csv`);
      csvData.forEach(row => {
        cellTypes.add(row['cell_type'])
      })
      graphData.push(csvData);
    }
    this.cellTypes = Array.from(cellTypes).sort()
    // Add 'None' type for default ordering
    this.cellTypes.splice(0, 0, 'None')
    // 3D Map of cell types vs. attributes over each dataset
    // Third-dimension is the dataset object rather than another array
    this.cellTypes.forEach(ct => {
      // Array of d objects where d is number of datasets
      const cellXDatasets = []
      for (const [id, dataset] of graphData.entries()) {
        const cellProps = dataset.find(obj => obj['cell_type'] === ct) || {}
        const { sex, race, age, cat, exp  } = dataset[0] || {}
        Object.assign(cellProps, {
          id,
          sex,
          race,
          age,
          cat,
          exp
        })
        cellXDatasets.push(cellProps)
      }
      this.cellMap.set(ct, cellXDatasets)
    })

    const ctx = this.$refs.stackedBars.getContext('2d');
    const chartObj = {
      type: 'bar',
      data: {
        labels: [...datasets],
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
            }
          },
          y: {
            stacked: true,
            title: {
              display: true,
              text: this.yAxisLabel
            }
          }
        }
      }
    };
    // eslint-disable-next-line
    this.chart = new Chart(ctx, chartObj);
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
