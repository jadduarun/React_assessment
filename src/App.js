import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [initialvalues, setInitialvalues] = useState([]);
  const [data, setData] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit() {
    if (data.trim() === "") {
      alert("Please Enter the Title");
    }
    else if (content.trim() === "") {
      alert("Please Enter the Description");
    }
    if (data.trim() !== "" && content.trim() !== "") {
      setInitialvalues([...initialvalues, { title: data,description: content }]);
    }
    setData("")
    setContent("")
  }

  function onEdit(index) {
    setIsEditing(true);
    setEditIndex(index);
    setData(initialvalues[index].title);
    setContent(initialvalues[index].description);
  }

  function onDone() {
    if (data.trim() === "") {
      alert("Please Enter the Title");
    }
    else if (content.trim() === "") {
      alert("Please Enter the Description");
    }
    if (data.trim() !== "" && content.trim() !== "") {
      const newArr = [...initialvalues];
      newArr[editIndex] = { title: data ,description:content};
      setInitialvalues(newArr);
      setIsEditing(false);
      setData("")
      setContent("")
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
              placeholder="Enter Your Todo Title"
              className="inputBox"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
            <label className="label">Description:</label>
            <textarea
              placeholder="Enter Your Todo Description"
              className="inputBox"
              value={content}
              rows="4"
              onChange={(e) => setContent(e.target.value)}
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
