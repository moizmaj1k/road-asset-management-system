<template>
  <div class="card flex justify-center gap-8">
    <!-- First Chart -->
    <div class="">
      <h3 class="charts-heading mb-2 ml-14 mt-4">Categorized Traffic</h3>
      <Chart
        type="doughnut"
        :data="chartDataCategorizedTraffic"
        :options="chartOptionsCategorizedTraffic"
        class="w-[28rem] h-[20rem]"
      />
    </div>

    <!-- Second Chart -->
    <div class="">
      <h3 class="charts-heading mb-8 ml-80 mt-4">Traffic Forecast</h3>
      <Chart
        type="line"
        :data="chartDataYearlyTraffic"
        :options="chartOptionsYearlyTraffic"
        class="w-[40rem] h-[20rem] ml-14"
      />
    </div>
    <!-- Third Chart -->

    <div class="">
      <h3 class="charts-heading mb-2 ml-28 mt-4">Directional Traffic</h3>
      <Chart
        type="pie"
        :data="chartDataDirectionalTraffic"
        :options="chartOptionsDirectionalTraffic"
        class="w-[24rem] h-[20rem] ml-14"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
onMounted(() => {
  chartDataCategorizedTraffic.value = setChartDataForCategorizedTraffic();
  chartOptionsCategorizedTraffic.value = setChartOptionsForCategorizedTraffic();
  chartDataDirectionalTraffic.value = setChartDataForDirectionalTraffic();
  chartOptionsDirectionalTraffic.value = setChartOptionsForDirectionalTraffic();
  chartDataYearlyTraffic.value = setChartDataForYearlyTraffic();
  chartOptionsYearlyTraffic.value = setChartOptionsForYearlyTraffic();
});

const chartDataCategorizedTraffic = ref();
const chartOptionsCategorizedTraffic = ref(null);
const chartDataDirectionalTraffic = ref();
const chartOptionsDirectionalTraffic = ref(null);
const chartDataYearlyTraffic = ref();
const chartOptionsYearlyTraffic = ref(null);

const setChartDataForCategorizedTraffic = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: [
      "Motorcycle",
      "Rickshaw",
      "Car/Jeep/SUV",
      "Wagon/Hiace",
      "Coaster/Bus",
      "Mazda/Shehzore/Mini Truck",
      "2-Axle Truck",
      "3-Axle Truck",
      "4-Axle Truck",
      "5-Axle Truck",
      "6-Axle Truck",
      "Tractor Trolley",
    ],
    datasets: [
      {
        data: [540, 325, 702, 450, 230, 120, 340, 200, 150, 100, 80, 60],
        backgroundColor: [
          "#06b6d4",
          "#f97316",
          "#6b7280",
          "#4ade80",
          "#fbbf24",
          "#f472b6",
          "#a78bfa",
          "#60a5fa",
          "#34d399",
          "#f87171",
          "#fbbf24",
          "#f472b6",
        ], // cyan, orange, gray
        hoverBackgroundColor: [
          "#22d3ee",
          "#fb923c",
          "#9ca3af",
          "#86efac",
          "#fde68a",
          "#f9a8d4",
          "#c4b5fd",
          "#93c5fd",
          "#6ee7b7",
          "#fca5a5",
          "#fde68a",
          "#f9a8d4",
        ],
      },
    ],
  };
};

const setChartOptionsForCategorizedTraffic = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // 👈 move legend to the left
        labels: {
          color: textColor,
        },
      },
    },
    cutout: "20%", // 👈 cutout should be at root level, not inside labels
  };
};

const setChartDataForYearlyTraffic = () => {
  return {
    labels: [
      "2025",
      "2026",
      "2027",
      "2028",
      "2029",
      "2030",
      "2031",
      "2032",
      "2033",
      "2034",
      "2035",
    ], // x-axis: years
    datasets: [
      {
        label: "Total",
        data: [
          8000, 8398, 8900, 9440, 10000, 10550, 11200, 11700, 12400, 13150,
          13600,14600
        ], // y-axis values
        borderColor: "#06b6d4", // cyan
        backgroundColor: "rgba(6, 182, 212, 0.2)", // lighter fill under line
        fill: true,
        tension: 0.3, // smooth curve
      },
    ],
  };
};

const setChartOptionsForYearlyTraffic = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const gridColor = documentStyle.getPropertyValue("--p-content-border-color");

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: false,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        min: 3000,
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };
};

const setChartDataForDirectionalTraffic = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Northbound", "Southbound"],
    datasets: [
      {
        data: [540, 325],
        backgroundColor: ["#06b6d4", "#f97316"], // cyan, orange
        hoverBackgroundColor: ["#22d3ee", "#fb923c"],
      },
    ],
  };
};

const setChartOptionsForDirectionalTraffic = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // 👈 move legend to the left
        labels: {
          color: textColor,
        },
      },
    },
  };
};
</script>
<style scoped>
.charts-heading {
  font-weight: 600; /* font-semibold */
  font-size: 1.125rem; /* text-lg */
  line-height: 1.75rem; /* matches Tailwind's text-lg line-height */
  color: #374151;
}
</style>
