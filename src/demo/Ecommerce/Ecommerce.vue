<template>
  <div class="grid grid-cols-12 gap-4 md:gap-6">
    <div class="col-span-12 space-y-6 xl:col-span-7">
      <ecommerce-metrics />
      <monthly-sale />
    </div>
    <div class="col-span-12 xl:col-span-5">
      <monthly-target />
    </div>

    <div class="col-span-12">
      <statistics-chart />
    </div>

    <div class="col-span-12 xl:col-span-5">
      <customer-demographic />
    </div>

    <div class="col-span-12 xl:col-span-7">
      <recent-orders />
    </div>
  </div>
</template>

<script>
import EcommerceMetrics from './EcommerceMetrics.vue'
import MonthlyTarget from './MonthlyTarget.vue'
import MonthlySale from './MonthlySale.vue'
import CustomerDemographic from './CustomerDemographic.vue'
import StatisticsChart from './StatisticsChart.vue'
import RecentOrders from './RecentOrders.vue'
export default {
  components: {
    EcommerceMetrics,
    MonthlyTarget,
    MonthlySale,
    CustomerDemographic,
    StatisticsChart,
    RecentOrders,
  },
  name: 'Ecommerce',
}
</script>

