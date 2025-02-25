
import React, { useState } from 'react';
import RDSCanvas from './components/Canvas/RDSCanvas';
import ControlPanel from './components/Controls/ControlPanel';
import ResultsTable from './components/Results/ResultsTable';
import { Alert } from './components/ui/Alert';

const App = () => {
  const [testResults, setTestResults] = useState([]);
  const [testState, setTestState] = useState('Setup');

  const handleTestStart = () => {
    setTestState('Testing');
  };

  const handleTestComplete = (result) => {
    setTestResults((prevResults) => [...prevResults, result]);
    setTestState('Complete');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Fusional Vergence Range Testing</h1>
      <ControlPanel onTestStart={handleTestStart} onTestComplete={handleTestComplete} />
      <RDSCanvas testState={testState} />
      {testResults.length > 0 && <ResultsTable results={testResults} />}
      {testState === 'Complete' && <Alert message="Test completed successfully!" />}
    </div>
  );
};

export default App;