import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import Chart.js
import './index.css';

class PieChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
      loading: true,
      error: null,
    };
  }

   fetchPieChartData = async (month) => {
    try {
      const response = await fetch(`https://amazon-transaction-deatails-backend-njuz.vercel.app/pie-chart-data?month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch pie chart data');
      }
      const result = await response.json();

      const categories = result.map((item) => item.category);
      const counts = result.map((item) => item.itemCount);

      this.setState({
        chartData: {
          labels: categories,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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
    this.fetchPieChartData(this.props.month); 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.setState({ loading: true });  
      this.fetchPieChartData(this.props.month);  
    }
  }

  render() {
    const { chartData, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="pie-chart-container">
        <h2>Pie Chart of Items Sold by Category</h2>
        <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
          <Pie data={chartData} />
        </div>
      </div>
    );
  }
}

export default PieChartComponent;
