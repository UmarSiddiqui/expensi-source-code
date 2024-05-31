import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction"; // Import the hook

import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const { deleteTransaction } = useDeleteTransaction(); // Use the hook
  
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <h1>{name}'s Expense Tracker</h1>
        <div className="main-content">
          <div className="balance-summary">
            <div className="balance">
              <h3>Your Balance</h3>
              {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
            </div>
            <div className="summary">
              <div className="income">
                <h4>Income</h4>
                <p>${income}</p>
              </div>
              <div className="expenses">
                <h4>Expenses</h4>
                <p>${expenses}</p>
              </div>
            </div>
          </div>
          <form className="add-transaction" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Amount"
                value={transactionAmount}
                required
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
              <select
                className="transaction-type-select"
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <button type="submit"> Add Transaction</button>
            </form>

          <div className="recent-transactions">
            <h2>Recent</h2>
            <div className="transactions-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th> {/* Add Action column */}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => {
                    const { id, description, transactionAmount, transactionType, date } = transaction;
                    return (
                      <tr key={id}>
                        <td>{date}</td>
                        <td>{description}</td>
                        <td>{transactionType}</td>
                        <td>${transactionAmount}</td>
                        <td>
                          <button onClick={() => deleteTransaction(id)}>Delete</button> {/* Add delete button */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="categories">
            <h2>Categories</h2>
            <div className="categories-gallery">
              <div className="category-card">
                <h4>Shopping</h4>
                <p>$1000.00</p>
              </div>
              <div className="category-card">
                <h4>Food</h4>
                <p>$400.00</p>
              </div>
              <div className="category-card">
                <h4>Education</h4>
                <p>$100.00</p>
              </div>
              <div className="category-card">
                <h4>Bills & Utilities</h4>
                <p>$300.00</p>
              </div>
              <div className="category-card">
                <h4>Transport</h4>
                <p>$150.00</p>
              </div>
              <div className="category-card">
                <h4>Health</h4>
                <p>$80.00</p>
              </div>
            </div>
          </div>
        </div>
        {profilePhoto && (
          <div className="profile-container">
            <div className="profile top-right">
              <img className="profile-photo" src={profilePhoto} alt="Profile" />
              <button className="sign-out-button" onClick={signUserOut}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
