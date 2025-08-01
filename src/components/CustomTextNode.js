import { Handle, Position } from 'reactflow';

function CustomTextNode({ data, isConnectable }) {
  return (
    <div className="text-node">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div className="node-header">Send Message</div>
      <div className="node-body">{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomTextNode;