import React, { useState } from 'react';

const TodoForm = ({ addTodo, categories, darkMode }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Personal');
  const [priority, setPriority] = useState('media');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo({
        text: text.trim(),
        category,
        priority,
        dueDate,
        notes
      });
      // Reset form
      setText('');
      setCategory(categories[0] || 'Personal');
      setPriority('media');
      setDueDate('');
      setNotes('');
      setShowAdvanced(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué necesitas hacer hoy?"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          <span className="button-text">Agregar</span>
          <span className="button-icon">➕</span>
        </button>
      </div>

      <div className="advanced-options">
        <button 
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="toggle-advanced"
        >
          {showAdvanced ? '▲' : '▼'} Opciones avanzadas
        </button>

        {showAdvanced && (
          <div className="advanced-fields">
            <div className="form-row">
              <div className="form-group">
                <label>Categoría:</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Prioridad:</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>

              <div className="form-group">
                <label>Fecha límite:</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Notas:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notas adicionales..."
                className="form-textarea"
                rows="2"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TodoForm;