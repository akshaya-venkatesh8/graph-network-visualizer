
import { ReactFlowProvider } from 'react-flow-renderer';
import './App.scss';
import EasyConnect from './components/easy-connect/EasyConnect';


function App() {
  return (
    <div className="App">
      
        <ReactFlowProvider>
          <EasyConnect />
      </ReactFlowProvider>
      
    </div>
  );
}

export default App;
