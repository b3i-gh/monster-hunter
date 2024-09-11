// src/App.js
import React, { useEffect, useState } from "react";
import MonsterList from "./components/MonsterList";
import EditForm from "./components/EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const saveMonster = () => {
    setRefreshList(true);
    setSelectedID("");
    setFormVisible(false);
  };

  useEffect(() => {
    if (selectedID !== "") setFormVisible(true);
  }, [selectedID]);

  useEffect(() => {
    if (!isFormVisible) setSelectedID("");
  }, [isFormVisible]);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="container">
      <div className="header"></div>
      <div className="main">
        <div className="form">
          <FontAwesomeIcon
            className={isFormVisible ? "cancel-button" : "add-button"}
            icon={faPlus}
            onClick={toggleFormVisibility}
          />
          <div
            className={isFormVisible ? "edit-form-visible" : "edit-form-hidden"}
          >
            <EditForm saveMonster={saveMonster} selectedID={selectedID} />
          </div>
        </div>

        <MonsterList
          className="monster-list"
          monsters={monsters}
          setMonsters={setMonsters}
          setSelectedID={setSelectedID}
          refreshList={refreshList}
          setRefreshList={setRefreshList}
        />
      </div>
    </div>
  );
};

export default App;
