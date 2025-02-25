
import React from 'react';
import Input from '../ui/Input';

const TestParameters = ({ parameters, setParameters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col space-y-4">
            <Input
                label="Viewing Distance (cm)"
                name="viewingDistance"
                type="number"
                value={parameters.viewingDistance}
                onChange={handleChange}
            />
            <Input
                label="Screen Width (cm)"
                name="screenWidth"
                type="number"
                value={parameters.screenWidth}
                onChange={handleChange}
            />
            <Input
                label="Dot Size (pixels)"
                name="dotSize"
                type="number"
                value={parameters.dotSize}
                onChange={handleChange}
            />
            <Input
                label="Dot Density (0-1)"
                name="dotDensity"
                type="number"
                step="0.01"
                value={parameters.dotDensity}
                onChange={handleChange}
            />
            <Input
                label="Disparity Increase Rate (arc seconds)"
                name="increaseRate"
                type="number"
                value={parameters.increaseRate}
                onChange={handleChange}
            />
        </div>
    );
};

export default TestParameters;