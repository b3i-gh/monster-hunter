import React, { useState, useEffect } from "react";
import api from "../api";
import "./MonsterList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const MonsterList = ({
  monsters,
  setMonsters,
  setSelectedID,
  refreshList,
  setRefreshList,
}) => {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchMonsters();
  }, []);

  useEffect(() => {
    fetchMonsters();
    setRefreshList(false);
    setFilter("");
  }, [refreshList]);

  useEffect(() => {
    filterMonsters();
  }, [filter, setFilter]);

  const fetchMonsters = async () => {
    try {
      const response = await api.get();
      setMonsters(response.data);
    } catch (error) {
      console.error("Error fetching monsters:", error);
    }
  };

  const handleFilterChange = (e) => {
    const n = e.target.value.toUpperCase();
    setFilter(n);
  };

  const clearFilter = () => {
    setFilter("");
  };

  const filterMonsters = async () => {
    try {
      const response = await api.get("/filter=" + filter);
      setMonsters(response.data);
    } catch (error) {
      console.error("Error filtering monsters:", error);
    }
  };

  return (
    <div className="list-container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter items..."
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
        <button onClick={clearFilter} className="clear-filter-button">
          X
        </button>
      </div>
      <div className="card-container">
        {monsters.map((monster) => (
          <div
            className="monster-card"
            key={monster.id}
            onClick={() => setSelectedID(monster.id)}
            style={{
              backgroundImage: `url("${monster.imageURL}")`,
            }}
          >
            <div className="card-bg-layer">
              <div className="monster-name">{monster.name}</div>
              <div className="monster-owned-lang">
                {monster.owned ? (
                  <FontAwesomeIcon
                    className="monster-owned"
                    icon={faSquareCheck}
                  />
                ) : (
                  ""
                )}
                <span className="monster-lang">({monster.lang})</span>
              </div>
              <div className="monster-size">{monster.size} cl</div>
              <div className="monster-date">{monster.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonsterList;
