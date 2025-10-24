import React, { useState, useEffect } from "react";
import axios from "axios";
import AddWineForm from "../components/AddWineForm";
import WineList from "../components/WineList";

function WinesPage() {
  const [wines, setWines] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [searchText, setSearchText] = useState("");

  const WINE_API = "/api/wines";

  const fetchWines = async () => {
    try {
      const resp = await axios.get(WINE_API);
      setWines(resp.data);
    } catch (err) {
      console.error("Fetch wines error:", err);
    }
  };

  const addWine = async (wine) => {
    await axios.post(WINE_API, wine);
    fetchWines();
  };

  const deleteWine = async (id) => {
    await axios.delete(`${WINE_API}/${id}`);
    fetchWines();
  };

  const updateWine = async (id, wine) => {
    await axios.put(`${WINE_API}/${id}`, wine);
    fetchWines();
  };

  useEffect(() => {
    fetchWines();
  }, []);

  const normalize = (s) => (s || "").toLowerCase().trim();
  const filtered = wines.filter((w) => {
    if (filterType !== "All" && normalize(w.type) !== filterType.toLowerCase()) return false;
    if (searchText && !w.name.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container my-5">
      <h2 className="text-danger mb-4">🍷 Manage Wines</h2>
      <AddWineForm onAdd={addWine} />
      <WineList wines={filtered} onDelete={deleteWine} onUpdate={updateWine} />
    </div>
  );
}

export default WinesPage;
