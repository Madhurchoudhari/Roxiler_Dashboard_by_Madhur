import { Statistic, message, Card, Typography, Space, Row, Col } from 'antd'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bar, Doughnut } from 'react-chartjs-2'

const { Title } = Typography;

export default function Stats({ month, monthText }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    
    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://roxiler-pvpf.onrender.com/combined-data?month=${month}`);
            setLoading(false);
            setData(res.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    }

    useEffect(() => {
        getData();
        return () => {
            setData(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month])

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2}>Stats for {monthText}</Title>

                <Row gutter={[24, 24]}>
                    <Col xs={24} lg={16}>
                        <Totals stats={data?.statsData} loading={loading} />
                        {data && <BarChart data={data?.barChartData} />}
                    </Col>
                    <Col xs={24} lg={8}>
                        {data && <PieChart data={data?.pieChartData} />}
                    </Col>
                </Row>
            </Space>
        </Card>
    )
}

function Totals({ stats, loading }) {
    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Statistic
                        title="Total Sale"
                        value={stats?.totalSale}
                        loading={loading}
                        prefix="₹"
                    />
                </Col>
                <Col xs={24} sm={8}>
                    <Statistic
                        title="Total Sold Items"
                        value={stats?.soldCount}
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={8}>
                    <Statistic
                        title="Total Unsold Items"
                        value={stats?.unsoldCount}
                        loading={loading}
                    />
                </Col>
            </Row>
        </Card>
    )
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'No of products per price range'
            },
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count'
                },
                ticks: {
                    stepSize: 4
                }
            }
        },
    };

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: 'rgba(0, 105, 100, 0.7)'
            }
        ]
    }

    return (
        <Card style={{ marginTop: 16 }}>
            <div style={{ height: 400 }}>
                <Bar data={chartData} options={options} />
            </div>
        </Card>
    )
}

function PieChart({ data }) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
            }
        ]
    }
    return (
        <Card>
            <div style={{ height: 400 }}>
                <Doughnut data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </Card>
    )
}