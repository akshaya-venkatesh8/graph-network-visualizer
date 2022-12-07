import React from 'react';
import { getStraightPath } from 'reactflow';

function CustomConnectionLine(props) {
  const [edgePath] = getStraightPath({
    sourceX: props.fromX,
    sourceY: props.fromY,
    targetX: props.toX,
    targetY: props.toY,
  });
  // console.log(props);
  return (
    <g>
      <path style={props.onnectionLineStyle} fill="none" d={edgePath} />
      <circle cx={props.toX} cy={props.toY} fill="black" r={3} stroke="black" strokeWidth={1.5} />
    </g>
  );
}

export default CustomConnectionLine;
