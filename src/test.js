import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PieChart = () => {
  // Pie chart options
  const options = {
    chart: {
      type: 'pie' // Set chart type to 'pie'
    },
    title: {
      text: 'Browser Market Share'
    },
    series: [
      {
        name: 'Browsers',
        data: [
          { name: 'Chrome', y: 60 },
          { name: 'Firefox', y: 20 },
          { name: 'Edge', y: 10 },
          { name: 'Safari', y: 5 },
          { name: 'Others', y: 5 }
        ]
      }
    ],
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    }
  };

  return (
    <div>
      <h1>Pie Chart Example</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
