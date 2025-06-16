export async function deleteTodoById(_id) {
  try {
    const res = await fetch("https://todo-app-rdd2.onrender.com/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: _id }),
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error deleting todo:", error);
     toast.error("An error occurred while deleting the todo.");
    throw error;
  }
}