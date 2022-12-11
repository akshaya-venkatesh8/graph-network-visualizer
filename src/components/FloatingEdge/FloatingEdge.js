import { useCallback } from 'react';
import { useStore, getStraightPath, getBezierPath } from 'reactflow';

import { getEdgeParams } from '../../services/utils';

function FloatingEdge({ id, source, target, markerEnd, style }) {
  const sourceNode = useStore(useCallback((store) => store.nodeInternals.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeInternals.get(target), [target]));
  if (!sourceNode || !targetNode) {
    return null;
  }
  const getCircularPath = (tx, ty) => {
    return `M ${tx}, ${ty} m -75, -50 a 25,25 0 1,0 60,0 a 25,25 0 1,0 -60,0`
}
  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

 
  const curvePath = getCircularPath(tx, ty);
  return (
    <path
      id={id}
      className="react-flow__edge-path"
      d={source === target ? curvePath : edgePath}
      markerEnd={markerEnd}
      style={style}
    />
  );
}

export default FloatingEdge;