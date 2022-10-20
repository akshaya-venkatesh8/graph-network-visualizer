
import { ReactFlowProvider } from 'react-flow-renderer';
import './App.scss';
import TestComponent from './components/test-component/TestComponent/TestComponent';

function App() {
  return (
    <div className="App">
      
        <ReactFlowProvider>
          <TestComponent />
      </ReactFlowProvider>
      
    </div>
  );
}

export default App;
