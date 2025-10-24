import React, { useState } from "react";

export default function OrdersList({ orders, onDelete, onUpdate }) {
  const [editingOrder, setEditingOrder] = useState(null);
  const [editedData, setEditedData] = useState({ status: "", totalAmount: "" });

  if (!orders || orders.length === 0) {
    return <p className="text-muted text-center mt-4">No orders found.</p>;
  }

  const handleEditClick = (order) => {
    setEditingOrder(order.id);
    setEditedData({
      status: order.status,
      totalAmount: order.totalAmount,
    });
  };

  const handleSave = () => {
    onUpdate(editingOrder, editedData);
    setEditingOrder(null);
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h4 className="text-danger mb-3">All Orders</h4>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>User</th>
              <th>Status</th>
              <th>Total (€)</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.user?.username || "—"}</td>
                <td>
                  {editingOrder === order.id ? (
                    <select
                      className="form-select form-select-sm"
                      value={editedData.status}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`badge ${
                        order.status === "Completed"
                          ? "bg-success"
                          : order.status === "Cancelled"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}
                </td>
                <td>
                  {editingOrder === order.id ? (
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={editedData.totalAmount}
                      onChange={(e) =>
                        setEditedData({
                          ...editedData,
                          totalAmount: e.target.value,
                        })
                      }
                    />
                  ) : (
                    order.totalAmount?.toFixed(2)
                  )}
                </td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  {editingOrder === order.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => setEditingOrder(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEditClick(order)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(order.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
