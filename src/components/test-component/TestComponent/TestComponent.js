import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, useReactFlow } from 'react-flow-renderer';
import './TestComponent.scss'
import initialNodes from './nodes.js';
import initialEdges from './edges.js';
let nodeId = 3;
function TestComponent() {
    const reactFlowInstance = useReactFlow();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const addNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data: {
        label: `${id}`,
      },
      style: {width: 35, height: 35 , }
    };
    reactFlowInstance.addNodes(newNode);
  }, [reactFlowInstance]);
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className='flow-parent'>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    />
     <button onClick={addNode} className="btn-add">
        Add Node
      </button>
    </div>
  );
}

export default TestComponent;
