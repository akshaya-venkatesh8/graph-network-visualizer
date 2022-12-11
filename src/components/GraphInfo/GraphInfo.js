import * as React from "react";
import Draggable from "react-draggable";
import { Box, useTheme } from "@mui/material";
import { useStore } from "reactflow";
import { useEffect } from "react";

const nodesLengthSelector = (state) => Array.from(state.nodeInternals.values()).length || 0;
const edgesLengthSelector = (state) => state.edges.length || 0;

export default function GraphInfo({degrees}) {

    const nodesLength = useStore(nodesLengthSelector);
    const edgesLength = useStore(edgesLengthSelector);
    const maxDegree = Math.max(...degrees)
    // useEffect(() => {
    //   console.log('nodes length changed:', nodesLength);

     
    // }, [nodesLength]);
    // useEffect(() => {
    //   console.log('edges length changed:', edgesLength);
    //   console.log('degrees  changed:', degrees);
      
      
     
    // }, [degrees, edgesLength]);
  const theme = useTheme();
  const containerStyles = {
    maxWidth: '170px',
    padding: "1rem",
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    zIndex: '8',
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: '1rem',
    backgroundColor: theme.palette.background.dots
  };
  const textStyle = {
    color: theme.palette.text.secondary,
  };
  return (
    <Draggable>
      <Box
        sx={containerStyles}
      >
        <div style={textStyle} className="node-length"> n: {nodesLength}</div>
        <div style={textStyle} className="edge-length"> m: {edgesLength}</div>
        <div style={textStyle} className="edge-length"> k: {maxDegree}</div>
      
      </Box>
    </Draggable>
  );
}
