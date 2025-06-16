import { useEffect, useState } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchTodos = async () => {
      try {
      const res = await fetch("https://todo-app-rdd2.onrender.com/todo");
      const json = await res.json();
      setTodos(json.todos);
    } catch (err) {
      console.error("Failed to fetch todos");
       toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);


  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#e0e0e0" : "#000000",
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: darkMode ? "#333" : "#f0f0f0",
          color: darkMode ? "#e0e0e0" : "#000",
          padding: "8px 16px",
          border: "1px solid " + (darkMode ? "#555" : "#ccc"),
          borderRadius: "6px",
          marginBottom: "20px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>

      <CreateTodo darkMode={darkMode} refreshTodos={fetchTodos} />
      <Todos todos={todos} darkMode={darkMode} refreshTodos={fetchTodos} />

       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

    </div>
  );
}

export default App;
