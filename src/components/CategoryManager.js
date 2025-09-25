import React, { useState } from 'react';

const CategoryManager = ({ categories, setCategories, addCategory, todos }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const deleteCategory = (categoryToDelete) => {
    if (categoryToDelete !== 'Trabajo' && categoryToDelete !== 'Personal') {
      setCategories(categories.filter(cat => cat !== categoryToDelete));
      // Reasignar tareas de categoría eliminada a "Personal"
      // (esto se manejaría en el componente principal)
    }
  };

  const getCategoryStats = (category) => {
    const categoryTodos = todos.filter(todo => todo.category === category);
    return {
      total: categoryTodos.length,
      completed: categoryTodos.filter(todo => todo.completed).length,
      pending: categoryTodos.filter(todo => !todo.completed).length
    };
  };

  return (
    <div className="category-manager">
      <div className="category-form">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nueva categoría..."
          className="category-input"
        />
        <button onClick={handleAddCategory} className="add-category-btn">
          ➕ Agregar
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => {
          const stats = getCategoryStats(category);
          return (
            <div key={category} className="category-card">
              <div className="category-header">
                <h3>{category}</h3>
                {(category !== 'Trabajo' && category !== 'Personal') && (
                  <button 
                    onClick={() => deleteCategory(category)}
                    className="delete-category-btn"
                  >
                    🗑️
                  </button>
                )}
              </div>
              <div className="category-stats">
                <span>Total: {stats.total}</span>
                <span>Completadas: {stats.completed}</span>
                <span>Pendientes: {stats.pending}</span>
              </div>
              <div className="category-progress">
                <div 
                  className="progress-bar"
                  style={{ 
                    width: stats.total > 0 ? `${(stats.completed / stats.total) * 100}%` : '0%' 
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManager;