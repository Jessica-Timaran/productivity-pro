import React, { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo, darkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);
  const [editNotes, setEditNotes] = useState(todo.notes);

  const handleEdit = () => {
    if (isEditing) {
      editTodo(todo.id, {
        text: editText,
        category: editCategory,
        priority: editPriority,
        dueDate: editDueDate,
        notes: editNotes
      });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate);
    setEditNotes(todo.notes);
    setIsEditing(false);
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'alta': return '#f5576c';
      case 'media': return '#f093fb';
      case 'baja': return '#4facfe';
      default: return '#94a3b8';
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="todo-checkbox"
      />
      
      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <div className="edit-meta">
              <select 
                value={editPriority} 
                onChange={(e) => setEditPriority(e.target.value)}
                className="edit-select"
              >
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
              <input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="edit-date"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="todo-header">
              <span 
                className="todo-text"
                onDoubleClick={() => setIsEditing(true)}
              >
                {todo.text}
              </span>
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor(todo.priority) }}
              >
                {todo.priority}
              </span>
            </div>
            
            <div className="todo-meta">
              <span className="category-tag">#{todo.category}</span>
              {todo.dueDate && (
                <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                  📅 {new Date(todo.dueDate).toLocaleDateString()}
                  {isOverdue && ' ⚠️'}
                </span>
              )}
              {todo.notes && (
                <span className="notes-indicator">📝</span>
              )}
            </div>
          </>
        )}
      </div>
      
      <div className="todo-actions">
        {isEditing ? (
          <>
            <button onClick={handleEdit} className="save-button">💾</button>
            <button onClick={handleCancel} className="cancel-button">❌</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="edit-button">✏️</button>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">🗑️</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;