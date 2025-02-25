import React, { useRef, useEffect, useState } from 'react';
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
    const containerRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

    const { drawStereogram } = useRDSRenderer(
        canvasRef, 
        currentDisparity, 
        dotSize, 
        dotDensity, 
        screenWidth, 
        viewingDistance
    );

    // Handle canvas resizing
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                const containerWidth = container.clientWidth;
                const aspectRatio = 3/4; // 4:3 aspect ratio
                
                setCanvasSize({
                    width: containerWidth,
                    height: containerWidth * aspectRatio
                });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Draw stereogram when needed
    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            drawStereogram(ctx);
        }
    }, [drawStereogram, testState, canvasSize]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full bg-gray-900 rounded-xl shadow-inner overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
            
            {testState === 'Setup' && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm">
                    <p className="text-xl text-gray-300 font-medium">
                        Set parameters and start test to view stereogram
                    </p>
                </div>
            )}
            
            <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="w-full h-full object-contain rounded-lg border border-gray-700/50"
                style={{
                    imageRendering: 'pixelated',
                    backgroundColor: '#111827', // bg-gray-900
                }}
            />
            
            {testState === 'Testing' && (
                <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                        <p className="text-sm text-gray-300">
                            Focus on the center of the image
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RDSCanvas;