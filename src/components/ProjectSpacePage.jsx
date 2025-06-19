import {
    LayoutDashboard, FileText, StickyNote, GitBranch, Settings, GripVertical, Plus, ChevronLeft,
    Upload, Download, Edit, Trash2, Search, File as FileIcon, FileUp, Image as ImageIcon
} from 'lucide-react';
import {useState} from "react";

const ProjectSpacePage = ({ project, onExit }) => {
    // 使用 state 来控制当前激活的工具
    // 内部状态，用于管理表单输入等
    const [activeTool, setActiveTool] = useState('board');
    const [searchQuery, setSearchQuery] = useState(''); // 新增：搜索框状态
    const [projectName, setProjectName] = useState(project.title);
    const [projectDescription, setProjectDescription] = useState(project.description);

    // 模拟的看板数据
    const [board, setBoard] = useState({
        todo: [{ id: 1, title: '文献综述' }, { id: 2, title: '数据预处理' }],
        inProgress: [{ id: 3, title: '模型训练与调试' }],
        done: [{ id: 4, title: '完成项目开题报告' }],
    });

    // 模拟的文档数据
    const [documents, setDocuments] = useState([
        { id: 'doc1', title: '论文初稿', content: '第一章：引言...\n\n城市热岛效应是...' },
        { id: 'doc2', title: '会议纪要', content: '2025-06-15 会议参与人：张教授、李博士...' },
    ]);
    const [activeDoc, setActiveDoc] = useState(documents[0]);

    // 模拟的Git数据
    const [gitData, setGitData] = useState({
        repoUrl: 'https://github.com/gis-team/urban-heat-analysis',
        commits: [
            { id: 'c1', msg: 'feat: 添加数据可视化模块', author: '李博士', time: '2小时前' },
            { id: 'c2', msg: 'fix: 修复坐标转换bug', author: '张博士', time: '5小时前' },
        ]
    });

    const ToolButton = ({ toolId, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTool(toolId)}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTool === toolId
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );

    // 新增：根据文件类型返回对应图标的辅助函数
    const getFileIcon = (fileType) => {
        switch (fileType.toLowerCase()) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'csv':
            case 'xlsx': return <FileUp className="text-green-500" />;
            case 'png':
            case 'jpg':
            case 'jpeg': return <ImageIcon className="text-blue-500" />;
            default: return <FileIcon className="text-gray-500" />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. 左侧工具导航栏 */}
            <aside className="w-64 bg-white border-r flex flex-col p-4">
                <div className="flex-shrink-0 mb-6">
                    <button onClick={onExit} className="mb-4 flex items-center text-sm text-blue-600 hover:underline">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        返回个人主页
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">{project.title}</h1>
                    <p className="text-xs text-gray-500">{project.description}</p>
                </div>
                <nav className="flex-grow space-y-2">
                    <ToolButton toolId="board" icon={LayoutDashboard} label="项目看板" />
                    <ToolButton toolId="documents" icon={FileText} label="协同文档" />
                    <ToolButton toolId="whiteboard" icon={StickyNote} label="虚拟白板" />
                    <ToolButton toolId="git" icon={GitBranch} label="代码版本" />
                    <ToolButton toolId="files" icon={FileIcon} label="文件" />
                    <ToolButton toolId="settings" icon={Settings} label="项目设置" />
                </nav>
                {/*<div className="flex-shrink-0">*/}
                {/*    <ToolButton toolId="settings" icon={Settings} label="项目设置" />*/}
                {/*</div>*/}
            </aside>

            {/* 2. 主内容区 */}
            <main className="flex-1 flex flex-col">
                {/* === 新增：项目空间头部 === */}
                <header className="flex-shrink-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold capitalize">{activeTool}</h2>
                    <div>
                        {/* === 新增：项目内全局搜索框 === */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="搜索任务、文档、文件..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center -space-x-2">
                            {(project.members || []).map(member => (
                                <div key={member.id} title={`${member.name} (${member.role})`}
                                     className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white ring-1 ring-gray-300">
                                    {member.avatar}
                                </div>
                            ))}
                        </div>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
                            <Plus className="w-4 h-4 mr-2"/> 邀请成员
                        </button>
                    </div>
                </header>
                {/* 根据 activeTool 渲染不同的工具界面 */}
                <div className="flex-1 p-8 overflow-y-auto">

                    {activeTool === 'board' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">项目看板</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* 看板列 */}
                                {Object.entries({
                                    todo: '待办事项',
                                    inProgress: '进行中',
                                    done: '已完成'
                                }).map(([key, title]) => (
                                    <div key={key} className="bg-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold mb-4">{title} <span
                                            className="text-sm text-gray-500">{board[key].length}</span></h3>
                                        <div className="space-y-3">
                                            {board[key].map(task => (
                                                <div key={task.id}
                                                     className="bg-white p-3 rounded-md shadow hover:shadow-lg cursor-grab">
                                                    {task.title}
                                                </div>
                                            ))}
                                            <button
                                                className="w-full text-left text-sm text-gray-500 hover:bg-gray-300 p-2 rounded-md">+
                                                添加卡片
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTool === 'documents' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">协同文档</h2>
                            <div className="flex space-x-6">
                                <div className="w-1/4">
                                    <h3 className="font-semibold mb-4">文档列表</h3>
                                    {documents.map(doc => (
                                        <button key={doc.id} onClick={() => setActiveDoc(doc)}
                                                className={`w-full text-left p-2 rounded-md ${activeDoc.id === doc.id ? 'bg-blue-100' : ''}`}>
                                            {doc.title}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-3/4 bg-white rounded-lg shadow p-6 border">
                                    <h3 className="text-xl font-bold mb-4">{activeDoc.title}</h3>
                                    <textarea className="w-full h-96 p-2 border rounded-md font-mono text-sm"
                                              defaultValue={activeDoc.content}></textarea>
                                    <p className="text-xs text-gray-400 mt-2">这是一个模拟的实时编辑器。</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTool === 'whiteboard' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">虚拟白板</h2>
                            <div className="w-full h-[600px] bg-white rounded-lg shadow border p-4 relative bg-dots">
                                <div className="absolute top-10 left-10 bg-yellow-200 p-4 rounded-md shadow-lg w-48">
                                    <p className="font-medium">核心思路</p>
                                    <p className="text-sm">1. 数据源</p>
                                    <p className="text-sm">2. 模型结构</p>
                                </div>
                                <div
                                    className="absolute top-40 left-60 bg-blue-200 p-4 rounded-md shadow-lg w-48 -rotate-3">
                                    <p className="font-medium">待解决问题？</p>
                                    <p className="text-sm">如何处理缺失数据</p>
                                </div>
                                <p className="absolute bottom-4 right-4 text-xs text-gray-400">这是一个模拟的虚拟白板。</p>
                            </div>
                        </div>
                    )}

                    {activeTool === 'git' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">代码版本</h2>
                            <div className="bg-white p-6 rounded-lg shadow border">
                                <p className="text-sm mb-4">Git仓库: <a href={gitData.repoUrl} target="_blank"
                                                                        className="text-blue-600 hover:underline">{gitData.repoUrl}</a>
                                </p>
                                <h3 className="font-semibold mb-2">最近提交</h3>
                                <div className="font-mono text-sm space-y-2">
                                    {gitData.commits.map(c => (
                                        <div key={c.id} className="border-b pb-2">
                                            <p className="font-medium">{c.msg}</p>
                                            <p className="text-gray-500">{c.author} 提交于 {c.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === “文件”页面的UI实现 === */}
                    {activeTool === 'files' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">文件管理</h2>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg flex items-center space-x-2">
                                    <Upload className="w-4 h-4"/>
                                    <span>上传文件</span>
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow border">
                                <table className="w-full text-left">
                                    <thead className="border-b">
                                    <tr>
                                        <th className="p-3">名称</th>
                                        <th className="p-3">大小</th>
                                        <th className="p-3">上传者</th>
                                        <th className="p-3">上传日期</th>
                                        <th className="p-3">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(project.files || []).map(file => (
                                        <tr key={file.id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-medium flex items-center space-x-3">
                                                {getFileIcon(file.type)}
                                                <span>{file.name}</span>
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">{file.size}</td>
                                            <td className="p-3 text-sm text-gray-600">{file.uploadedBy}</td>
                                            <td className="p-3 text-sm text-gray-600">{file.uploadedAt}</td>
                                            <td className="p-3">
                                                <div className="flex space-x-4 text-gray-500">
                                                    <button className="hover:text-blue-600"><Download className="w-4 h-4"/></button>
                                                    <button className="hover:text-green-600"><Edit className="w-4 h-4"/></button>
                                                    <button className="hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {/* === “设置”页面的UI实现 === */}
                    {activeTool === 'settings' && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold mb-8">项目设置</h2>

                            {/* 成员管理模块 */}
                            <div className="bg-white p-6 rounded-lg shadow border mb-8">
                                <h3 className="text-lg font-semibold mb-4">成员管理 ({project.members.length})</h3>
                                <div className="space-y-4">
                                    {(project.members || []).map(member => (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">{member.avatar}</div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{member.name}</p>
                                                    <p className="text-sm text-gray-500">{member.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <select defaultValue={member.role} className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500">
                                                    <option>Owner</option>
                                                    <option>Editor</option>
                                                    <option>Viewer</option>
                                                </select>
                                                <button className="text-gray-400 hover:text-red-500">
                                                    <Trash2 className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t">
                                    <h4 className="font-semibold mb-2">邀请新成员</h4>
                                    <div className="flex space-x-2">
                                        <input type="email" placeholder="输入成员邮箱地址..." className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm"/>
                                        <button className="bg-gray-800 text-white font-medium py-2 px-4 rounded-lg text-sm">发送邀请</button>
                                    </div>
                                </div>
                            </div>

                            {/* 项目信息模块 */}
                            <div className="bg-white p-6 rounded-lg shadow border mb-8">
                                <h3 className="text-lg font-semibold mb-4">项目信息</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">项目名称</label>
                                        <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"/>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">项目描述</label>
                                        <textarea rows="3" value={projectDescription} onChange={e => setProjectDescription(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
                                    </div>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg">保存更改</button>
                                </div>
                            </div>

                            {/* 危险区域模块 */}
                            <div className="bg-white p-6 rounded-lg shadow border border-red-300">
                                <h3 className="text-lg font-semibold text-red-700">危险区域</h3>
                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">删除此项目</p>
                                        <p className="text-sm text-gray-600">一旦删除，所有相关数据将永久消失，此操作不可撤销。</p>
                                    </div>
                                    <button onClick={() => window.confirm('您确定要永久删除这个项目吗？')} className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-5 rounded-lg">删除项目</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProjectSpacePage