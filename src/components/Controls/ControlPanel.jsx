import React, { useState } from 'react';
import TestParameters from './TestParameters';
import { 
  DEFAULT_VIEWING_DISTANCE_CM, 
  DEFAULT_SCREEN_WIDTH_CM, 
  DEFAULT_DOT_SIZE, 
  DEFAULT_DOT_DENSITY 
} from '../../utils/constants';

const ControlPanel = ({ onTestStart }) => {
    const [parameters, setParameters] = useState({
        viewingDistance: DEFAULT_VIEWING_DISTANCE_CM,
        screenWidth: DEFAULT_SCREEN_WIDTH_CM,
        dotSize: DEFAULT_DOT_SIZE,
        dotDensity: DEFAULT_DOT_DENSITY
    });

    const handleStartClick = () => {
        onTestStart(parameters);
    };

    return (
        <div className="control-panel p-4 bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Control Panel</h2>
            <TestParameters parameters={parameters} setParameters={setParameters} />
            <div className="flex flex-col space-y-4 mt-4">
                <button 
                    onClick={handleStartClick} 
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default ControlPanel;