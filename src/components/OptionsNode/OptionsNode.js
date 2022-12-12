import React from "react";
import Button from "@mui/material/Button";
import Draggable from "react-draggable";
import "./OptionsNode.scss";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  useTheme,
} from "@mui/material";
import useModeStore from "../../services/ModeStore";
import { useState } from "react";

export default function OptionsNode(props) {
  const theme = useTheme();

  const toggleDeleteMode = useModeStore((state) => state.toggleDeleteMode);
  const toggleColorMode = useModeStore((state) => state.toggleColorMode);
  const toggleDirectedMode = useModeStore((state) => state.toggleDirectedMode);
  const toggleShowNodeLabels = useModeStore(
    (state) => state.toggleShowNodeLabels
  );

  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const directedMode = useModeStore((state) => state.directedMode);

  const color = useModeStore((state) => state.color);
  const setColor = useModeStore((state) => state.setColor);

  const [showMenu, setShowMenu] = useState(false);
  const containerStyles = {
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.background.dots,
  };
  const commonButtonStyles = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
  };
  const textStyle = {
    color: theme.palette.text.primary,
  };
  const checkBoxStyle = {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    margin: "0.5rem auto",
    borderRadius: "4px",
    width: "100%",
  };
  const menuHandleStyles = {
    backgroundColor: theme.palette.background.default,
  }
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const getCheckbox = () => (
    <Checkbox
      style={textStyle}
      className="label-checkbox"
      onChange={toggleShowNodeLabels}
      size="small"
      defaultChecked
    />
  );

  return (
    <Draggable>
      <Box className="options-container"  sx={containerStyles}>
        <div onClick={() => {setShowMenu(!showMenu)}} style={{backgroundColor: theme.palette.background.dots,}} className={`menu-icon ${showMenu ? 'show' : 'hide'} `}>
          <div style={{backgroundColor: theme.palette.background.default,}}  className={`stroke upper ${showMenu ? 'show' : 'hide'} `}></div>
          <div style={{backgroundColor: theme.palette.background.default,}}  className={`stroke lower ${showMenu ? 'show' : 'hide'} `}></div>
        </div>
        <div className={`buttons-container ${showMenu ? 'show' : 'hide'} `}>
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
        <FormControlLabel
          className="form-control-checkbox"
          style={checkBoxStyle}
          control={getCheckbox()}
          label="Node labels"
        />

        <Button
          className="btn"
          style={commonButtonStyles}
          onClick={props.resetGraph}
          variant="contained"
          size="small"
        >
          Reset
        </Button>
        </div>
      </Box>
    </Draggable>
  );
}
