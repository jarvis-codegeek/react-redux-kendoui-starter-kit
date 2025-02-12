  const options = {
    chart: {
      type: "pie"
    },
    title: {
      text: "Product CIS Benchmark Distribution"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>" // ✅ Show numbers instead of percentages
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y} / " + totalProducts // ✅ Show numbers with total
        }
      }
    },
    series: [
      {
        name: "Products",
        colorByPoint: true,
        data: [
          { name: "Products with CIS Benchmarks", y: cisBenchmarked, color: "#0088FE" },
          { name: "Remaining Products", y: remainingProducts, color: "#FFBB28" }
        ]
      }
    ]
  };
