import { Statistic, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Stats = ({ month, monthText }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
      setData(res.data);
      message.success('Data loaded successfully');
    } catch (error) {
      console.error(error);
      message.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    return () => setData(null);
  }, [month]);

  return (
    <>
      <h2>Stats for {monthText}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '48px' }}>
        <div style={{ minWidth: '720px' }}>
          <Totals stats={data?.statsData} loading={loading} />
          {data && <BarChart data={data?.barChartData} />}
        </div>
        {data && <PieChart data={data?.pieChartData} />}
      </div>
    </>
  );
};

const Totals = ({ stats, loading }) => (
  <div className='stats' style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '900px', padding: '12px 0', borderTop: '1px solid #dadada', borderBottom: '1px solid #dadada' }}>
    <Statistic valueStyle={{ fontSize: '32px' }} title="Total Sale" value={stats?.totalSale} loading={loading} prefix="₹" />
    <Statistic valueStyle={{ fontSize: '32px' }} title="Total Sold Items" value={stats?.soldCount} loading={loading} />
    <Statistic valueStyle={{ fontSize: '32px' }} title="Total Unsold Items" value={stats?.unsoldCount} loading={loading} />
  </div>
);

const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'No of products per price range' },
    },
    scales: {
      x: {
        stacked: true,
        title: { display: true, text: 'Price Range' },
      },
      y: {
        stacked: true,
        title: { display: true, text: 'Product Count' },
        ticks: { stepSize: 4 },
      },
    },
    aspectRatio: 1.6,
  };

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'No of products per price range',
        data: values,
        backgroundColor: 'rgba(0, 105, 100, 0.7)',
      },
    ],
  };

  return <Bar data={chartData} options={options} style={{ margin: '24px 0', maxWidth: '900px', maxHeight: '500px' }} />;
};

const PieChart = ({ data }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [{ label: '# of Products', data: values }],
  };

  return <Doughnut data={chartData} style={{ margin: '24px 0', maxHeight: '400px', maxWidth: '400px' }} />;
};

export default Stats;
