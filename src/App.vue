<template>
  <div id="app">
    <canvas ref="stackedBars" width="1600" height="1000"></canvas>
  </div>
</template>

<script>
import { csv } from 'd3-fetch'

const datasets = [
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
const BASE_URL = 'specimen_data/'

export default {
  name: 'App',
  data() {
    return {
      chart: null
    }
  },
  methods: {
    getRandomColor() {
      return `#${parseInt(Math.random() * (Math.pow(16, 6))).toString(16).padStart(6, '0')}`;
    }
  },
  async mounted() {
    const graphData = [];
    let cellTypes = new Set();
    for (const data of datasets) {
      const csvData = await csv(`${BASE_URL}${data}.csv`);
      csvData.forEach(row => {
        cellTypes.add(row['Cell Type'])
      })
      graphData.push(csvData);
    }
    cellTypes = Array.from(cellTypes).sort();

    const ctx = this.$refs.stackedBars.getContext('2d');
    const chartObj = {
      type: 'bar',
      data: {
        labels: datasets,
        datasets: cellTypes.map(label => {
          return {
            label,
            data: datasets.map((_, i) => {
              const cellObj = graphData[i].find(obj => obj['Cell Type'] === label)
              return cellObj ? cellObj['Count'] : 0
            }),
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
          },
          y: {
            stacked: true
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
