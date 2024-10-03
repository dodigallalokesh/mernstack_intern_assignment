import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js
import './index.css';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: { labels: [], datasets: [] },
      loading: true,
      error: null,
    };
  }

  // Fetch data when the component mounts or updates based on the month prop
  fetchData = async (month) => {
    try {
      const response = await fetch(`http://localhost:3005/bar-chart-data?month=${month}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      const ranges = Object.keys(result); // Get the keys (price ranges)
      const counts = Object.values(result); // Get the values (counts)

      this.setState({
        chartData: {
          labels: ranges,
          datasets: [
            {
              label: 'Number of Items Sold',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  componentDidMount() {
    this.fetchData(this.props.month); // Fetch data based on the initial month prop
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.setState({ loading: true }); // Reset loading state
      this.fetchData(this.props.month); // Fetch data when the month prop changes
    }
  }

  render() {
    const { chartData, loading, error } = this.state;

    const options = {
      scales: {
        y: {
          min: 0,
          max: 8,
          ticks: {
            stepSize: 1,
            callback: (value) => (Number.isInteger(value) ? value : ''),
          },
        },
      },
      plugins: {
        legend: { display: true },
      },
      maintainAspectRatio: false,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div style={{ width: '700px', height: '450px', margin: '0 auto' }} className="bar-chart-container">
        <h2>Bar Chart of Items Sold</h2>
        <Bar data={chartData} options={options} />
      </div>
    );
  }
}

export default BarChart;
