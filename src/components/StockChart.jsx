import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import style from "../styles/StockChart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ stockData, selectedStock, currency }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: `${selectedStock} ${currency}$ (Stock Price Chart) `,
        font: {
          size: 25,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false, // Set to false to hide vertical grid lines
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Price",
        },
        grid: {
          display: false, // Set to false to hide horizontal grid lines
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };

  const stockChartFun = () => {
    if (stockData && stockData.length > 0) {
      // Update chart data and labels
      const data = {
        labels: stockData.map((data) => data.n),
        datasets: [
          {
            label: "Stock Price",
            data: stockData.map((data) => data.c),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.4)",
            fill: true,
          },
        ],
      };

      setChartData(data);
    }
  };

  useEffect(() => {
    stockChartFun();
  }, [stockData]);

  return (
    <div className={style.chart_div}>
      {chartData ? (
        <Line data={chartData} options={chartOptions} ref={chartRef} />
      ) : null}
    </div>
  );
};

export default StockChart;
