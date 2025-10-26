import React, { useState, useEffect } from "react";
import axios from "axios";
import AddWineForm from "../components/AddWineForm";
import WineList from "../components/WineList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = "http://localhost:5152";
const WINE_API = `${API_BASE}/api/wines`;

export default function WinesPage() {
  const [wines, setWines] = useState([]);

  const fetchWines = async () => {
    try {
      const resp = await axios.get(WINE_API);
      setWines(resp.data || []);
    } catch (err) {
      console.error("❌ Fetch wines error:", err);
      toast.error("Failed to load wines from server.");
    }
  };

  const addWine = async (wine) => {
    try {
      const response = await axios.post(WINE_API, wine);
      setWines((prev) => [...prev, response.data]);
      toast.success("✅ Wine added successfully!");
    } catch (err) {
      console.error("❌ Add wine error:", err);
      toast.error("Failed to add wine.");
    }
  };

  const deleteWine = async (id) => {
    if (!window.confirm("Delete this wine?")) return;
    try {
      await axios.delete(`${WINE_API}/${id}`);
      setWines((prev) => prev.filter((w) => w.id !== id));
      toast.success("🗑️ Wine deleted.");
    } catch (err) {
      console.error("❌ Delete wine error:", err);
      toast.error("Failed to delete wine.");
    }
  };

  const updateWine = async (id, wine) => {
    try {
      await axios.put(`${WINE_API}/${id}`, wine);
      await fetchWines();
      toast.success("💾 Wine updated.");
    } catch (err) {
      console.error("❌ Update wine error:", err);
      toast.error("Failed to update wine.");
    }
  };

  useEffect(() => {
    fetchWines();
  }, []);

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-danger mb-4">🍷 Manage Wines</h2>
      <div className="row g-4">
        <div className="col-lg-4">
          <AddWineForm onAdd={addWine} />
        </div>
        <div className="col-lg-8">
          <WineList wines={wines} onDelete={deleteWine} onUpdate={updateWine} />
        </div>
      </div>
    </div>
  );
}
