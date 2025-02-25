import React from 'react';
import { TEST_TYPES } from '../../utils/constants';

const TestParameters = ({ parameters, setParameters }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setParameters((prev) => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Test Direction</label>
                <select
                    name="testDirection"
                    value={parameters.testDirection}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    {TEST_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Viewing Distance (cm)</label>
                <input
                    type="number"
                    name="viewingDistance"
                    value={parameters.viewingDistance}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Screen Width (cm)</label>
                <input
                    type="number"
                    name="screenWidth"
                    value={parameters.screenWidth}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Dot Size (pixels)</label>
                <input
                    type="number"
                    name="dotSize"
                    value={parameters.dotSize}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Dot Density (0-1)</label>
                <input
                    type="number"
                    name="dotDensity"
                    step="0.01"
                    min="0.01"
                    max="1"
                    value={parameters.dotDensity}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-white">Disparity Increase Rate (pixels per step)</label>
                <input
                    type="number"
                    name="increaseRate"
                    min="1"
                    value={parameters.increaseRate}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

export default TestParameters;