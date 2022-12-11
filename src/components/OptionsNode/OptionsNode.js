import React, { useState } from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import "./OptionsNode.scss";
import { Box, useTheme } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import useModeStore from "../../services/store";

export default function OptionsNode(props) {
  const theme = useTheme();
  
  const toggleDeleteMode = useModeStore((state) => state.toggleDeleteMode)
  const toggleColorMode = useModeStore((state) => state.toggleColorMode)
  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const color = useModeStore((state) => state.color);
  const setColor = useModeStore((state) => state.setColor);
  const containerStyles = {
    maxWidth: "170px",
    padding: "1rem",
    position: "absolute",
    top: "1rem",
    left: "1rem",
    border: `1px solid ${theme.palette.text.primary}`,
    borderRadius: "1rem",
    backgroundColor: theme.palette.background.dots,
  };
  const commonButtonStyles = {
    width: "100%",
    margin: "0.5rem auto",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <Draggable>
      <Box sx={containerStyles}>
        <Button
          style={commonButtonStyles}
          onClick={props.addNode}
          variant="contained"
          size="small"
        >
          Add Node
        </Button>
        <Button
          style={commonButtonStyles}
          onClick={props.deleteNodes}
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
          className={deleteMode ? "shadow" : ""}
        >
          Delete Mode
        </Button>
        <Button
          style={commonButtonStyles}
          onClick={toggleColorMode}
          variant="contained"
          size="small"
          className={colorMode ? "shadow" : ""}
        >
          Color Mode
        </Button>
        {colorMode && (
          <div className="color-input">
            <input type="color" value={color} onChange={handleColorChange} />
          </div>
        )}
      </Box>
    </Draggable>
  );
}
