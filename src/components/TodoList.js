import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
  return (
    <ul className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">No hay tareas para mostrar</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </ul>
  );
};

export default TodoList;