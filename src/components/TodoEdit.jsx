import React from "react";
import "./TodoEdit.css";

const TodoEdit = ({
  setIsEditing,
  editTodoText,
  setEditTodoText,
  editTodoStatus,
  setEditTodoStatus,
  handleUpdateTodos,
}) => {
  return (
    <div className="edit-todo ">
      <select
        defaultValue={editTodoStatus}
        onChange={(e) => setEditTodoStatus(e.target.value)}
      >
        <option value="notstarted">未着手</option>
        <option value="progress">進行中</option>
        <option value="done">完了</option>
      </select>
      <input
        type="text"
        value={editTodoText}
        onChange={(e) => setEditTodoText(e.target.value)}
      />
      <button onClick={handleUpdateTodos}>更新</button>
      <button onClick={() => setIsEditing(false)}>キャンセル</button>
    </div>
  );
};

export default TodoEdit;
