import React from 'react';

const FilterButtons = ({ filter, setFilter, darkMode }) => {
  const filters = [
    { key: 'all', label: 'Todas', icon: '📋' },
    { key: 'active', label: 'Pendientes', icon: '⏳' },
    { key: 'completed', label: 'Completadas', icon: '✅' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => setFilter(key)}
          className={`filter-button ${filter === key ? 'active' : ''}`}
        >
          <span className="filter-icon">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;