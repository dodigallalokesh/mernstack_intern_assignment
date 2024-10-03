import React, { Component } from 'react';
import './index.css';  

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

   
  fetchStatistics = async (month) => {
    try {
      const response = await fetch(`http://localhost:3005/statistics?month=${month}`);
      if (!response.ok) {
        throw new Error('Failed to fetch statistics data');
      }
      const result = await response.json();

       
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
    this.fetchStatistics(this.props.month);  
  }

  componentDidUpdate(prevProps) {
    if (prevProps.month !== this.props.month) {
      this.setState({ loading: true });  
      this.fetchStatistics(this.props.month);  
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
