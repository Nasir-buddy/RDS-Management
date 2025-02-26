import React, { useState } from 'react';
import TestParameters from './TestParameters';
import { 
  DEFAULT_VIEWING_DISTANCE_CM, 
  DEFAULT_SCREEN_WIDTH_CM, 
  DEFAULT_DOT_SIZE, 
  DEFAULT_DOT_DENSITY,
  DEFAULT_INCREASE_RATE,
  TEST_TYPES
} from '../../utils/constants';

// Component to display the control panel
const ControlPanel = ({ onTestStart, onTestComplete, isTesting, breakPoint, recoveryPoint }) => {
    const [parameters, setParameters] = useState({
        viewingDistance: DEFAULT_VIEWING_DISTANCE_CM,
        screenWidth: DEFAULT_SCREEN_WIDTH_CM,
        dotSize: DEFAULT_DOT_SIZE,
        dotDensity: DEFAULT_DOT_DENSITY,
        increaseRate: DEFAULT_INCREASE_RATE,
        testDirection: TEST_TYPES[0]
    });

    // Function to handle the start button click
    const handleStartClick = () => {
        onTestStart(parameters);
    };
    // Function to handle the break button click
    const handleBreakClick = () => {
        onTestComplete('break');
    };
    // Function to handle the recovery button click
    const handleRecoveryClick = () => {
        onTestComplete('recovery');
    };

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold">Control Panel</h2>
            </div>
            
            <div className="p-6">
                {!isTesting ? (
                    <>
                        <TestParameters parameters={parameters} setParameters={setParameters} />
                        <div className="mt-6">
                            <button 
                                onClick={handleStartClick} 
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
                                    hover:bg-blue-700 transition-colors duration-200"
                            >
                                Start Test
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-blue-900 p-4 rounded-lg">
                            <p className="font-bold text-lg mb-2">Test in Progress: {parameters.testDirection}</p>
                            <p className="text-gray-300">Press the appropriate button when you experience the change:</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={handleBreakClick}
                                disabled={breakPoint !== null}
                                className={`py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                                    breakPoint === null 
                                        ? 'bg-yellow-500 hover:bg-yellow-600' 
                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Mark Break Point
                            </button>
                            
                            <button 
                                onClick={handleRecoveryClick}
                                disabled={breakPoint === null || recoveryPoint !== null}
                                className={`py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                                    breakPoint !== null && recoveryPoint === null
                                        ? 'bg-green-500 hover:bg-green-600' 
                                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Mark Recovery Point
                            </button>
                        </div>
                        
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <p className="text-gray-300">
                                {breakPoint === null ? (
                                    "Increasing disparity - press Mark Break Point when the image breaks into two images"
                                ) : recoveryPoint === null ? (
                                    "Moving back to unity - press Mark Recovery Point when the images fuse back together"
                                ) : (
                                    "Test complete"
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ControlPanel;