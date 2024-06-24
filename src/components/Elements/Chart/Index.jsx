import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  
  const [selectedFilter, setSelectedFilter] = useState('week');
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Penggunaan Perminggu',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 70, 76, 50, 60], // Data mingguan
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Penggunaan Perbulan',
        data: [280, 300, 200, 250, 300, 350, 400, 320, 340, 370, 380, 400], // Data bulanan
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Penggunaan Pertahun',
        data: [3200, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400], // Data tahunan
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Usage Statistics',
      },
    },
  };

  
  const handleFilterChange = (filter) => {
    switch (filter) {
      case 'week':
        setData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Label untuk setiap minggu
          datasets: [
            {
              label: 'Penggunaan Perminggu',
              data: [65, 59, 80, 81], // Data mingguan
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        });
        break;
      case 'month':
        setData({
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Label untuk setiap bulan
          datasets: [
            {
              label: 'Penggunaan Perbulan',
              data: [280, 300, 200, 250, 300, 350, 400, 320, 340, 370, 380, 400], // Data bulanan
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
        break;
      case 'year':
        setData({
          labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], // Label untuk setiap tahun
          datasets: [
            {
              label: 'Penggunaan Pertahun',
              data: [3200, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200], // Data tahunan
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
            },
          ],
        });
        break;
      default:
        break;
    }
    setSelectedFilter(filter);
  };

  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">Grafik Penggunaan</h4>
      <div className="flex justify-between mb-4">
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center">
          <input
            type="radio"
            id="week"
            name="filter"
            value="week"
            checked={selectedFilter === 'week'}
            onChange={() => handleFilterChange('week')}
            className="mr-2"
          />
          <label htmlFor="week">Per Minggu</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="month"
            name="filter"
            value="month"
            checked={selectedFilter === 'month'}
            onChange={() => handleFilterChange('month')}
            className="mr-2"
          />
          <label htmlFor="month">Per Bulan</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="year"
            name="filter"
            value="year"
            checked={selectedFilter === 'year'}
            onChange={() => handleFilterChange('year')}
            className="mr-2"
          />
          <label htmlFor="year">Per Tahun</label>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
