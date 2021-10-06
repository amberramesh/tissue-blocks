<template>
  <div id="app">
    <input type="radio" id="raw_count" name="barYProp" value="count" v-model="barYProp">
    <label for="raw_count">Raw Count</label>
    <input type="radio" id="percentage" name="barYProp" value="percentage" v-model="barYProp">
    <label for="percentage">Percentage</label>
    <canvas ref="stackedBars" width="1600" height="1000"></canvas>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'

const datasets = [
  'ASCT+B',
  'Azimuth_L3',
  'K1900174_2',
  '18-162-2-M2',
  '18-142-3-M2',
  '18-312-2-M2',
  'K1900175_1_R1',
  'K1800430_3_R3',
  'K1900019_1_R3',
  'K1900387_1_R1',
  'K1900387_4_R1',
  'K2000094_2_R1',
  '446_B3',
  'K1800364_1',
  '446_B1',
  'KRP460C-1',
  'KRP460P-1',
  'KRP461C-1',
  'KRP462C-1',
  'KRP462P-1'
]
const colorPalette = [
  '#db95cd',
  '#c8feba',
  '#ddb1f6',
  '#c2db90',
  '#f8b8f6',
  '#99d99d',
  '#a5a6e4',
  '#e1e294',
  '#3bb7ed',
  '#eda17a',
  '#6efcfa',
  '#ffa498',
  '#2ecdce',
  '#e395ad',
  '#98ffdf',
  '#dd99a2',
  '#87fff1',
  '#ffb1b5',
  '#2ebfb2',
  '#d3a36a',
  '#6bb2ed',
  '#ffe79f',
  '#8dc5ff',
  '#c0b46a',
  '#d5cfff',
  '#80e2b9',
  '#cf9fa8',
  '#beffd4',
  '#cfa19a',
  '#87f0ff',
  '#d2a186',
  '#42bbcc',
  '#ffd2a3',
  '#9ddfff',
  '#fff5b5',
  '#b7d4ff',
  '#e1ffca',
  '#ffd4e4',
  '#6ebb96',
  '#ffd2c1',
  '#71b6c3',
  '#c8a580',
  '#c0fff8',
  '#c8a491',
  '#ddffe6',
  '#bca98f',
  '#d6e8ff',
  '#87b78b',
  '#fdf7ff',
  '#a3b090',
  '#fff8ee',
  '#89b3ba',
  '#f7ffeb',
  '#aeaba5',
  '#9fb0a0'
];
const BASE_URL = 'specimen_data/';

export default {
  name: 'App',
  data() {
    return {
      chart: null,
      colorPalette: [...colorPalette],
      cellMap: new Map(),
      barYProp: 'count'
    }
  },
  computed: {
    cellCountText() {
      return this.barYProp === 'count' ? 'Cell Count' : 'Cell Proportion'
    }
  },
  methods: {
    getRandomColor() {
      return this.colorPalette.length ? this.colorPalette.pop() : `#${parseInt(Math.random() * (Math.pow(16, 6))).toString(16).padStart(6, '0')}`;
    },
    getOrdering(cellType) {
      return Array.from(this.cellMap.get(cellType))
        .sort((a, b) => a[this.barYProp] - b[this.barYProp])
        .map(cellProps => cellProps.positionId)
    }
  },
  watch: {
    barYProp() {
      this.chart.data.datasets.forEach(d => {
        d.data.splice(0, d.data.length, ...this.cellMap.get(d.label).map(cellProps => cellProps[this.barYProp]))
      })
      this.chart.options.scales.y.max = this.barYProp === 'percentage' ? 100 : null
      this.chart.options.scales.y.title.text = this.cellCountText
      this.chart.update()
    }
  },
  async mounted() {
    this.cellMap.clear()
    this.colorPalette.splice(0, this.length, ...colorPalette);
    const graphData = [];
    let cellTypes = new Set();
    for (const data of datasets) {
      const csvData = await csv(`${BASE_URL}${data}.csv`);
      csvData.forEach(row => {
        cellTypes.add(row['cell_type'])
      })
      graphData.push(csvData);
    }
    cellTypes = Array.from(cellTypes).sort()
    // 3D Map of cell types vs. attributes over each dataset
    // Third-dimension is the dataset object rather than another array
    cellTypes.forEach(ct => {
      // Array of d objects where d is number of datasets
      const cellXDatasets = []
      for (const [index, dataset] of graphData.entries()) {
        const cellProps = dataset.find(obj => obj['cell_type'] === ct) || {}
        cellProps.positionId = index
        cellXDatasets.push(cellProps)
      }
      this.cellMap.set(ct, cellXDatasets)
    })

    const ctx = this.$refs.stackedBars.getContext('2d');
    const chartObj = {
      type: 'bar',
      data: {
        labels: datasets,
        datasets: cellTypes.map(label => {
          return {
            label,
            data: this.cellMap.get(label).map(cellProps => cellProps[this.barYProp]),
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
              text: this.cellCountText
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
