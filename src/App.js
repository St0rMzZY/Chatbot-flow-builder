import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import SidePanel from './components/SidePanel';
import CustomTextNode from './components/CustomTextNode';
import './App.css';

const nodeTypes = { textNode: CustomTextNode };
/* to generate unique ids for new nodes */
let id = 1;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [error, setError] = useState('');

  const onConnect = useCallback(
    (params) => {
      const sourceHasEdge = edges.some((edge) => edge.source === params.source);
      if (!sourceHasEdge) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `test message ${id-1}` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const updateNodeText = (nodeId, text) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label: text };
        }
        return node;
      })
    );
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: text } });
    }
  };

  const saveFlow = () => {
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      setError('Cannot save Flow: More than one node has an empty target handle.');
      setTimeout(() => setError(''), 5000);
    } else {
      setError('');
      console.log('Flow saved successfully!', { nodes, edges });
      alert('Flow saved successfully!');
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect} // FIX 2: Stray 'L' is removed.
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <div className="top-bar">
          {error && <div className="error-message">{error}</div>}
          <button onClick={saveFlow} className="save-button">
            Save Changes
          </button>
        </div>
        <SidePanel
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          onBack={() => setSelectedNode(null)}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default App;