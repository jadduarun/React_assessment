import logo from "./logo.svg";
import "./App.css";
import { Fragment, useState } from "react";

function App() {
  const [id, setId] = useState(2);
  const [initialvalues, setInitialvalues] = useState([
    {
      id: 1,
      title: "Hello"
    }
  ]);
  console.log(initialvalues)
  const [data, setData] = useState("");
  const [editItem, setEditItem] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setInitialvalues([...initialvalues, { id: id, title: data }]);
    setId(id + 1);
  }
  function onDelete(data) {
    const deleteList = initialvalues.filter((todo)=> todo.id!== data.id);
    setInitialvalues(deleteList);
  }
  function onEdit(todo) {
    const newTodo = todo ? [...todo] :todo;
    editItem(newTodo)
  }
  function onEditItem(e){
    const newName = e.target.value;
    setEditItem({...editItem,title:newName});
  }
  function onDoneEdit(){
    setInitialvalues(initialvalues=>{
      return initialvalues.map((todo) => {
        if(todo.id === editItem.id){
          return editItem;
        }
        return todo;
      })
    });
    setEditItem(null)
  }
  return (
    <div className="App">
      <h1>Notes</h1>
      <div className="box">
        <fieldset>
          <legend>Notes Taking</legend>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <label className="label">Title:</label>
              <input
                className="inputBox"
                value={data}
                onChange={e => setData(e.target.value)}
              />
              <input type="submit" className="button" value="Add" />
            </form>
          </div>
        </fieldset>
      </div>
      <ul>
        {
        initialvalues.map(todo=> {
          const isEditing = editItem?.id === todo.id;
          return (
            <li key={todo.id}>
              {!isEditing && <Fragment>{todo.title}</Fragment>}
              {isEditing && <input value={editItem.title} onChange={onEditItem} />}
              {!isEditing && <button onClick={() => onEdit(todo)}>Edit</button>}
              {isEditing && <button onClick={() => onDoneEdit()}>Done</button>}
              <button onClick={() => onDelete(todo)}>Delete</button>
            </li>
          );
        })
        }
      </ul>
    </div>
  );
}

export default App;
