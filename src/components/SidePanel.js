// src/components/SidePanel.js
import React from 'react';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';

const SidePanel = ({ selectedNode, updateNodeText, onBack }) => {
  return (
    <>
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          onBack={onBack}
        />
      ) : (
        <NodesPanel />
      )}
    </>
  );
};

export default SidePanel;