import React, { useState } from "react";
import { 
  FaWallet, 
  FaArrowUp, 
  FaArrowDown, 
  FaHistory, 
  FaSearch, 
  FaDownload 
} from "react-icons/fa";

const Transaction = () => {
  const [filter, setFilter] = useState("All");

  // Mock Data (Baad me Backend se aayega)
  const transactions = [
    {
      id: "TXN_123456",
      date: "2025-12-10",
      description: "Payment for Sharbati Wheat (Order #ORD001)",
      amount: 45000,
      type: "Credit", // Credit matlab paisa aaya
      status: "Success",
      buyer: "Ramesh Wholesalers"
    },
    {
      id: "TXN_123457",
      date: "2025-12-12",
      description: "Payment for Red Onions",
      amount: 12000,
      type: "Credit",
      status: "Pending", // Abhi aana baaki hai
      buyer: "Fresh Mart"
    },
    {
      id: "TXN_123458",
      date: "2025-12-15",
      description: "Withdrawal to Bank Account (SBI)",
      amount: 5000,
      type: "Debit", // Debit matlab nikala
      status: "Success",
      buyer: "Self"
    },
    {
      id: "TXN_123459",
      date: "2025-12-18",
      description: "Payment for Potatoes",
      amount: 22000,
      type: "Credit",
      status: "Success",
      buyer: "BigBasket Hub"
    },
  ];

  return (
    <div className="transaction-container">
      
      {/* --- Section 1: Wallet Cards --- */}
      <div className="wallet-section">
        {/* Main Balance Card */}
        <div className="wallet-card main-balance">
          <div className="card-icon">
            <FaWallet />
          </div>
          <div>
            <h3>Total Balance</h3>
            <h1>₹ 67,000</h1>
            <p>Available to withdraw</p>
          </div>
          <button className="btn-withdraw">Withdraw Money</button>
        </div>

        {/* Pending Card */}
        <div className="wallet-card pending-balance">
          <div className="card-icon">
            <FaHistory />
          </div>
          <div>
            <h3>Pending Clearance</h3>
            <h1>₹ 12,000</h1>
            <p>Will be added in 24 hrs</p>
          </div>
        </div>
      </div>

      {/* --- Section 2: Transaction History --- */}
      <div className="history-section">
        <div className="history-header">
          <h2>Transaction History</h2>
          
          <div className="header-actions">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Search by Order ID..." />
            </div>
            <button className="btn-export"><FaDownload /> Export</button>
          </div>
        </div>

        {/* Filters */}
        <div className="tabs">
          <button 
            className={filter === "All" ? "active" : ""} 
            onClick={() => setFilter("All")}
          >All</button>
          <button 
            className={filter === "Credit" ? "active" : ""} 
            onClick={() => setFilter("Credit")}
          >Income (Credit)</button>
          <button 
            className={filter === "Debit" ? "active" : ""} 
            onClick={() => setFilter("Debit")}
          >Withdrawals (Debit)</button>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="txn-id">{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>
                    <div className="desc-cell">
                      <span>{txn.description}</span>
                      <small>{txn.buyer}</small>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${txn.status.toLowerCase()}`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className={`amount ${txn.type === "Credit" ? "plus" : "minus"}`}>
                    {txn.type === "Credit" ? <FaArrowUp /> : <FaArrowDown />}
                    ₹{txn.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;