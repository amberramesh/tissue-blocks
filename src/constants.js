const Source = {
  AzimuthKidney: 'Azimuth Kidney',
  GESkin: 'GE Skin',
  CellarLymphNode: 'Cellar Lymph Node'
}

const OrderType = {
  Ascending: 'asc',
  Descending: 'desc'
}

const GroupType = {
  None: 'none',
  Sex: 'sex',
  Ethnicity: 'race',
  Age: 'age',
  Category: 'cat',
  Exposure: 'exp'
}

// Colors from https://medialab.github.io/iwanthue/
const colorPaletteLarge = [
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
]

const colorPaletteSmall = [
  "#363d36",
  "#77d445",
  "#7240cc",
  "#cacc48",
  "#cc4ec8",
  "#6ece85",
  "#482d79",
  "#c78941",
  "#7d78d2",
  "#d74e2a",
  "#7ac9c3",
  "#cd4858",
  "#5a743a",
  "#c54c8b",
  "#cbc896",
  "#572c4d",
  "#cba9d5",
  "#723726",
  "#5f87a9",
  "#bd8686"
]

const Configs = [
  {
    label: Source.AzimuthKidney,
    basePath: 'specimen_data/azimuth_kidney/',
    datasets: [
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
    ],
    groupTypes: {
      Sex: GroupType.Sex,
      Ethnicity: GroupType.Ethnicity
    },
    fixed: 2,
    colorPalette: colorPaletteLarge
  },
  {
    label: Source.GESkin,
    basePath: 'specimen_data/ge_skin/',
    datasets: [
      'region_12',
      'region_1',
      'region_2',
      'region_3',
      'region_4',
      'region_5',
      // 'region_6',
      'region_7',
      'region_8',
      'region_9',
      'region_10',
      'region_11'
    ],
    groupTypes: {
      Sex: GroupType.Sex,
      Age: GroupType.Age,
      Category: GroupType.Category,
      Exposure: GroupType.Exposure
    },
    fixed: 1,
    colorPalette: colorPaletteSmall
  },
  {
    label: Source.CellarLymphNode,
    basePath: 'specimen_data/cellar_lymph_node/',
    datasets: [
      'CODEX_Florida_19-003-lymph-node-R2',
      // 'CODEX_Florida_20-008-lymphnode10_lefthalf',
      'CODEX_Florida_20-008-lymphnode10_righthalf'
    ],
    groupTypes: {},
    fixed: 0,
    colorPalette: colorPaletteSmall
  }
]

export {
  GroupType,
  OrderType,
  Configs
}
