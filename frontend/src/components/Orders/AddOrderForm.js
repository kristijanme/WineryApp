import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddOrderForm({ onOrderAdded }) {
  const [customerName, setCustomerName] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("Pending");
  const [totalAmount, setTotalAmount] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("🔍 Fetching users...");
        const response = await axios.get("http://localhost:5152/api/users");

        // Додај проверка за да видиме точно што доаѓа
        console.log("✅ Users fetched:", response.data);

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.warn("⚠️ Users response is not an array:", response.data);
          setUsers([]);
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !userId || !totalAmount) {
      alert("Please fill all fields!");
      return;
    }

    const newOrder = {
      customerName,
      user: { id: Number(userId) },
      orderDate: new Date().toISOString(),
      status,
      totalAmount: parseFloat(totalAmount),
      orderItems: [],
    };

    try {
      await axios.post("http://localhost:5152/api/orders", newOrder);
      console.log("✅ Order added successfully");
      setCustomerName("");
      setUserId("");
      setStatus("Pending");
      setTotalAmount("");
      onOrderAdded();
    } catch (error) {
      console.error("❌ Error adding order:", error.message);
    }
  };

  return (
    <div>
      <h4 className="mb-3">Add New Order</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            className="form-control"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Select User</label>
          <select
            className="form-select"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="">-- Select User --</option>
            {users.length > 0 ? (
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username || `User #${user.id}`}{" "}
                  {user.role ? `(${user.role})` : ""}
                </option>
              ))
            ) : (
              <option disabled>Loading users...</option>
            )}
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Order Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="form-label">Total Amount</label>
          <input
            className="form-control"
            placeholder="Enter total amount"
            type="number"
            step="0.01"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Order
        </button>
      </form>
    </div>
  );
}
