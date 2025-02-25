
import { useEffect, useRef } from 'react';

const useRDSRenderer = (canvasRef, currentDisparity, dotSize, dotDensity, screenWidthCm, viewingDistanceCm) => {
    const dots = useRef([]);

    const generateDots = (canvasWidth, canvasHeight) => {
        const numDots = Math.floor(canvasWidth * canvasHeight * dotDensity / (dotSize ** 2));
        dots.current = Array.from({ length: numDots }, () => ({
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight
        }));
    };

    const drawStereogram = (ctx) => {
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
    };

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;

        generateDots(canvasWidth, canvasHeight);
        drawStereogram(ctx);
    }, [canvasRef, currentDisparity, dotSize, dotDensity, screenWidthCm, viewingDistanceCm]);

    return { drawStereogram };
};

export default useRDSRenderer;