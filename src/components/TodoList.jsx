import React from "react";
import "./TodoList.css";

const TodoList = ({ todos, handleDeleteTodo, handleOpenEdit }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <p className="status">{todo.status.name}</p>
          <p className="title">{todo.text}</p>
          <button onClick={() => handleOpenEdit(todo)}>編集</button>
          <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
