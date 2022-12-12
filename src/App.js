
import { createTheme, Experimental_CssVarsProvider as ThemeProvider} from '@mui/material';
import React from 'react';
import { ReactFlowProvider } from 'react-flow-renderer';
import './App.scss';
import MainComponent from './components/MainComponent/MainComponent';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
const primaryPurple = '#D3D2E4';
const primaryGrey = '#2F2F31';
const primaryRed = '#bc4d61';
const getDesignTokens = (mode) => {
  return ({

  palette: {
    mode,
    primary: {
      main: '#000'
    },
    ...(mode === 'dark' ? {
      background: {
        default: primaryGrey,
        dots: primaryPurple,
      }} : {
        background: {
          default: primaryPurple,
          dots: primaryGrey,
          danger: primaryRed
        },
    }),
    ...(mode === 'dark' ? {
      text: {
        primary: primaryPurple,
        secondary: primaryGrey,
        disabled: '#eee'}} : {
        text: {
          primary: primaryGrey,
          secondary: primaryPurple,
          disabled: '#eee'},
    }),
   
  },
})};

export function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <div className="App">
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ReactFlowProvider>
          <MainComponent />
      </ReactFlowProvider>
      </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}




