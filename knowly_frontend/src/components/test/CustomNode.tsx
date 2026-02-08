import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

const DEFAULT_HANDLE_STYLE = {
  width: 10,
  height: 10,
  bottom: -5,
};

const CustomNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div style={{ padding: 25 }}>
      <div>Node</div>

      <Handle
        type="source"
        id="red"
        position={Position.Bottom}
        style={{ ...DEFAULT_HANDLE_STYLE, left: '15%', background: 'red' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        id="blue"
        position={Position.Bottom}
        style={{ ...DEFAULT_HANDLE_STYLE, left: '50%', background: 'blue' }}
        isConnectable={isConnectable}
      />

      <Handle
        type="source"
        id="orange"
        position={Position.Bottom}
        style={{ ...DEFAULT_HANDLE_STYLE, left: '85%', background: 'orange' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(CustomNode);
