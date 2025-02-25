import React, { useState } from 'react';
import RDSCanvas from './components/Canvas/RDSCanvas';
import ControlPanel from './components/Controls/ControlPanel';
import ResultsTable from './components/Results/ResultsTable';
import Alert from './components/ui/Alert';
import useTestLogic from './hooks/useTestLogic';
import { DEFAULT_DOT_SIZE, DEFAULT_DOT_DENSITY } from './utils/constants';

const App = () => {
  const [testResults, setTestResults] = useState([]);
  const [testState, setTestState] = useState('Setup');
  const [testParameters, setTestParameters] = useState({
    dotSize: DEFAULT_DOT_SIZE,
    dotDensity: DEFAULT_DOT_DENSITY,
    viewingDistance: 60,
    screenWidth: 40
  });

  const {
    currentDisparity,
    isTesting,
    startTest,
    markBreakPoint,
    markRecoveryPoint
  } = useTestLogic();

  const handleTestStart = (parameters) => {
    setTestParameters(parameters);
    setTestState('Testing');
    startTest();
  };

  const handleTestComplete = (result) => {
    setTestResults((prevResults) => [...prevResults, result]);
    setTestState('Complete');
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Fusional Vergence Range Testing</h1>
      <ControlPanel 
        onTestStart={handleTestStart}
        onTestComplete={handleTestComplete}
      />
      <RDSCanvas 
        testState={testState}
        currentDisparity={currentDisparity}
        dotSize={testParameters.dotSize}
        dotDensity={testParameters.dotDensity}
        screenWidth={testParameters.screenWidth}
        viewingDistance={testParameters.viewingDistance}
      />
      {testResults.length > 0 && <ResultsTable results={testResults} />}
      {testState === 'Complete' && <Alert message="Test completed successfully!" />}
    </div>
  );
};

export default App;