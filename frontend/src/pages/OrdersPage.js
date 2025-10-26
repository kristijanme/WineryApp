import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOrderForm from "../components/Orders/AddOrderForm";
import OrderItemsList from "../components/Orders/OrderItemsList";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedTotal, setEditedTotal] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5152/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const startEdit = (order) => {
    setEditingId(order.id);
    setEditedStatus(order.status || "Pending");
    setEditedTotal(order.totalAmount ?? 0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedStatus("");
    setEditedTotal("");
  };

  const saveEdit = async (id) => {
    try {
      const original = orders.find((o) => o.id === id);
      if (!original) return;

      const payload = {
        id: original.id,
        customerName: original.customerName,
        userId: original.user?.id ?? original.userId,
        orderDate: original.orderDate,
        status: editedStatus,
        totalAmount: parseFloat(editedTotal),
        orderItems: original.orderItems,
      };

      await axios.put(`http://localhost:5152/api/orders/${id}`, payload);
      await fetchOrders();
      cancelEdit();
    } catch (err) {
      console.error("Update order error:", err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(`http://localhost:5152/api/orders/${id}`);
      await fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Orders</h2>

      <AddOrderForm onOrderAdded={fetchOrders} />

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const isEditing = editingId === order.id;
              return (
                <React.Fragment key={order.id}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.user?.username || "—"}</td>
                    <td>{new Date(order.orderDate).toLocaleString()}</td>

                    <td>
                      {isEditing ? (
                        <select
                          className="form-select form-select-sm"
                          value={editedStatus}
                          onChange={(e) => setEditedStatus(e.target.value)}
                        >
                          <option>Pending</option>
                          <option>Completed</option>
                          <option>Cancelled</option>
                        </select>
                      ) : (
                        order.status
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <input
                          type="number"
                          step="0.01"
                          className="form-control form-control-sm"
                          value={editedTotal}
                          onChange={(e) => setEditedTotal(e.target.value)}
                        />
                      ) : (
                        (order.totalAmount ?? 0).toFixed(2)
                      )}
                    </td>

                    <td>
                      {isEditing ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => saveEdit(order.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => startEdit(order)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteOrder(order.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td colSpan="7">
                      <OrderItemsList orderId={order.id} />
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdersPage;
