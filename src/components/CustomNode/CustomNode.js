import { useTheme } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Handle, Position, useStore } from 'reactflow';
import useModeStore from '../../services/store';

const connectionNodeIdSelector = (state) => state.connectionNodeId;
export default function CustomNode({ id, data }) {
  const theme = useTheme();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const deleteMode = useModeStore((state) => state.deleteMode);
  const colorMode = useModeStore((state) => state.colorMode);
  const isTarget = !colorMode && connectionNodeId ? true : false;
  const targetHandleStyle = { zIndex: true ? 3 : 1 };
  const label = id;
  return (
    <div style={{'borderColor': theme.palette.background.dots}} className={`customNode ${deleteMode ? 'x' :''}`}>
      <div
        className="customNodeBody"
        style={{
          borderStyle: isTarget ? 'dashed' : 'solid',
          background: data ? data.color : theme.palette.background.default,
          borderColor: theme.palette.background.dots
        }}
      >
        <Handle
          className={`source-handle ${!colorMode ? 'source-active': ''}`}
          style={{ zIndex: 2 }}
          position={Position.Top}
          type="source"
        />
        <Handle
          className={`target-handle ${isTarget ? 'target-active ' : ''}`}
          style={targetHandleStyle}
          position={Position.Top}
          type="target"
        />
        {label}
      </div>
      {/* <div className='delete'>x</div> */}
    </div>
  );
}
