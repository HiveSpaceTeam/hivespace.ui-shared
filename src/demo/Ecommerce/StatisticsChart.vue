<template>
  <div
    class="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
    <div class="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
      <div class="w-full">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
        <p class="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Target you’ve set for each month
        </p>
      </div>

      <div class="relative">
        <div class="flex items-center gap-6">
          <Tabs :options="options" v-model="selected" />
          <Tabs :options="options" v-model="selected" variant="pills" />
        </div>
      </div>
    </div>
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartThree" class="-ml-4 min-w-[1000px] xl:min-w-full pl-2">
        <VueApexCharts type="area" height="310" :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Tabs } from '@hivespace/shared'

const options = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
]

const selected = ref('monthly')
import VueApexCharts from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'

const monthlyData = [
  { name: 'Sales', data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] },
  { name: 'Revenue', data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140] },
]

const quarterlyData = [
  { name: 'Sales', data: [200, 220, 210, 230] },
  { name: 'Revenue', data: [60, 70, 65, 80] },
]

const annuallyData = [
  { name: 'Sales', data: [1500, 1800] },
  { name: 'Revenue', data: [500, 600] },
]

const series = ref(monthlyData)

watch(selected, (newValue) => {
  if (newValue === 'monthly') {
    series.value = monthlyData
  } else if (newValue === 'quarterly') {
    series.value = quarterlyData
  } else if (newValue === 'annually') {
    series.value = annuallyData
  }
})

const chartOptions = ref<ApexOptions>({
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#465FFF', '#9CB9FF'],
  chart: {
    fontFamily: 'Inter, sans-serif',
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  fill: {
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
    },
  },
  stroke: {
    curve: 'straight',
    width: [2, 2],
  },
  markers: {
    size: 0,
  },

  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
  },
})
</script>

<style scoped>
.area-chart {
  width: 100%;
}
</style>

