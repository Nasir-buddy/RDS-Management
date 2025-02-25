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
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <header className="w-full bg-gray-800 py-4 px-6 shadow-lg">
        <h1 className="text-4xl font-bold text-center">Fusional Vergence Range Testing</h1>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <ControlPanel
              onTestStart={handleTestStart}
              onTestComplete={handleTestAction}
              isTesting={isTesting}
              breakPoint={breakPoint}
              recoveryPoint={recoveryPoint}
            />
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Instructions</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Set your parameters and press "Start Test" to begin</li>
                <li>Look at the stereo image through red-blue glasses</li>
                <li>Press "Mark Break Point" (or key 'B') when the image breaks apart</li>
                <li>Press "Mark Recovery Point" (or key 'R') when fusion is regained</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Canvas and Results */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              {isTesting && (
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-4 rounded-lg mb-4 shadow-lg">
                  <p className="text-lg font-semibold flex items-center space-x-2">
                    <span>Current Disparity:</span>
                    <span className="text-blue-200">
                      {Math.abs(currentDisparity).toFixed(1)} pixels
                    </span>
                  </p>
                  {breakPoint && 
                    <p className="text-lg font-semibold mt-2 flex items-center space-x-2">
                      <span>Break Point:</span>
                      <span className="text-yellow-200">
                        {breakPoint} arc seconds
                      </span>
                    </p>
                  }
                </div>
              )}

              <div className="max-w-4xl mx-auto">
                <RDSCanvas
                  testState={testState}
                  currentDisparity={currentDisparity}
                  dotSize={testParameters.dotSize}
                  dotDensity={testParameters.dotDensity}
                  screenWidth={testParameters.screenWidth}
                  viewingDistance={testParameters.viewingDistance}
                />
              </div>
            </div>

            {testResults.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Test Results</h2>
                <ResultsTable results={testResults} />
                <div className="mt-4">
                  <ResultsExport results={testResults} />
                </div>
              </div>
            )}
          </div>
        </div>

        {testState === 'Complete' && (
          <div className="mt-6">
            <Alert
              message={`Test completed successfully! Break point: ${breakPoint} arc seconds, Recovery point: ${recoveryPoint} arc seconds`}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;