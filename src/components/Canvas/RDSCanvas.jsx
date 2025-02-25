import React, { useRef, useEffect } from 'react';
import useRDSRenderer from './useRDSRenderer';

const RDSCanvas = ({ 
    currentDisparity, 
    dotSize, 
    dotDensity, 
    screenWidth,
    viewingDistance,
    testState 
}) => {
    const canvasRef = useRef(null);
    const { drawStereogram } = useRDSRenderer(
        canvasRef, 
        currentDisparity, 
        dotSize, 
        dotDensity, 
        screenWidth, 
        viewingDistance
    );

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            drawStereogram(ctx);
        }
    }, [drawStereogram, testState]);

    return (
        <canvas
            ref={canvasRef}
            className="border-2 border-gray-700 rounded-lg"
            width={800}
            height={600}
        />
    );
};

export default RDSCanvas;