import React, { useEffect, useState } from "react";
import getAxios from '../../../utils/axios';
import DashboardBox from "../admin/DashboardBox";
import { Chart } from 'primereact/chart';

export default function DashboardHome() {
    const [stats, setStats] = useState({});
    const [dayChart, setDayChart] = useState({ labels: [], data: [] });
    const [hourChart, setHourChart] = useState({ labels: [], data: [] });

    const fetchDashboard = async () => {
        try {
            const resStats = await getAxios().get("/dashboard-stats");
            setStats(resStats.data);

            const resDays = await getAxios().get("/enrollments-by-days");
            setDayChart(resDays.data);

            const resHours = await getAxios().get("/enrollments-by-hours");
            setHourChart(resHours.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const dayChartData = {
        labels: dayChart.labels,
        datasets: [
            {
                label: 'Enrollments',
                backgroundColor: '#6366F1',
                data: dayChart.data
            }
        ]
    };

    const hourChartData = {
        labels: hourChart.labels,
        datasets: [
            {
                label: 'Enrollments',
                borderColor: '#10B981',
                fill: false,
                data: hourChart.data
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '' }
        }
    };

    return (
        <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <DashboardBox title="Today Enrollments" value={stats.enrollment_today || 0} />
                <DashboardBox title="Payments Today" value={stats.payment_today || 0} />
                <DashboardBox title="Accepted" value={stats.accepted_enrollment || 0} />
                <DashboardBox title="Today Payment" value={stats.total_payment || 0} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white shadow rounded">
                    <h3 className="mb-3 font-semibold">Enrollments (Last 7 Days)</h3>
                    <Chart type="bar" data={dayChartData} options={chartOptions} />
                </div>

                <div className="p-4 bg-white shadow rounded">
                    <h3 className="mb-3 font-semibold">Enrollments (Today by Hours)</h3>
                    <Chart type="line" data={hourChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}
