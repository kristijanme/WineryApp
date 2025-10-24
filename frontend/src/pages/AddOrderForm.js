import React, { useState, useEffect } from "react";
import axios from "axios";

function AddOrderForm({ onOrderAdded }) {
  const [users, setUsers] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [totalAmount, setTotalAmount] = useState(0);

  // FETCH USERS FOR DROPDOWN
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5152/api/users"); // backend users endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOrder = {
        customerName,
        user: { id: userId }, // или само userId, ако backend го поддржува
        status,
        totalAmount,
        orderDate: new Date()
      };
      await axios.post("http://localhost:5152/api/orders", newOrder);
      onOrderAdded();
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Customer Name</label>
        <input 
          type="text" 
          className="form-control" 
          value={customerName} 
          onChange={(e) => setCustomerName(e.target.value)} 
          required 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Select User</label>
        <select 
          className="form-select" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required
        >
          <option value="">-- Select User --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select 
          className="form-select" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Total Amount</label>
        <input 
          type="number" 
          className="form-control" 
          value={totalAmount} 
          onChange={(e) => setTotalAmount(e.target.value)} 
          required 
        />
      </div>

      <button type="submit" className="btn btn-primary">Add Order</button>
    </form>
  );
}

export default AddOrderForm;
