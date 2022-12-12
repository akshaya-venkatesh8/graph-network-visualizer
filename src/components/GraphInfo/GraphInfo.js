import * as React from "react";
import Draggable from "react-draggable";
import { Box, useTheme } from "@mui/material";
import { useEdges, useStore } from "reactflow";
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <Draggable>
      <Box sx={containerStyles} onClick={handleClickOpen}>
        <div style={textStyle} className="node-length">
          {" "}
          n: {nodesLength}
        </div>
        <div style={textStyle} className="edge-length">
          {" "}
          m: {edgesLength}
        </div>
        {!directedMode && (
          <div style={textStyle} className="edge-length">
            {" "}
            k: {Math.max(...degrees)}
          </div>
        )}
        {directedMode && (
          <>
            <div style={textStyle} className="edge-length">
              {" "}
              in deg: {Math.max(...inDegrees)}
            </div>
            <div style={textStyle} className="edge-length">
              {" "}
              out deg: {Math.max(...outDegrees)}
            </div>
          </>
        )}
      <InfoDialog
        open={open}
        onClose={handleClose}
      />
      </Box>
    </Draggable>
  );
}
