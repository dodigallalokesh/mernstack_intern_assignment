import React, { Component } from 'react';
import BarChart from './components/BarChart';
import TransactionDashboard from './components/TransactionTable';
import PieChartComponent from './components/PieChart';
import StatisticsBox from './components/Statistics'
//import { FaSearch } from 'react-icons/fa';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      month: 'Mar', // Default to March
    };
  }

  // Month map to convert month names to numbers
  monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  // Handle search input change
  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  // Handle month dropdown change
  handleMonthChange = (e) => {
    this.setState({ month: e.target.value });
  };

  render() {
    const { searchTerm, month } = this.state;

    return (
      <div className="container">
        {/* Search and Month Dropdown */}
        <div className="search-container">
          <div className="search-bar">
             
            <input
              type="text"
              placeholder="Search transactions"
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
             
          </div>
          <div className="month-dropdown">
            <select value={month} onChange={this.handleMonthChange}>
              {Object.keys(this.monthMap).map((monthName) => (
                <option key={monthName} value={monthName}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Components */}
        <TransactionDashboard searchTerm={searchTerm} />
        <StatisticsBox month={month}/>
        <BarChart month={month} />
        <PieChartComponent month={month} />
      </div>
    );
  }
}

export default App;
