import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderItemsList({ orderId }) {
  const [items, setItems] = useState([]);
  const [wines, setWines] = useState([]);
  const [newItem, setNewItem] = useState({ wineId: "", quantity: 1, price: 0 });

  useEffect(() => {
    if (orderId) {
      fetchItems();
      fetchWines();
    }
  }, [orderId]);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5152/api/orderitems");
      const filtered = res.data.filter((i) => i.orderId === orderId);
      setItems(filtered);
      console.log("📦 Loaded order items:", filtered);
    } catch (err) {
      console.error("❌ Error fetching order items:", err);
    }
  };

  const fetchWines = async () => {
    try {
      const res = await axios.get("http://localhost:5152/api/wines");
      setWines(res.data);
      console.log("🍷 Loaded wines:", res.data);
    } catch (err) {
      console.error("❌ Error fetching wines:", err);
    }
  };

  const handleAdd = async () => {
    if (!newItem.wineId) return alert("Select a wine!");
    if (newItem.quantity <= 0) return alert("Quantity must be positive!");

    const payload = {
      orderId: orderId,
      wineId: parseInt(newItem.wineId),
      quantity: parseInt(newItem.quantity),
      price: parseFloat(newItem.price),
    };

    console.log("🧾 Add item payload:", payload);

    try {
      const res = await axios.post("http://localhost:5152/api/orderitems", payload);
      console.log("✅ Order item added:", res.data);
      setNewItem({ wineId: "", quantity: 1, price: 0 });
      fetchItems();
    } catch (err) {
      console.error("❌ Error adding order item:", err.response?.data || err.message);
      alert(
        `Failed to add order item.\n\n${
          JSON.stringify(err.response?.data || err.message, null, 2)
        }`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5152/api/orderitems/${id}`);
      console.log("🗑️ Deleted order item:", id);
      fetchItems();
    } catch (err) {
      console.error("❌ Error deleting item:", err);
    }
  };

  return (
    <div className="card mt-3 p-3 shadow-sm">
      <h5 className="mb-3">Order Items</h5>

      <div className="d-flex mb-3 align-items-center">
        <select
          className="form-select me-2"
          value={newItem.wineId}
          onChange={(e) => {
            const selectedId = e.target.value;
            const selectedWine = wines.find(w => w.id === parseInt(selectedId));
            setNewItem({
              ...newItem,
              wineId: selectedId,
              price: selectedWine ? selectedWine.price : 0
            });
          }}
        >
          <option value="">-- Select Wine --</option>
          {wines.map((wine) => (
            <option key={wine.id} value={wine.id}>
              {wine.name} ({wine.type})
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          className="form-control me-2"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />

        <input
          type="number"
          className="form-control me-2"
          placeholder="Price"
          value={newItem.price}
          disabled
        />

        <button className="btn btn-success" onClick={handleAdd}>
          Add
        </button>
      </div>

      <table className="table table-sm">
        <thead>
          <tr>
            <th>Wine</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No items in this order
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.wine?.name || "Unknown wine"}</td>
                <td>{item.quantity}</td>
                <td>{item.price?.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
