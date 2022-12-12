import React, { useCallback, useEffect, useRef, useState } from 'react';

import ReactFlow,  { addEdge, useNodesState, useEdgesState, MarkerType } from 'reactflow';

import CustomNode from '../CustomNode/CustomNode';
import FloatingEdge from '../FloatingEdge/FloatingEdge';
import CustomConnectionLine from '../CustomConnectionLine/CustomConnectionLine';

import 'reactflow/dist/style.css';
import { useKeyPress, useReactFlow } from 'react-flow-renderer';
import { useMemo } from 'react';
import OptionsNode from '../OptionsNode/OptionsNode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../App';
import GraphInfo from '../GraphInfo/GraphInfo';
import useModeStore from '../../services/ModeStore';
import DownloadImage from '../DownloadImage/DownloadImage';

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
];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
};

let nodeId = 4;

const MainComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [degrees, setDegrees] = useState([0,0,0,0]);
  const [inDegrees, setInDegrees] = useState([0,0,0,0]);
  const [outDegrees, setOutDegrees] = useState([0,0,0,0]);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState([0][0]);
  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const directedMode = useModeStore((state) => state.directedMode);
  const spacePressed = useKeyPress('Space');
  const resetBooleans = useModeStore((state) => state.reset);
  const resetDirectedMode = useModeStore((state) => state.resetDirectedMode);
  const prevEdgesRef = useRef();
  useEffect(() => {
   if(spacePressed){
    addNode();
   }
  }, [spacePressed]);
  
  useEffect(() =>{
    let updatedEdges = []
    if(directedMode){
      updatedEdges = edges.map((e) => {
        let edge = e;
        if(e.source !== e.target){
        edge.markerEnd = {
          type: MarkerType.ArrowClosed, 
          color: edge.data ? edge.data : theme.palette.text.primary ,
        }}
        return edge;
      });
    } else {
      updatedEdges = edges.map((e) => {
        let edge = e;
        edge.markerEnd = {}
        return edge;
      });
    }
    if(prevEdgesRef.current !== updatedEdges){
      // console.log("true");
      setEdges(updatedEdges)
    }
   
    
  }, [directedMode, edges])
  

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
    resetBooleans();
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
    setInDegrees(updatedDegrees)
    setOutDegrees(updatedDegrees)
  }, [degrees, nodes, resetBooleans, setNodes])
  
  const deleteAllNodes = () => {
    const reset = [];
    setNodes(reset);
    setEdges(reset);
    setDegrees([0]);
    setInDegrees([0])
    setOutDegrees([0])
    resetBooleans();
    reactFlowInstance.setNodes(() => []);
    reactFlowInstance.setEdges(() => []);
    nodeId = 0;
  }

  useEffect(() => { 
   let updatedDegrees = new Array(nodes.length === 0 ? 1 : nodes.length).fill(0);
   let updatedInDegrees = new Array(nodes.length === 0 ? 1 : nodes.length).fill(0);
   let updatedOutDegrees = new Array(nodes.length === 0 ? 1 : nodes.length).fill(0);
   let adjMatrix = Array(nodes.length).fill().map(() => Array(nodes.length).fill(0));
   edges.forEach((e) => {
    //adj matrix calculation
    adjMatrix[e.source -1][e.target -1] = 1
    adjMatrix[e.target -1][e.source -1] = 1
    // Degree calculation
    updatedDegrees[e.source - 1] += 1
    updatedInDegrees[e.target - 1] += 1
    updatedOutDegrees[e.source - 1] += 1
    if(e.source !== e.target) {
      updatedDegrees[e.target - 1] += 1
    }
   });
   setDegrees(updatedDegrees);
   setInDegrees(updatedInDegrees);
   setOutDegrees(updatedOutDegrees);
   setAdjacencyMatrix(adjMatrix);

   prevEdgesRef.current = edges;
  }, [nodes,edges])

  const onConnect = useCallback((params) => {
    // let currentEdge = params;
    // if(directedMode) {
    //   console.log("test in directedMode");
    //   currentEdge.markerEnd = {
    //     type: MarkerType.ArrowClosed, 
    //     color: params.data ? params.data : theme.palette.text.primary ,
    //   }
    // } 
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);
  const checkDirectedMode = (newEdges) => {
    let updatedEdges = [];
      if(directedMode) {
        updatedEdges = newEdges.map((e) => {
          let edge = e;
          if(e.source !== e.target){
          edge.markerEnd = {
            type: MarkerType.ArrowClosed, 
            color: edge.data ? edge.data : theme.palette.text.primary ,
          }
        }
          return edge;
        });
      } else {
        updatedEdges = newEdges.map((e) => {
          let edge = e;
          edge.markerEnd = {}
          return edge;
        });
      }
      return updatedEdges
  }

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
  if(colorMode) {
    const currentColor = color
    const updatedEdges = edges.map((e) => {
      if(e.id === edge.id){
        e.data = color
        if(directedMode){
          e.markerEnd = {
            type: MarkerType.Arrow, 
            color: currentColor,
          }
        }
        
      }
      return e
    });
    setEdges(updatedEdges);
  }
  }
  
  const theme = useTheme();
  const resetGraph = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    resetBooleans();
    resetDirectedMode();  
  }
  
  const colorModeContext = React.useContext(ColorModeContext);
  
  return ( <>
    <Box className='react-flow' sx={{
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
        <GraphInfo adjacencyMatrix={adjacencyMatrix} inDegrees={inDegrees} outDegrees={outDegrees} degrees={degrees} />  
        </ReactFlow>
    </Box>
    
    <OptionsNode resetGraph={resetGraph} addNode={addNode} deleteAllNodes={deleteAllNodes} />
    <DownloadImage />
     <IconButton sx={{ ml: 1, position: 'absolute', top: '2rem', right: '2rem' }} onClick={colorModeContext.toggleColorMode} color={theme.palette.background.dots}>
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
     </>
  );
 
};

export default MainComponent;



 