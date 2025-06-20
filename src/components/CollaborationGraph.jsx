// src/components/CollaborationGraph.jsx

import React from 'react';
// 1. 从新的包 '@reactflow' 导入
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
// 2. 导入新包的 CSS 文件
import '@reactflow/core/dist/style.css';

// 自定义节点组件 (这部分代码完全不用变)
const CollaboratorNode = ({ data }) => {
    return (
        <div className="flex flex-col items-center bg-white border-2 border-gray-400 rounded-full shadow-lg p-1 text-center w-24 h-24 justify-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl mb-1">
                {data.avatar}
            </div>
            <p className="text-xs font-semibold text-gray-800 truncate w-full">{data.label}</p>
        </div>
    );
};

// 映射自定义节点类型 (这部分代码也完全不用变)
const nodeTypes = {
    collaboratorNode: CollaboratorNode,
};

// 主图表组件 (这部分代码也完全不用变)
const CollaborationGraph = ({ nodes, edges }) => {
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
        >
            <Background />
            <Controls />
            <MiniMap
                nodeColor={n => {
                    if (n.id === 'center') return '#3b82f6';
                    return '#a1a1aa';
                }}
            />
        </ReactFlow>
    );
};

export default CollaborationGraph;