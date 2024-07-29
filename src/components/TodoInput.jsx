import React, { useState } from "react";
import "./TodoInput.css";

const TodoInput = ({ todoText, addTodo, setTodoText, setSelectedStatus }) => {
  return (
    <div className="todo_input">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button onClick={addTodo}>追加</button>
      <select onChange={(e) => setSelectedStatus(e.target.value)}>
        <option value="all">すべて</option>
        <option value="notstarted">未着手</option>
        <option value="progress">進行中</option>
        <option value="done">完了</option>
      </select>
    </div>
  );
};

export default TodoInput;
