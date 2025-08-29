type ColumnOption = {
  key: string;
  label: string;
};

export const columnOptions: ColumnOption[] = [
  { key: 'cement_co2', label: 'Cement CO₂' },
  { key: 'co2_growth_abs', label: 'CO₂ Growth Abs' },
  { key: 'co2_growth_prct', label: 'CO₂ Growth Prct.' },
  { key: 'co2_including_luc', label: 'CO₂ Including Luc' },
  {
    key: 'co2_including_luc_growth_abs',
    label: 'CO₂ Including Luc Growth Abs',
  },
  {
    key: 'co2_including_luc_growth_prct',
    label: 'CO₂  Including Luc Growth Prct',
  },
  {
    key: 'co2_including_luc_per_capita',
    label: 'CO₂ Including Luc Per Capita',
  },
  { key: 'coal_co2', label: 'Coal CO2' },
  { key: 'coal_co2_per_capita', label: 'Coal CO2 Per Capita' },
  { key: 'cumulative_cement_co2', label: 'Cumulative Cement CO2' },

  { key: 'cumulative_luc_co2', label: 'Cumulative Luc CO2' },
  { key: 'cumulative_co2', label: 'Cumulative CO2' },
  {
    key: 'cumulative_co2_including_luc',
    label: 'Cumulative CO2 Including Luc',
  },
  { key: 'cumulative_coal_co2', label: 'Cumulative Coal CO2' },
  { key: 'cumulative_gas_co2', label: 'Cumulative Gas CO2' },
  { key: 'cumulative_oil_co2', label: 'Cumulative Oil CO2' },
  { key: 'flaring_co2', label: 'Flaring CO2' },
  { key: 'flaring_co2_per_capita', label: 'Flaring CO2 Per Capita' },
  { key: 'gas_co2', label: 'Gas CO2' },
  { key: 'gas_co2_per_capita', label: 'Gas CO2 Per Capita' },
  {
    key: 'ghg_excluding_lucf_per_capita',
    label: 'Ghg Excluding Lucf Per Capita',
  },
  { key: 'ghg_per_capita', label: 'Ghg Per Capita' },
  { key: 'gdp', label: 'Gdp' },
  { key: 'land_use_change_co2', label: 'Land Use Change CO2' },
  {
    key: 'land_use_change_co2_per_capita',
    label: 'Land Use Change CO2 Per Capita',
  },
  { key: 'methane', label: 'Methane' },
  { key: 'methane_per_capita', label: 'Methane Per Capita' },
  { key: 'nitrous_oxide', label: 'Nitrous Oxide' },
  { key: 'nitrous_oxide_per_capita', label: 'Nitrous Oxide Per Capita' },
  { key: 'oil_co2', label: 'Oil CO2' },
  { key: 'oil_co2_per_capita', label: 'Oil CO2 Per Capita' },
] as const;
