/*
todos = [
{
 <h1>Go to gym </h1>
     <h2>You need to go to the gym </h2>
     <button>Mark as completed</button> 
}

]


*/

import { toast } from "react-toastify";
import { deleteTodoById } from "./DeleteTodo"; 
import "react-toastify/ReactToastify.css";

export function Todos({ todos, darkMode, refreshTodos }) {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px",
      }}
    >
      {todos.map(function (todo) {
        return (
          <div
            style={{
              backgroundColor: darkMode ? "#1e1e1e" : "#fefefe",
              border: `1px solid ${darkMode ? "#444" : "#ddd"}`,
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              boxShadow: darkMode
                ? "0 4px 10px rgba(255, 255, 255, 0.05)"
                : "0 4px 10px rgba(0, 0, 0, 0.05)",
              textAlign: "left",
              color: darkMode ? "#e0e0e0" : "#333",
            }}
          >
            <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>
              {todo.title}
            </h1>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "normal",
                marginBottom: "12px",
                color: darkMode ? "#bbb" : "#666",
              }}
            >
              {todo.description}
            </h2>

            {/* Mark as complete button */}
            <button
              style={{
                marginRight: "10px",
                padding: "10px 16px",
                backgroundColor: todo.completed ? "#888" : "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => {
                fetch("https://todo-app-rdd2.onrender.com/completed", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ _id: todo._id }),
                })
                  .then(async (res) => {
                    const json = await res.json();
                    toast.success(json.msg || "Todo updated");
                       refreshTodos();
                  })
                  .catch((err) => {
                    console.error("Error updating todo:", err);
                     toast.error("Error updating todo");
                  });
              }}
            >
              {todo.completed ? "Completed" : "Mark as Complete"}
            </button>

            {/* Delete button */}
            <button
              style={{
                padding: "10px 16px",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={async () => {
                const confirmDelete = confirm("Are you sure you want to delete this todo?");
                if (!confirmDelete) return;

                try {
                  const res = await deleteTodoById(todo._id);
                   toast.success(res.msg || "Todo deleted");
                   refreshTodos();
                } catch (e) {
                  toast.error("Failed to delete todo");
                }
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
