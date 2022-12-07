import React, { useCallback, useEffect, useState } from 'react';

import ReactFlow,  { addEdge, useNodesState, useStore, useEdgesState, MarkerType } from 'reactflow';

import CustomNode from '../CustomNode/CustomNode';
import FloatingEdge from '../FloatingEdge/FloatingEdge';
import CustomConnectionLine from '../CustomConnectionLine/CustomConnectionLine';

import 'reactflow/dist/style.css';
import { useReactFlow } from 'react-flow-renderer';
import { useMemo } from 'react';

const nodesLengthSelector = (state) => Array.from(state.nodeInternals.values()).length || 0;
const edgesLengthSelector = (state) => state.edges.length || 0;
// const setSelectedElements = state => state.setSelectedElements;
// const unsetUserSelection = (state => state.unsetUserSelection);

const NodesLengthLogger = () => {
    const nodesLength = useStore(nodesLengthSelector);
    const edgesLength = useStore(edgesLengthSelector);
    
    useEffect(() => {
      console.log('nodes length changed:', nodesLength);
     
    }, [nodesLength]);
    useEffect(() => {
      console.log('edges length changed:', edgesLength);
     
    }, [edgesLength]);
  
    return null;
  };
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
  },
];

const initialEdges = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

// const nodeTypes = {
//   custom: CustomNode,
// };

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  // markerEnd: {
  //   type: MarkerType.ArrowClosed, //make it directed.
  //   color: 'black',
  // },
  
};
let nodeId = 4;


const EasyConnect = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [deleteMode, setDeleteMode] = useState(false);
  const reactFlowInstance = useReactFlow(); 
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      floating: FloatingEdge,
    }),
    []
  );
  const addNode = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 200,
        y: Math.random() * 200,
      },
      type: 'custom',
    };
    const updatedNodes = [...nodes];
    updatedNodes.push(newNode);
    setNodes(updatedNodes)
  }, [nodes])
  
  const deleteNodes = () => {
    nodeId = 0
    const nodes = [];
    setNodes(nodes);
    reactFlowInstance.setNodes(() => []);
    nodeId = 0;
  }
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

 
  const onChange = (params) => {
    console.log("on change called");
    if(deleteMode) {
        if(params.nodes.length > 0){
            const delId = params?.nodes[0]?.id;
            const updatedNodes = nodes.filter((node) =>  node.id !== delId)
            setNodes(updatedNodes)
            reactFlowInstance.setNodes(updatedNodes);
        }
        if(params.edges.length > 0){
            const delId = params?.edges[0]?.id;
            const updatedEdges = edges.filter((edge) => edge.id !== delId)
            setEdges(updatedEdges)
            reactFlowInstance.setEdges(updatedEdges);
        } 
    }
  }
  
  const nodeClickHandler = (event, node) => {
    if(deleteMode) {
      if(node && nodes.length > 0){
          const delId = node.id;
          const updatedNodes = nodes.filter((n) =>  n.id !== delId)
          setNodes(updatedNodes)
          reactFlowInstance.setNodes(updatedNodes);
      }
  }
  }
  const edgeClickHandler = (event, edge) => {
    if(deleteMode) {
      if(edge && edges.length > 0){
        const delId = edge.id;
        const updatedEdges = edges.filter((e) => e.id !== delId)
        setEdges(updatedEdges)
        reactFlowInstance.setEdges(updatedEdges);
    } 
  }
  }
  const deleteModeToggle = () => {
    setDeleteMode(!deleteMode);
    
  }
  
  return (
    <div className={deleteMode ? 'flow-parent delete-mode': 'flow-parent'} >
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={nodeClickHandler}
      onEdgeClick={edgeClickHandler}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineComponent={CustomConnectionLine}
      connectionLineStyle={connectionLineStyle}
      // onSelectionChange={onChange}
    >
        <NodesLengthLogger />
        </ReactFlow>
     <button onClick={addNode} className="btn btn-add">
        Add Node
      </button>
      <button onClick={deleteNodes} className="btn btn-del-all">
        Clear graph
      </button>
      <button onClick={deleteModeToggle} className="btn btn-del">
       {deleteMode ? 'Disable deletion mode' : 'Deletion Mode'}
      </button>
    </div>
  );
};

export default EasyConnect;