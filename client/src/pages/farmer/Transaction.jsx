import React, { useState, useEffect } from "react";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaSearch,
  FaDownload,
  FaFilter,
  FaCalendar,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import "./farmer.css";

const Transaction = () => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  // Fetch transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://agribridgebackend-xi.vercel.app/api/my-listings",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success && Array.isArray(response.data.data)) {
          const txns = response.data.data.map((listing, index) => {
            const amount = listing.pricePerUnit * (listing.quantityAvailable || 1);
            const date = new Date(listing.createdAt || Date.now());
            const today = new Date();
            const isThisMonth =
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return {
              id: `TXN_${String(Math.floor(Math.random() * 999999)).padStart(
                6,
                "0"
              )}`,
              date: date.toISOString().split("T")[0],
              description: `Payment received for ${listing.name}`,
              amount: amount,
              status: "Completed",
              type: "Credit",
              category: "Sale",
              isThisMonth: isThisMonth,
            };
          });

          setTransactions(txns);
          setFilteredTransactions(txns);

          // Calculate earnings
          const total = txns.reduce((sum, txn) => sum + txn.amount, 0);
          const monthly = txns
            .filter((txn) => txn.isThisMonth)
            .reduce((sum, txn) => sum + txn.amount, 0);

          setTotalEarnings(total);
          setMonthlyEarnings(monthly);
          setWalletBalance(total * 0.8); // Assuming 80% of earnings in wallet
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = transactions;

    if (filter !== "All") {
      filtered = filtered.filter((txn) => txn.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (txn) =>
          txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          txn.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  }, [filter, searchTerm, transactions]);

  const handleDownloadStatement = () => {
    // Create CSV content
    const headers = ["Transaction ID", "Date", "Description", "Amount", "Status", "Type"];
    const rows = transactions.map((txn) => [
      txn.id,
      txn.date,
      txn.description,
      `₹${txn.amount.toFixed(2)}`,
      txn.status,
      txn.type,
    ]);

    let csvContent = headers.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    // Download CSV
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle style={{ color: "#10b981" }} />;
      case "Pending":
        return <FaHourglassHalf style={{ color: "#f59e0b" }} />;
      case "Failed":
        return <FaTimesCircle style={{ color: "#ef4444" }} />;
      default:
        return <FaCheckCircle />;
    }
  };

  return (
    <div className="transaction-container">
      {/* Header */}
      <div className="transaction-header">
        <h1>
          <FaHistory /> Transaction History
        </h1>
        <p>Manage and track all your transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="transaction-stats">
        <div className="stat-card">
          <div className="stat-icon wallet">
            <FaWallet />
          </div>
          <div className="stat-content">
            <p>Wallet Balance</p>
            <h3>₹{walletBalance.toFixed(2)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon earnings">
            {/* <FaTrendingUp /> */}
          </div>
          <div className="stat-content">
            <p>Total Earnings</p>
            <h3>₹{totalEarnings.toFixed(2)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon monthly">
            <FaCalendar />
          </div>
          <div className="stat-content">
            <p>This Month</p>
            <h3>₹{monthlyEarnings.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="transaction-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <FaFilter />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <button className="download-btn" onClick={handleDownloadStatement}>
          <FaDownload /> Download Statement
        </button>
      </div>

      {/* Transactions List */}
      <div className="transaction-section">
        {loading ? (
          <div className="loading-state">
            <p>Loading transactions...</p>
          </div>
        ) : filteredTransactions.length > 0 ? (
          <div className="transactions-list">
            {filteredTransactions.map((txn) => (
              <div key={txn.id} className="transaction-item">
                <div className="txn-icon-section">
                  <div className={`txn-icon ${txn.type.toLowerCase()}`}>
                    {txn.type === "Credit" ? (
                      <FaArrowDown />
                    ) : (
                      <FaArrowUp />
                    )}
                  </div>
                </div>

                <div className="txn-details">
                  <h4>{txn.description}</h4>
                  <div className="txn-meta">
                    <span className="txn-id">{txn.id}</span>
                    <span className="txn-date">{txn.date}</span>
                  </div>
                </div>

                <div className="txn-amount">
                  <span className={`amount ${txn.type.toLowerCase()}`}>
                    {txn.type === "Credit" ? "+" : "-"} ₹{txn.amount.toFixed(2)}
                  </span>
                </div>

                <div className="txn-status">
                  <div className="status-badge">
                    {getStatusIcon(txn.status)}
                    <span>{txn.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaHistory />
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;