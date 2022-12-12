import { useTheme } from '@emotion/react';
import { useCallback } from 'react';
import { useStore, getStraightPath } from 'reactflow';

import { getEdgeParams } from '../../services/utils';

function FloatingEdge({ id, source, target, markerEnd, style, data }) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
  const theme = useTheme();
  if (!sourceNode || !targetNode) {
    return null;
  }
  const getCircularPath = (tx, ty) => {
    return `M ${tx}, ${ty} m -75, -50 a 25,25 0 1,0 60,0 a 25,25 0 1,0 -60,0`
}
  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  const [edgePath] = getStraightPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });
  const pathStyle = {
    strokeWidth: 3,
    stroke: data ? data : theme.palette.background.dots
  }
  const curvePath = getCircularPath(tx, ty);
  return (
    <path
      id={id}
      className={`react-flow__edge-path ${data ? 'cursor-dropper' : ''}`}
      d={source === target ? curvePath : edgePath}
      markerEnd={markerEnd}
      style={pathStyle}
    />
  );
}

export default FloatingEdge;