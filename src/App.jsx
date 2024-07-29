import { useEffect, useState } from "react";
import "./App.css";
import TodoEdit from "./components/TodoEdit";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { nanoid } from "nanoid";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todoText, setTodoText] = useState("");
  const [editTodo, setEditTodo] = useState({});
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoStatus, setEditTodoStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [sortedTodo, setSortedTodo] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const sortTodos = () => {
      switch (selectedStatus) {
        case "notstarted":
          setSortedTodo(
            todos.filter((todo) => todo.status.id === "notstarted")
          );
          break;
        case "progress":
          setSortedTodo(todos.filter((todo) => todo.status.id === "progress"));
          break;
        case "done":
          setSortedTodo(todos.filter((todo) => todo.status.id === "done"));
          break;

        default:
          setSortedTodo(todos);
          break;
      }
    };
    sortTodos();
  }, [selectedStatus, todos]);

  console.log(111);

  const addTodo = () => {
    const newTodo = {
      id: nanoid(),
      text: todoText,
      status: {
        id: "notstarted",
        name: "未着手",
      },
    };
    setTodos([...todos, newTodo]);
    setTodoText("");
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleOpenEdit = (todo) => {
    setIsEditing(true);
    setEditTodo(todo);
    setEditTodoText(todo.text);
    setEditTodoStatus(todo.status.id);
  };

  const handleUpdateTodos = () => {
    const updateTodos = todos.map((todo) => {
      return todo.id === editTodo.id
        ? {
            ...todo,
            text: editTodoText,
            status: {
              id: editTodoStatus,
              name: getEditTodoStatus(editTodoStatus),
            },
          }
        : todo;
    });
    setTodos(updateTodos);
    setEditTodo({});
    setEditTodoText("");
    setEditTodoStatus("");
    setIsEditing(false);
  };

  const getEditTodoStatus = (id) => {
    switch (editTodoStatus) {
      case "notstarted":
        return "未着手";
        break;
      case "progress":
        return "進行中";
        break;
      case "done":
        return "完了";
        break;

      default:
        break;
    }
  };

  return (
    <>
      {isEditing ? (
        <TodoEdit
          setIsEditing={setIsEditing}
          editTodoText={editTodoText}
          setEditTodoText={setEditTodoText}
          editTodoStatus={editTodoStatus}
          setEditTodoStatus={setEditTodoStatus}
          handleUpdateTodos={handleUpdateTodos}
        />
      ) : (
        <>
          <TodoInput
            todoText={todoText}
            setTodoText={setTodoText}
            setTodos={setTodos}
            addTodo={addTodo}
            setSelectedStatus={setSelectedStatus}
          />
          {!todos ? (
            <h1>データが存在しません</h1>
          ) : (
            <TodoList
              todos={sortedTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleOpenEdit={handleOpenEdit}
            />
          )}
          {/*  */}
        </>
      )}
    </>
  );
}

export default App;
