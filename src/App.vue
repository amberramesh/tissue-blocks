<template>
  <div id="app">
    <label for="source">Source: </label>
    <select id="source" v-model="selectedConfig" @change="loadDataset">
      <option v-for="c, i in configOptions" :key="i" :value="i">{{ c.label }}</option>
    </select>
    <br /><br />
    <div v-if="result">
      <label for="selected_cell_type">Sort By: </label>
      <select id="selected_cell_type" v-model="sortBy" @change="specAndEmbed">
        <option v-for="name, i in cellTypes" :key="i" :value="name">{{ name }}</option>
      </select>
      &nbsp;
      <select id="order_type" v-model="orderType" @change="specAndEmbed">
        <option selected :value="OrderType.Ascending">Ascending</option>
        <option :value="OrderType.Descending">Descending</option>
      </select>
      <br /><br />
      <label for="group_by">Group By: </label>
      <select id="group_by" v-model="groupBy" @change="specAndEmbed">
        <option v-for="group, i in groupOptions" :key="i" :value="group.value">{{ group.name }}</option>
      </select>
      <br /><br />
      <div>
        <label>Y-Axis: </label>
        <input type="radio" id="raw_count" name="yAxisAttr" value="count" v-model="yAxisAttr" @change="specAndEmbed">
        <label for="raw_count">Raw Count</label>
        <input type="radio" id="percentage" name="yAxisAttr" value="percentage" v-model="yAxisAttr" @change="specAndEmbed">
        <label for="percentage">Percentage</label>
      </div>
    </div>
    <div v-else><small style="color: gray">Working...</small></div>
    <div id="vis"></div>
  </div>
</template>

<script>
import { OrderType, GroupType, Configs } from './constants'
import embed from 'vega-embed'
import { parse } from 'papaparse'

export default {
  name: 'App',
  data() {
    return {
      yAxisAttr: 'count',
      sortBy: 'None',
      orderType: OrderType.Ascending,
      cellTypes: [],
      graphData: [],
      groupBy: GroupType.None,
      selectedConfig: 0,
      configOptions: Configs,
      result: null,
      OrderType
    }
  },
  computed: {
    yAxisLabel() {
      return this.yAxisAttr === 'count' ? 'Cell Count' : 'Cell Proportion'
    }
  },
  methods: {
    async getCsv(url) {
      return new Promise((resolve, reject) => {
        parse(url, {
          download: true,
          delimiter: ',',
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            resolve(result.data)
          },
          error: reject
        })
      })
    },
    async loadDataset() {
      // Reinitialize canvas and all parameters
      if (this.result) {
        this.result.finalize()
        this.result = null
      }
      this.config = Configs[this.selectedConfig]
      this.graphData.splice(0, this.graphData.length)
      this.cellTypes.splice(0, this.cellTypes.length)
      this.sortBy = 'None'
      this.groupBy = GroupType.None
      const uniqueCTs = new Set()
      
      this.groupOptions = Object.entries(this.config.groupTypes)
        .reduce((types, [name, value]) => {
          types.push({ name, value })
          return types
        }, [{
          name: 'None',
          value: GroupType.None
        }])

      // Create master list of all datasets
      for (const [index, title] of this.config.datasets.entries()) {
        const csvData = await this.getCsv(`${this.config.basePath}${title}.csv`)
        csvData.forEach(row => {
          row['dataset'] = title
          row['index'] = index
          uniqueCTs.add(row['cell_type'])
          this.graphData.push(row)
        })
      }

      this.cellTypes = ['None'].concat(Array.from(uniqueCTs).sort())

      // Create a Vega spec and embed component
      this.specAndEmbed()
    },
    /**
     * Common function to respec Vega, for simplicity
     */
    async specAndEmbed() {
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "data": {
          "values": this.graphData
        },
        "width": {
          "step": 50
        },
        "height": 650,
        "mark": {
          "type": "bar",
          "tooltip": true
        },
        "encoding": {
          "facet": this.groupBy === GroupType.None ? null : {
            "field": this.groupBy,
            "type": "ordinal",
            "spacing": 10,
            "sort": {
              "field": "order",
              "op": "sum",
              "order": this.orderType
            }
          },
          "x": {
            "field": "dataset",
            "title": "Dataset",
            "sort": {
              "field": "order",
              "op": "sum",
              "order": this.orderType
            },
            "type": "nominal",
            "axis": {
              "labelAngle": -25
            },
            "spacing": 70
          },
          "y": {
            "field": this.yAxisAttr,
            "aggregate": "sum",
            "title": this.yAxisLabel,
            "scale": {
              "domain": this.yAxisAttr === 'percentage' ? [0, 100] : null
            }
          },
          "color": {
            "field": "cell_type",
            "type": "nominal",
            "scale": {
              "domain": this.cellTypes.slice(1),
              "range": Array.from(this.config.colorPalette).reverse().slice(0, this.cellTypes.length - 1)
            },
            "title": "Cell Type",
            "legend": {
              "symbolLimit": 100,
              "columns": Math.ceil(this.cellTypes.length / 30)
            }
          }
        },
        "title": {
          "text": "Cell Type Count Comparison",
          "anchor": "middle",
          "fontSize": 18
        },
        "transform": [
          {
            "calculate": `datum.index < ${this.config.fixed} ? 
              ${this.orderType === OrderType.Ascending ? 0 : Number.MAX_SAFE_INTEGER } - datum.index : 
              datum.cell_type == '${this.sortBy}' ? 
              datum.${this.yAxisAttr} : 0`,
            "as": "order"
          }
        ],
        "resolve": {
          "scale": {
            "x": "independent"
          }
        }
      }
      this.result = await embed('#vis', spec)
    }
  },
  async mounted() {
    this.loadDataset()
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
#vis {
  margin: 40px;
}
</style>
