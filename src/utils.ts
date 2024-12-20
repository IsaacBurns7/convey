export function rotate(points: number[][], radians: number) : number[][]{
    let newPoints: number[][] = [];
    const cosTheta = Math.cos(radians);
    const sinTheta = Math.sin(radians);
    points.forEach((point) => {
        const xNew = point[0] * cosTheta - point[1] * sinTheta;
        const yNew = point[0] * sinTheta + point[1] * cosTheta;
        newPoints.push([xNew, yNew]);
    });
    return newPoints;
}