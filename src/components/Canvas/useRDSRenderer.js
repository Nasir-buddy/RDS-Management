import { useCallback, useEffect, useRef } from 'react';

const useRDSRenderer = (canvasRef, currentDisparity, dotSize, dotDensity, screenWidthCm, viewingDistanceCm) => {
    const dots = useRef([]);

    const generateDots = useCallback((canvasWidth, canvasHeight) => {
        const numDots = Math.floor(canvasWidth * canvasHeight * dotDensity / (dotSize ** 2));
        dots.current = Array.from({ length: numDots }, () => ({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight
        }));
    }, [dotDensity, dotSize]);

    const drawStereogram = useCallback((ctx) => {
        if (!ctx || !dots.current.length) return;
        
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.globalCompositeOperation = 'screen';

        // Draw red dots (left eye)
        dots.current.forEach(dot => {
            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.arc(dot.x - currentDisparity / 2, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw blue dots (right eye)
        dots.current.forEach(dot => {
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.arc(dot.x + currentDisparity / 2, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalCompositeOperation = 'source-over';
        
        // Draw fixation cross in the center
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        const crossSize = 10;
        
        ctx.beginPath();
        ctx.moveTo(centerX - crossSize, centerY);
        ctx.lineTo(centerX + crossSize, centerY);
        ctx.moveTo(centerX, centerY - crossSize);
        ctx.lineTo(centerX, centerY + crossSize);
        ctx.stroke();
        
    }, [currentDisparity, dotSize]);

    useEffect(() => {
        if (!canvasRef.current) return;
        
        const ctx = canvasRef.current.getContext('2d');
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        generateDots(canvasWidth, canvasHeight);
        drawStereogram(ctx);
    }, [canvasRef, dotSize, dotDensity, generateDots, drawStereogram]);

    return { drawStereogram };
};

export default useRDSRenderer;
