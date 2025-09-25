import React, { useRef, useState } from 'react';

const ImportExport = ({ todos, setTodos, categories }) => {
  const fileInputRef = useRef(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState(null);

  const exportData = () => {
    const data = {
      todos,
      categories,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validar estructura básica del archivo
        if (!data.todos || !Array.isArray(data.todos)) {
          alert('❌ Archivo inválido: No contiene datos de tareas válidos.');
          return;
        }
        
        setImportData(data);
        setShowImportModal(true);
      } catch (error) {
        alert('❌ Error al leer el archivo. Asegúrate de que es un archivo JSON válido.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const confirmImport = () => {
    if (importData) {
      setTodos(importData.todos || []);
      // Nota: Las categorías se manejarían en el componente principal
      setShowImportModal(false);
      setImportData(null);
      
      // Mostrar feedback de éxito
      alert(`✅ Importación exitosa! Se cargaron ${importData.todos.length} tareas.`);
    }
  };

  const cancelImport = () => {
    setShowImportModal(false);
    setImportData(null);
  };

  return (
    <div className="import-export">
      <button onClick={exportData} className="ie-button export" title="Exportar datos">
        📤 Exportar
      </button>
      
      <button 
        onClick={() => fileInputRef.current?.click()} 
        className="ie-button import"
        title="Importar datos"
      >
        📥 Importar
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json"
        style={{ display: 'none' }}
      />

      {/* Modal de confirmación de importación */}
      {showImportModal && importData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>📥 Confirmar Importación</h3>
            
            <div className="import-preview">
              <p>Se importarán los siguientes datos:</p>
              <ul>
                <li>📋 <strong>{importData.todos.length}</strong> tareas</li>
                <li>📂 <strong>{importData.categories?.length || 0}</strong> categorías</li>
                {importData.exportDate && (
                  <li>📅 Exportado el: {new Date(importData.exportDate).toLocaleDateString()}</li>
                )}
              </ul>
              
              <div className="warning">
                ⚠️ Esta acción sobrescribirá tus datos actuales.
              </div>
            </div>
            
            <div className="modal-actions">
              <button onClick={cancelImport} className="cancel-btn">
                Cancelar
              </button>
              <button onClick={confirmImport} className="confirm-btn">
                Confirmar Importación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImportExport;