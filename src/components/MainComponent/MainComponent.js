import React, { useCallback, useEffect, useState } from 'react';

import ReactFlow,  { addEdge, useNodesState, useEdgesState, MarkerType } from 'reactflow';

import CustomNode from '../CustomNode/CustomNode';
import FloatingEdge from '../FloatingEdge/FloatingEdge';
import CustomConnectionLine from '../CustomConnectionLine/CustomConnectionLine';

import 'reactflow/dist/style.css';
import { useReactFlow } from 'react-flow-renderer';
import { useMemo } from 'react';
import OptionsNode from '../OptionsNode/OptionsNode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../App';
import GraphInfo from '../GraphInfo/GraphInfo';
import useModeStore from '../../services/store';


const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 50, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 150, y: 150 },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 50, y: 150 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 150, y: 0 },
  },
];

const initialEdges = [
  // { id: 'ea-b', source: '1', target: '2', type: 'straight' },
  // { id: 'e1-b', source: '1', target: '2', type: 'default' },
  // { id: 'e1-2', source: '1', target: '2', type: 'default' },
];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
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


const MainComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [degrees, setDegrees] = useState([0,0,0,0]);
  
  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const setColorNodes = useModeStore((state) => state.setColorNodes);
  const colorNodes = useModeStore((state) => state.colorNodes);
  const color = useModeStore((state) => state.color);

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
    let updatedDegrees = degrees;
    updatedDegrees[id-1] = 0
    updatedNodes.push(newNode);
    setNodes(updatedNodes)
    setDegrees(updatedDegrees);
  }, [degrees, nodes, setNodes])
  
  const deleteNodes = () => {
    const reset = [];
    setNodes(reset);
    setEdges(reset);
    setDegrees([0]);
    reactFlowInstance.setNodes(() => []);
    reactFlowInstance.setEdges(() => []);
    nodeId = 0;
  }

  useEffect(() => {
    
   let updatedDegrees = new Array(nodes.length === 0 ? 1 : nodes.length).fill(0);
   edges.forEach((e) => {
    updatedDegrees[e.source - 1] += 1
    if(e.source !== e.target) {
      updatedDegrees[e.target - 1] += 1
    }
   });
   setDegrees(updatedDegrees);
  }, [nodes,edges])
  const onConnect = useCallback((params) => {
    setEdges((eds) => {
      // console.log(eds);
      return addEdge(params, eds)})
  }, [ setEdges]);


  //Deletes Nodes if delete mode is true
  const nodeClickHandler = (event, node) => {
    if(deleteMode) {
      if(node && nodes.length > 0){
          const delId = node.id;
          const updatedNodes = nodes.filter((n) =>  n.id !== delId)
          const updatedEdges = edges.filter((e) => !(e.source === delId || e.target === delId))
          setNodes(updatedNodes)
          setEdges(updatedEdges)
          reactFlowInstance.setNodes(updatedNodes);
          reactFlowInstance.setEdges(updatedNodes);
      }
  }
  if(colorMode) {
    const updatedNodes = nodes.map((n) => {
      if(n.id === node.id){
        n.data = {'color': color}
      }
      return n;
    })
    setNodes(updatedNodes);
  }
  }

 
  //Deletes Edges if delete mode is true
  const edgeClickHandler = (event, edge) => {
    if(deleteMode) {
      if(edge && edges.length > 0){
        const delId = edge.id;
        const updatedEdges = edges.filter((e) => e.id !== delId)
        setEdges(updatedEdges)
        reactFlowInstance.setEdges(updatedEdges);
    } 
  }
  // if(colorMode) {
  //   setColorNode()
  // }
  }
  
  const theme = useTheme();
  
  const colorModeContext = React.useContext(ColorModeContext);
  
  return ( <>
    <Box className='animation' sx={{

        width: '100%',
        height: '100vh',
        background: `radial-gradient(${theme.palette.background.dots} 1px, ${theme.palette.background.default} 1px)`,
        backgroundSize: '15px 15px',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}>
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
    >
        <GraphInfo degrees={degrees} />  
        </ReactFlow>
    </Box>
    
     <OptionsNode addNode={addNode} deleteNodes={deleteNodes} />
     <IconButton sx={{ ml: 1, position: 'absolute', top: '2rem', right: '2rem' }} onClick={colorModeContext.toggleColorMode} color={theme.palette.background.dots}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
     </>
  );
 
};

export default MainComponent;



 