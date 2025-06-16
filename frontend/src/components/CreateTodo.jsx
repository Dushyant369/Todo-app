
//render network for backend 
//vercel for frontend

import { useState } from "react";
import { toast } from "react-toastify";

export function CreateTodo({ darkMode, refreshTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "40px",
        backgroundColor: darkMode ? "#2a2a2a" : "#f9f9f9",
        border: `2px solid ${darkMode ? "#444" : "#ddd"}`,
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          border: "2px solid #ccc",
          borderRadius: "4px",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#f0f0f0" : "#000",
        }}
      />
      {/* Description */}
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          border: "2px solid #ccc",
          borderRadius: "4px",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          color: darkMode ? "#f0f0f0" : "#000",
        }}
      />

      {/* Add Todo Button */}
      <button
        onClick={async () => {
    try {
      const response = await fetch("https://todo-app-rdd2.onrender.com/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        toast.success(json.msg || "Todo created successfully!");
         refreshTodos();
        setTitle("");
        setDescription("");
       
      } else {
        toast.error(json.msg || "Failed to create todo");
      }
    } catch (error) {
      toast.error("Something went wrong while creating the todo");
    }} 
  }
        style={{
          padding: "10px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Add a Todo
      </button>
    </div>
  );
}
