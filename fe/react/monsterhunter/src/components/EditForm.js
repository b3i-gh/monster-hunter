import React, { useState, useEffect } from "react";
import api from "../api";
import "./EditForm.css";

const EditForm = ({ saveMonster, selectedID }) => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format in YYYY-MM-DD
  };

  const [newName, setName] = useState("");
  const [newImageURL, setImageURL] = useState("");
  const [newOwned, setOwned] = useState(false);
  const [newSize, setSize] = useState(0);
  const [newLang, setLang] = useState("IT");
  const [newDate, setDate] = useState(getCurrentDate());

  useEffect(() => {
    if (selectedID !== "") getSelectedMonsterData();
    else clearForm();
  }, [selectedID]);

  const getSelectedMonsterData = async () => {
    const selectedMonster = await (await api.get("/" + selectedID)).data;
    setName(selectedMonster.name);
    setImageURL(selectedMonster.imageURL);
    setOwned(selectedMonster.owned);
    setSize(selectedMonster.size);
    setLang(selectedMonster.lang);
    setDate(selectedMonster.date);
  };

  const clearForm = () => {
    setName("");
    setImageURL("");
    setOwned(false);
    setSize(0);
    setLang("IT");
    setDate(getCurrentDate());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMonster = {
        name: newName,
        imageURL: newImageURL,
        owned: newOwned,
        size: newSize,
        lang: newLang,
        date: newDate,
      };
      if (selectedID !== "") newMonster.id = selectedID;

      if (selectedID === "") {
        const response = await api.post("", newMonster);
      } else {
        const response = await api.put("/" + selectedID, newMonster);
      }

      saveMonster();
      clearForm();
    } catch (error) {
      console.error("Error adding monster:", error);
    }
  };

  const handleDelete = async (e) => {
    if (selectedID !== "") {
      const response = await api.delete("/" + selectedID);
      saveMonster();
    }
  };

  const handleNameChange = (e) => {
    const n = e.target.value.toUpperCase();
    setName(n);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="test"
        value={selectedID}
        name="id"
        disabled={true}
        className="hidden-input"
      />
      <div className="grid-1-1">
        <label for="name">Name</label>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={handleNameChange}
          required
          name="name"
        />
      </div>

      <div className="grid-1-2">
        <label for="imageurl">Image URL</label>
        <input
          type="text"
          placeholder="Image URL"
          value={newImageURL}
          onChange={(e) => setImageURL(e.target.value)}
          required
          name="imageurl"
        />
      </div>

      <div className="grid2-1">
        <label for="owned">Owned</label>
        <input
          type="checkbox"
          checked={newOwned}
          onChange={(e) => setOwned(e.target.checked)}
          name="owned"
        />
      </div>

      <div className="grid-2-2">
        <label for="size">Size</label>
        <input
          type="number"
          value={newSize}
          onChange={(e) => setSize(e.target.value)}
          required
          name="size"
        />
      </div>

      <div className="grid-3-1">
        <label for="lang">Lang</label>
        <select
          value={newLang}
          onChange={(e) => setLang(e.target.value)}
          name="lang"
        >
          <option value="IT">IT</option>
          <option value="EN">EN</option>
          <option value="SI">SI</option>
        </select>
      </div>

      <div className="grid-3-2">
        <label for="date">Date</label>
        <input
          type="date"
          value={newDate}
          onChange={(e) => setDate(e.target.value)}
          name="date"
        />
      </div>

      <div className="grid-4-2">
        {selectedID !== "" && (
          <button className="delete-button" onClick={handleDelete}>
            DELETE
          </button>
        )}
        <button type="submit" className="save-button">
          SAVE
        </button>
      </div>
    </form>
  );
};

export default EditForm;
