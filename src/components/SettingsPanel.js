// src/components/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ selectedNode, updateNodeText, onBack }) => {
  const onTextChange = (event) => {
    updateNodeText(selectedNode.id, event.target.value);
  };

  return (
    <aside className="settings-panel">
      <div className="panel-header">
        <button onClick={onBack} className="back-button">←</button>
        Message
      </div>
      <div className="panel-body">
        <label>Text</label>
        <textarea
          rows="4"
          value={selectedNode.data.label}
          onChange={onTextChange}
        />
      </div>
    </aside>
  );
};

export default SettingsPanel;