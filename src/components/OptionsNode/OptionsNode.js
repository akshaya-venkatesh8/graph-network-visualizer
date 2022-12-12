import React from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import "./OptionsNode.scss";
import { Box, useTheme } from "@mui/material";
import useModeStore from "../../services/ModeStore";

export default function OptionsNode(props) {
  const theme = useTheme();
  
  const toggleDeleteMode = useModeStore((state) => state.toggleDeleteMode)
  const toggleColorMode = useModeStore((state) => state.toggleColorMode)
  const toggleDirectedMode = useModeStore((state) => state.toggleDirectedMode)
  const toggleShowNodeLabels = useModeStore((state) => state.toggleShowNodeLabels)

  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const directedMode = useModeStore((state) => state.directedMode);
  const showNodeLabels = useModeStore((state) => state.showNodeLabels);

  const color = useModeStore((state) => state.color);
  const setColor = useModeStore((state) => state.setColor);

  const containerStyles = {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.dots,
  };
  const commonButtonStyles = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <Draggable>
      <Box className="options-container" sx={containerStyles}>
        <Button
          className="btn"
          style={commonButtonStyles}
          onClick={props.addNode}
          variant="contained"
          size="small"
        >
          Add Node
        </Button>
        <Button
        className="btn"
          style={commonButtonStyles}
          onClick={props.deleteAllNodes}
          variant="contained"
          size="small"
        >
          Clear graph
        </Button>
        <Button
          style={commonButtonStyles}
          onClick={toggleDeleteMode}
          variant="contained"
          size="small"
          className={deleteMode ? "btn shadow" : "btn"}
        >
          Delete Mode
        </Button>
        <Button
          style={commonButtonStyles}
          onClick={toggleColorMode}
          variant="contained"
          size="small"
          className={colorMode ? " btn shadow" : "btn"}
        >
          Color Mode
        </Button>
        {colorMode && (
          <div className="color-input">
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
        )}
           <Button
          style={commonButtonStyles}
          onClick={toggleDirectedMode}
          variant="contained"
          size="small"
          className={directedMode ? " btn shadow" : "btn"}
        >
          Directed Mode
        </Button>
         <Button
          style={commonButtonStyles}
          onClick={toggleShowNodeLabels}
          variant="contained"
          size="small"
          className={showNodeLabels ? "" : "shadow"}
        >
          {showNodeLabels ? 'Hide Node Labels' : 'Show Node Labels'}
        </Button>
         <Button
          className="btn"
          style={commonButtonStyles}
          onClick={props.resetGraph}
          variant="contained"
          size="small"
        >
         Reset
        </Button>
      </Box>
    </Draggable>
  );
}
