import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [initialvalues, setInitialvalues] = useState([]);
  const [data, setData] = useState("");

  function handleSubmit() {
    if (data.trim() === "") {
      alert("Please Enter the Title");
    }
    if (data.trim() !== "") {
      setInitialvalues([...initialvalues, { title: data }]);
    }
    setData("")
  }

  function onEdit(index) {
    setIsEditing(true);
    setEditIndex(index);
    setData(initialvalues[index].title);
  }

  function onDone() {
    if (data.trim() === "") {
      alert("Please Enter the Title");
    }
    if (data.trim() !== "") {
      const newArr = [...initialvalues];
      newArr[editIndex] = { title: data };
      setInitialvalues(newArr);
      setIsEditing(false);
      setData("")
    }
  }

  function onDelete(index) {
    const deleteList = [...initialvalues];
    deleteList.splice(index, 1);
    setInitialvalues(deleteList);
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <div className="box">
        <fieldset>
          <legend>Notes Taking</legend>
          <div className="form">
            <label className="label">Title:</label>
            <input
              placeholder="Enter Your Todo Here"
              className="inputBox"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            {!isEditing ? (
              <button className="button" onClick={() => handleSubmit()}>
                Add
              </button>
            ) : (
              <button className="button" onClick={() => onDone()}>
                Save
              </button>
            )}
          </div>
        </fieldset>
      </div>
      <ul>
        {initialvalues.map((todo, index) => {
          return (
            <li key={index}>
              {todo.title}
              <button className="edit" onClick={() => onEdit(index)}>Edit</button>
              <button className="delete" onClick={() => onDelete(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
