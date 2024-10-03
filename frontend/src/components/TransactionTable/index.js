import React, { Component } from 'react';
import './index.css';  

class TransactionDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      page: 1,
      perPage: 10,
    };
  }

   
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

   fetchTransactions = () => {
    const { page, perPage } = this.state;
    const { searchTerm } = this.props;
    const url = `http://localhost:3005/transactions?page=${page}&perPage=${perPage}&search=${searchTerm}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => this.setState({ transactions: data }))
      .catch((error) => console.error('Error fetching transactions:', error));
  };

   componentDidMount() {
    this.fetchTransactions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchTransactions();
    }
  }

   handleNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }), this.fetchTransactions);
  };

   handlePrevPage = () => {
    this.setState((prevState) => ({ page: prevState.page > 1 ? prevState.page - 1 : 1 }), this.fetchTransactions);
  };

  render() {
    const { transactions, page } = this.state;

    return (
      <div className="transaction-dashboard">
        <h1>Transaction Dashboard</h1>

        
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date of Sale</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`row-${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <td>{transaction.title}</td>
                    <td>${transaction.price}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.category}</td>
                    <td>{new Date(transaction.date_of_sale).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

         
        <div className="pagination-controls">
          <button onClick={this.handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={this.handleNextPage}>Next</button>
        </div>
      </div>
    );
  }
}

export default TransactionDashboard;
