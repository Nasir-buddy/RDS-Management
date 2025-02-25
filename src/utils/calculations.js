export const pixelsToArcSeconds = (pixels, viewingDistanceCm, screenWidthCm) => {
    const pixelsPerCm = window.innerWidth / screenWidthCm;
    const cmDisparity = pixels / pixelsPerCm;
    const radians = Math.atan(cmDisparity / viewingDistanceCm);
    return (radians * 180 / Math.PI) * 3600;
};

export const arcSecondsToPixels = (arcSeconds, viewingDistanceCm, screenWidthCm) => {
    const cmPerDegree = 2 * Math.PI * viewingDistanceCm / 360;
    const cmPerArcSec = cmPerDegree / 3600;
    return arcSeconds * cmPerArcSec * (window.innerWidth / screenWidthCm);
};