// 在您的主文件顶部，确保这些图标已导入
import {
    ChevronLeft, Mail, Rss, UserPlus, Linkedin, Twitter,
    FileText, Briefcase } from 'lucide-react';
import {useState} from "react";

const AcademicProfilePage = ({ profileData, onBack, onEnterProject }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // 一个简单的SVG占位符，用于模拟复杂的图表
    const MockGraph = ({ title }) => (
        <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50">
            <p className="text-gray-500 font-medium">{title}</p>
            <svg width="100%" height="150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
                    </marker>
                </defs>
                <circle cx="20%" cy="50%" r="15" fill="#3b82f6" />
                <circle cx="50%" cy="30%" r="20" fill="#8b5cf6" />
                <circle cx="55%" cy="75%" r="12" fill="#10b981" />
                <circle cx="80%" cy="40%" r="18" fill="#f97316" />
                <line x1="22%" y1="50%" x2="47%" y2="33%" stroke="#a1a1aa" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="53%" y1="35%" x2="77%" y2="42%" stroke="#a1a1aa" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="58%" y1="70%" x2="78%" y2="45%" stroke="#a1a1aa" strokeWidth="2" markerEnd="url(#arrow)" />
                <line x1="23%" y1="55%" x2="52%" y2="72%" stroke="#a1a1aa" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>
            <p className="text-xs text-gray-400 mt-2">(这是一个用于演示的静态图表)</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="mb-4 flex items-center text-sm text-blue-600 hover:underline">
                <ChevronLeft className="w-4 h-4 mr-1" />
                返回社区主页
            </button>

            {/* 1. 个人信息头 */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex-shrink-0 flex items-center justify-center text-5xl text-white">
                        {profileData.userInfo.avatar}
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl font-bold text-gray-900">{profileData.userInfo.name}</h1>
                        <p className="text-lg text-gray-600">{profileData.userInfo.title}</p>
                        <p className="text-gray-500 flex items-center mt-1">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {profileData.userInfo.affiliation}
                        </p>
                        <p className="mt-4 text-gray-700">{profileData.userInfo.bio}</p>
                        <div className="mt-4 flex space-x-3">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center"><UserPlus className="w-4 h-4 mr-2"/> 关注</button>
                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm flex items-center"><Mail className="w-4 h-4 mr-2"/> 发送消息</button>
                            <a href="#" className="p-2 text-gray-500 hover:text-blue-500"><Linkedin className="w-5 h-5"/></a>
                            <a href="#" className="p-2 text-gray-500 hover:text-blue-500"><Twitter className="w-5 h-5"/></a>
                            <a href="#" className="p-2 text-gray-500 hover:text-orange-500"><Rss className="w-5 h-5"/></a>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-full md:w-auto grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600">{profileData.metrics.publications}</div>
                            <div className="text-sm text-gray-500">论文数</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600">{profileData.metrics.citations}</div>
                            <div className="text-sm text-gray-500">总引用</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600">{profileData.metrics.hIndex}</div>
                            <div className="text-sm text-gray-500">H指数</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. 标签页导航 */}
            <div className="bg-white rounded-t-lg shadow-sm border-b">
                <div className="flex space-x-8 px-6">
                    <button onClick={() => setActiveTab('overview')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>总览</button>
                    <button onClick={() => setActiveTab('publications')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'publications' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>研究成果 ({profileData.publications.length})</button>
                    {/* === 1. 新增的“科研项目”标签页 === */}
                    <button onClick={() => setActiveTab('projects')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'projects' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                        科研项目 ({profileData.projects.length})
                    </button>
                    <button onClick={() => setActiveTab('timeline')} className={`py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'timeline' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>学术时间线</button>
                </div>
            </div>

            {/* 3. 标签页内容 */}
            <div className="bg-white rounded-b-lg shadow-sm border border-t-0 p-6">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">研究方向</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profileData.userInfo.researchInterests.map(interest => (
                                        <span key={interest} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{interest}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">影响力分析</h3>
                                <MockGraph title="论文引用网络" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">合作网络</h3>
                            <div className="space-y-3">
                                {profileData.collaborationNetwork.map(co => (
                                    <div key={co.name} className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">{co.avatar}</div>
                                        <div>
                                            <p className="font-medium text-gray-900">{co.name}</p>
                                            <p className="text-sm text-gray-500">{co.affiliation}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'publications' && (
                    <div className="space-y-4">
                        {profileData.publications.map(pub => (
                            <div key={pub.id} className="p-4 border rounded-lg hover:bg-gray-50">
                                <h4 className="font-semibold text-blue-700 hover:underline cursor-pointer">{pub.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{pub.authors.join(', ')}</p>
                                <div className="flex justify-between items-center mt-2 text-xs">
                                    <p className="text-gray-500">{pub.journal}, {pub.year}</p>
                                    <p className="font-medium text-gray-700">被引: {pub.citations}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'timeline' && (
                    <div>
                        {profileData.timelineEvents.map((event, index) => (
                            <div key={index} className="flex items-start space-x-4 mb-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    {index < profileData.timelineEvents.length - 1 && <div className="w-0.5 h-16 bg-gray-300"></div>}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{event.title}</p>
                                    <p className="text-sm text-gray-600">{event.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* === 2. “科研项目”标签页的UI实现 === */}
                {activeTab === 'projects' && (
                    <div className="space-y-6">
                        {profileData.projects.map(project => (
                            <div key={project.id} className="p-5 border rounded-lg flex flex-col md:flex-row md:items-center md:justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex-grow mb-4 md:mb-0">
                                    <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                                    <div className="flex items-center space-x-4 my-2 text-sm">
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            project.status === '进行中' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                        }`}>{project.status}</span>
                                        <span className="text-gray-600">我的角色: <span className="font-medium">{project.role}</span></span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <button
                                        onClick={() => onEnterProject(project)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg flex items-center space-x-2 transition-colors"
                                    >
                                        <Briefcase className="w-4 h-4"/>
                                        <span>进入项目空间</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default AcademicProfilePage