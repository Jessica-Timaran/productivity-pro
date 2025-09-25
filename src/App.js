import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';
import CategoryManager from './components/CategoryManager';
import Statistics from './components/Statistics';
import ImportExport from './components/ImportExport';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState(['Trabajo', 'Personal', 'Estudio', 'Salud']);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('todos');
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del localStorage
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem('productivity-pro-todos');
      const savedCategories = localStorage.getItem('productivity-pro-categories');
      const savedDarkMode = localStorage.getItem('productivity-pro-darkMode');
      
      if (savedTodos) {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(Array.isArray(parsedTodos) ? parsedTodos : []);
      }
      
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(Array.isArray(parsedCategories) ? parsedCategories : ['Trabajo', 'Personal', 'Estudio', 'Salud']);
      }
      
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error('Error cargando datos:', error);
      setTodos([]);
      setCategories(['Trabajo', 'Personal', 'Estudio', 'Salud']);
    }
    
    setIsLoaded(true);
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    if (!isLoaded) return;
    
    try {
      localStorage.setItem('productivity-pro-todos', JSON.stringify(todos));
      localStorage.setItem('productivity-pro-categories', JSON.stringify(categories));
      localStorage.setItem('productivity-pro-darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error guardando datos:', error);
    }
  }, [todos, categories, darkMode, isLoaded]);

  // Agregar nueva tarea
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now(),
      text: todoData.text,
      completed: false,
      category: todoData.category,
      priority: todoData.priority,
      dueDate: todoData.dueDate,
      createdAt: new Date().toISOString(),
      notes: todoData.notes || ''
    };
    setTodos([...todos, newTodo]);
  };

  // Editar tarea
  const editTodo = (id, updatedData) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, ...updatedData } : todo
    ));
  };

  // Marcar como completada/pendiente
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Eliminar tarea
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Limpiar tareas completadas
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filtrar y ordenar tareas
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    if (selectedCategory !== 'all' && todo.category !== selectedCategory) return false;
    if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { alta: 3, media: 2, baja: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'dueDate':
        return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
      default:
        return 0;
    }
  });

  // Agregar nueva categoría
  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  // Estadísticas
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    highPriority: todos.filter(todo => todo.priority === 'alta' && !todo.completed).length,
    overdue: todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      new Date(todo.dueDate) < new Date()
    ).length
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <header className="header">
          <div className="header-left">
            <h1 className="title">
              <span className="title-icon">🚀</span>
              Productivity Pro
            </h1>
            <nav className="tabs">
              {['todos', 'stats', 'categories'].map(tab => (
                <button
                  key={tab}
                  className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'todos' && '📝 Tareas'}
                  {tab === 'stats' && '📊 Estadísticas'}
                  {tab === 'categories' && '📂 Categorías'}
                </button>
              ))}
            </nav>
          </div>
          <div className="header-right">
            <ImportExport 
              todos={todos} 
              setTodos={setTodos} 
              categories={categories} 
              setCategories={setCategories} 
            />
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {activeTab === 'todos' && (
          <div className="todo-card">
            <div className="controls-bar">
              <div className="search-sort">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="🔍 Buscar tareas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="date">Más recientes</option>
                  <option value="priority">Prioridad</option>
                  <option value="dueDate">Fecha límite</option>
                </select>
              </div>
              
              <div className="category-filter">
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="category-select"
                >
                  <option value="all">Todas las categorías</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <TodoForm 
              addTodo={addTodo} 
              categories={categories}
              darkMode={darkMode} 
            />
            
            <div className="quick-stats">
              <div className="stat-item">
                <span className="stat-number">{stats.pending}</span>
                <span className="stat-label">Pendientes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.highPriority}</span>
                <span className="stat-label">Alta prioridad</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.overdue}</span>
                <span className="stat-label">Vencidas</span>
              </div>
            </div>

            <FilterButtons filter={filter} setFilter={setFilter} darkMode={darkMode} />
            
            <TodoList 
              todos={filteredTodos} 
              toggleTodo={toggleTodo} 
              deleteTodo={deleteTodo} 
              editTodo={editTodo}
              darkMode={darkMode}
            />

            {todos.length > 0 && (
              <div className="footer-actions">
                <button onClick={clearCompleted} className="clear-button">
                  🗑️ Limpiar Completadas ({stats.completed})
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <Statistics todos={todos} stats={stats} categories={categories} />
        )}

        {activeTab === 'categories' && (
          <CategoryManager 
            categories={categories} 
            setCategories={setCategories}
            addCategory={addCategory}
            todos={todos}
          />
        )}
      </div>
    </div>
  );
}

export default App;