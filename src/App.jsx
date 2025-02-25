import React, { useState, useCallback } from 'react';
import RDSCanvas from './components/Canvas/RDSCanvas';
import ControlPanel from './components/Controls/ControlPanel';
import ResultsTable from './components/Results/ResultsTable';
import ResultsExport from './components/Results/ResultsExport';
import Alert from './components/ui/Alert';
import useTestLogic from './hooks/useTestLogic';
import useKeyPress from './hooks/useKeyPress';
import { DEFAULT_DOT_SIZE, DEFAULT_DOT_DENSITY } from './utils/constants';

const App = () => {
  // use state to store test results and test state
  const [testResults, setTestResults] = useState([]);
  // use state to store test state and test parameters
  const [testState, setTestState] = useState('Setup');
  // use state that receive the default parameters
  const [testParameters, setTestParameters] = useState({
    dotSize: DEFAULT_DOT_SIZE,
    dotDensity: DEFAULT_DOT_DENSITY,
    viewingDistance: 60,
    screenWidth: 40
  });
  // variable to store the current disparity,
  //  break point,
  //  recovery point,
  //  isTesting,
  //  testDirection,
  //  startTest,
  //  markBreakPoint,
  //  markRecoveryPoint,
  //  completeTest
  
  const {
    currentDisparity,
    breakPoint,
    recoveryPoint,
    isTesting,
    testDirection,
    startTest,
    markBreakPoint,
    markRecoveryPoint,
    completeTest
  } = useTestLogic(testParameters.viewingDistance, testParameters.screenWidth);

  // function to handle the test start and set the test parameters
  const handleTestStart = useCallback((parameters) => {
    setTestParameters(parameters);
    setTestState('Testing');
    startTest(parameters);
  }, [startTest]);

  const handleTestAction = useCallback((action) => {
    if (action === 'break') {
      markBreakPoint();
    } else if (action === 'recovery') {
      const result = completeTest();
      if (result) {
        setTestResults((prevResults) => [...prevResults, result]);
        setTestState('Complete');
      }
    }
  }, [markBreakPoint, completeTest]);

  // Keyboard shortcuts
  useKeyPress('b', () => {
    if (isTesting && breakPoint === null) {
      handleTestAction('break');
    }
  });
  
  useKeyPress('r', () => {
    if (isTesting && breakPoint !== null && recoveryPoint === null) {
      handleTestAction('recovery');
    }
  });

  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-4xl font-bold my-5">Fusional Vergence Range Testing</h1>
      
      <div className="w-full max-w-4xl">
        <ControlPanel 
          onTestStart={handleTestStart}
          onTestComplete={handleTestAction}
          isTesting={isTesting}
          breakPoint={breakPoint}
          recoveryPoint={recoveryPoint}
        />
        
        <div className="mb-4">
          {isTesting && (
            <div className="bg-gray-800 p-2 rounded mb-2 text-center">
              <p>Current Disparity: {Math.abs(currentDisparity).toFixed(1)} pixels</p>
              {breakPoint && <p>Break Point: {breakPoint} arc seconds</p>}
            </div>
          )}
          
          <RDSCanvas 
            testState={testState}
            currentDisparity={currentDisparity}
            dotSize={testParameters.dotSize}
            dotDensity={testParameters.dotDensity}
            screenWidth={testParameters.screenWidth}
            viewingDistance={testParameters.viewingDistance}
          />
        </div>
        
        {testResults.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-2">Test Results</h2>
            <ResultsTable results={testResults} />
            <ResultsExport results={testResults} />
          </div>
        )}
        
        {testState === 'Complete' && (
          <Alert 
            message={`Test completed successfully! Break point: ${breakPoint} arc seconds, Recovery point: ${recoveryPoint} arc seconds`} 
          />
        )}
        
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Instructions</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Set your parameters and press "Start Test" to begin</li>
            <li>Look at the stereo image through red-blue glasses</li>
            <li>Press "Mark Break Point" (or key 'B') when the image breaks apart</li>
            <li>Press "Mark Recovery Point" (or key 'R') when fusion is regained</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;