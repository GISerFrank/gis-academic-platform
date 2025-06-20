// src/components/ProjectDashboardPage.jsx

import React from 'react';
import { Plus, Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

const ProjectDashboardPage = ({ projects, onEnterProject, onBack }) => {
    return (
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {/* 1. 页面头部 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">项目仪表盘</h1>
                <div className="flex items-center space-x-4">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                        <option>按最近活动排序</option>
                        <option>按名称排序</option>
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg flex items-center space-x-2">
                        <Plus className="w-5 h-5"/>
                        <span>创建新项目</span>
                    </button>
                </div>
            </div>

            {/* 2. 项目卡片网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(projects || []).map(project => (
                    <div key={project.id} className="bg-white rounded-lg shadow border flex flex-col hover:shadow-xl transition-shadow">
                        <div className="p-6 flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <Briefcase className="w-8 h-8 text-blue-500 bg-blue-100 p-1.5 rounded-lg"/>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    project.status === '进行中' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mt-4">{project.title}</h3>
                            <p className="text-sm text-gray-600 mt-2 h-10 overflow-hidden">{project.description}</p>
                        </div>
                        <div className="px-6 py-4 border-t bg-gray-50">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">我的角色</p>
                                    <p className="text-sm font-medium text-gray-800">{project.role}</p>
                                </div>
                                {/* 成员头像堆叠，这里我们用一个简单示例 */}
                                <div className="flex items-center -space-x-2">
                                    <span className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">🏆</span>
                                    <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">🎯</span>
                                    <span className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold border-2 border-white">+2</span>
                                </div>
                            </div>
                            <button
                                onClick={() => onEnterProject(project)}
                                className="w-full bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                进入项目
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProjectDashboardPage;