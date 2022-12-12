import * as React from "react";
import Draggable from "react-draggable";
import { Box, useTheme } from "@mui/material";
import { useStore } from "reactflow";
import useModeStore from "../../services/ModeStore";
import InfoDialog from "../InfoDialog/InfoDialog";

const nodesLengthSelector = (state) =>
  Array.from(state.nodeInternals.values()).length || 0;
const edgesLengthSelector = (state) => state.edges.length || 0;

export default function GraphInfo({
  degrees,
  inDegrees,
  outDegrees,
  adjacencyMatrix,
}) {
  const nodesLength = useStore(nodesLengthSelector);
  const edgesLength = useStore(edgesLengthSelector);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const directedMode = useModeStore((state) => state.directedMode);
  const containerStyles = {
    maxWidth: "170px",
    padding: "1rem",
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    zIndex: "8",
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.dots,
  };
  const textStyle = {
    color: theme.palette.text.secondary,
    margin: "0.25rem auto",
  };
  
  const handleClickOpen = () => {
    console.log("OPENING");
    setOpen(true);
  };

  const onClose = () => {
    console.log("test", open);
    setOpen(false);
  };
  
  return (
    <>
    <Draggable>
      
      <Box sx={containerStyles} onClick={handleClickOpen}>
        <div title="Total number of nodes" style={textStyle} className="info-item" >
          n: {nodesLength}
        </div>
        <div title="Total number of edges" style={textStyle} className="info-item">
          m: {edgesLength}
        </div>
        {!directedMode && (
          <div title="Max degree" style={textStyle} className="info-item">
            {" "}
            k: {Math.max(...degrees)}
          </div>
        )}
        {directedMode && (
          <>
            <div title="Total number of nodes" style={textStyle} className="info-item">
              {" "}
              in deg: {Math.max(...inDegrees)}
            </div>
            <div style={textStyle} className="info-item">
              {" "}
              out deg: {Math.max(...outDegrees)}
            </div>
          </>
        )}
      
      </Box>
      
    </Draggable>
    <InfoDialog
        degrees={degrees}
        inDegrees={inDegrees}
        outDegrees={outDegrees}
        open={open}
        onClose={onClose}
      />
    </>
  );
}
