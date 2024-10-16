import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import numeral from 'numeral'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const LineChart = ({ years, originalAmount, futureAmount }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // or 'bottom', 'left', 'right'
            },
            title: {
                display: true,
                text: `Kết quả trong ${years[years.length - 1]} năm bạn sẽ có ${numeral(futureAmount[futureAmount.length - 1]).format('0,0')} (VNĐ)`, // Title of the chart
            },
        },
    };
    const data = {
        labels: years, // X-axis labels
        datasets: [
            {
                label: 'Tiền gốc (VND)', // Name of the dataset
                data: originalAmount, // Y-axis data points
                fill: true,
                borderColor: '#00b14f',
                tension: 0.1, // Smoothness of the line
            },
            {
                label: 'Giá trị tương lai(VND)', // Name of the dataset
                data: futureAmount, // Y-axis data points
                fill: true,
                borderColor: '#0078ff',
                tension: 0.1, // Smoothness of the line
            },
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}

export default LineChart