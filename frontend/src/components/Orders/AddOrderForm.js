import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddOrderForm({ onOrderAdded }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    userId: "",
    status: "Pending",
    totalAmount: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5152/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("❌ Fetch users error:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customerName || !form.userId || !form.totalAmount) {
      console.warn("⚠️ Missing required fields.");
      return;
    }

    const newOrder = {
      customerName: form.customerName.trim(),
      userId: parseInt(form.userId, 10),
      orderDate: new Date().toISOString(),
      status: form.status,
      totalAmount: parseFloat(form.totalAmount),
      orderItems: [],
    };

    console.log("📦 Sending order:", newOrder);

    try {
      await axios.post("http://localhost:5152/api/orders", newOrder);
      console.log("✅ Order added successfully!");
      setForm({ customerName: "", userId: "", status: "Pending", totalAmount: "" });
      onOrderAdded();
    } catch (err) {
      console.error("❌ Add order error:", err.response?.data || err.message);
    }
  };

  return (
    <form className="card card-body mb-3" onSubmit={handleSubmit}>
      <h5>Add New Order</h5>

      <input
        className="form-control mb-2"
        placeholder="Customer Name"
        value={form.customerName}
        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
      />

      <select
        className="form-select mb-2"
        value={form.userId}
        onChange={(e) => setForm({ ...form, userId: e.target.value })}
      >
        <option value="">-- Select User --</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      <select
        className="form-select mb-2"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Pending</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <input
        type="number"
        step="0.01"
        className="form-control mb-3"
        placeholder="Enter total amount"
        value={form.totalAmount}
        onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
      />

      <button className="btn btn-success w-100">Add Order</button>
    </form>
  );
}
