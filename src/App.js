import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = useState(["one", "two"]);
  const [input, setInput] = useState("");
  //create todo
  const createTodo = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "todos"), {
      todo: input,
      completed: false,
    });
    setInput("");
  };
  //read todo from firebase
  useEffect(() => {
    const todos = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(todos, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);
  //update todo in firebase
  const updateTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  //delete todo from firbase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div style={{ width: 300, margin: "20px auto" }}>
      <div>
        <h3>Todo App Using Firebase</h3>
        <form onSubmit={createTodo}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button>add todo</button>
        </form>
      </div>
      <hr />
      <div style={{ width: 250 }}>
        {todos.map((todo, index) => (
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            key={index}
          >
            <input
              type="checkbox"
              onChange={() => updateTodo(todo)}
              checked={todo.completed}
            />
            <div onClick={() => updateTodo(todo)}>{todo.todo}</div>
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
          </div>
        ))}
      </div>
      <p>you have {todos.length} todos</p>
    </div>
  );
}

export default App;
