import React, { Component } from 'react';
import './index.css'; // You can create custom styles here

class StatisticsBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
      loading: true,
      error: null,
    };
  }

  // Fetch statistics data based on the selected month
  fetchStatistics = async (month) => {
    try {
      const response = await fetch(`http://localhost:3005/statistics?month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch statistics data');
      }
      const result = await response.json();

      // Update the state with the fetched data
      this.setState({
        totalSaleAmount: result.totalSaleAmount,
        totalSoldItems: result.totalSoldItems,
        totalNotSoldItems: result.totalNotSoldItems,
        loading: false,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  componentDidMount() {
    this.fetchStatistics(this.props.month); // Fetch data based on initial month prop
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.setState({ loading: true }); // Reset loading state
      this.fetchStatistics(this.props.month); // Fetch data when month changes
    }
  }

  render() {
    const { totalSaleAmount, totalSoldItems, totalNotSoldItems, loading, error } = this.state;
    const { month } = this.props;

    if (loading) return <div>Loading statistics...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <div className="statistics-box">
        <h2>Statistics - {month}</h2>
        <div className="statistics-content">
          <p>Total Sale Amount: <strong>${totalSaleAmount.toFixed(2)}</strong></p>
          <p>Total Sold Items: <strong>{totalSoldItems}</strong></p>
          <p>Total Not Sold Items: <strong>{totalNotSoldItems}</strong></p>
        </div>
      </div>
    );
  }
}

export default StatisticsBox;
