import React from 'react';

const Statistics = ({ todos, stats, categories }) => {
  const getCompletionRate = () => {
    return todos.length > 0 ? ((stats.completed / todos.length) * 100).toFixed(1) : 0;
  };

  const getPriorityDistribution = () => {
    const distribution = { alta: 0, media: 0, baja: 0 };
    todos.forEach(todo => {
      distribution[todo.priority]++;
    });
    return distribution;
  };

  const getCategoryDistribution = () => {
    const distribution = {};
    categories.forEach(category => {
      distribution[category] = todos.filter(todo => todo.category === category).length;
    });
    return distribution;
  };

  const priorityDist = getPriorityDistribution();
  const categoryDist = getCategoryDistribution();

  return (
    <div className="statistics">
      <div className="stats-grid">
        <div className="stat-card main-stat">
          <h3>Progreso General</h3>
          <div className="completion-circle">
            <div className="circle-progress" style={{ 
              background: `conic-gradient(#667eea ${getCompletionRate() * 3.6}deg, #e2e8f0 0deg)` 
            }}>
              <span>{getCompletionRate()}%</span>
            </div>
          </div>
          <p>{stats.completed} de {stats.total} tareas completadas</p>
        </div>

        <div className="stat-card">
          <h3>📈 Distribución por Prioridad</h3>
          <div className="distribution">
            {Object.entries(priorityDist).map(([priority, count]) => (
              <div key={priority} className="dist-item">
                <span className="priority-label">{priority}</span>
                <div className="dist-bar">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${(count / todos.length) * 100}%`,
                      backgroundColor: 
                        priority === 'alta' ? '#f5576c' : 
                        priority === 'media' ? '#f093fb' : '#4facfe'
                    }}
                  ></div>
                </div>
                <span className="dist-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3>📂 Tareas por Categoría</h3>
          <div className="category-distribution">
            {Object.entries(categoryDist).map(([category, count]) => (
              <div key={category} className="category-dist-item">
                <span>{category}</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h3>⏰ Productividad</h3>
          <div className="productivity-stats">
            <div className="prod-stat">
              <span>Tareas vencidas:</span>
              <span className={stats.overdue > 0 ? 'warning' : ''}>
                {stats.overdue}
              </span>
            </div>
            <div className="prod-stat">
              <span>Alta prioridad pendiente:</span>
              <span>{stats.highPriority}</span>
            </div>
            <div className="prod-stat">
              <span>Tasa de finalización:</span>
              <span>{getCompletionRate()}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;