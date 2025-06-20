import React, { useState } from 'react';
import {
    Search, MessageCircle, Users, BookOpen, Award, Bell, Plus, Heart,
    Share2, Eye, Download, Upload, Calendar, MapPin, Globe, TrendingUp,
    Star, Filter, UserPlus, MessageSquare, Database, // <-- Added missing Database icon
    BrainCircuit, Lightbulb, GitBranchPlus, Briefcase // <-- 1. 添加新图标
} from 'lucide-react';
import AcademicProfilePage from "./AcademicProfilePage";
import ProjectSpacePage from "./ProjectSpacePage";
import ProjectDashboardPage from "./ProjectDashboardPage";

// --- Sub-components are now defined outside the main component for performance ---

const FeedComponent = ({ posts, selectedFilter, setSelectedFilter, toggleLike }) => (
    <div className="space-y-6">
        {/* Create Post */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                    👤
                </div>
                <div className="flex-1">
                    <textarea
                        placeholder="分享你的研究发现、提出学术问题或寻找合作伙伴..."
                        className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Upload className="w-4 h-4" />
                        <span className="text-sm">上传数据</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm">论文</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">合作</span>
                    </button>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
                    发布
                </button>
            </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">筛选:</span>
                    {['all', 'research', 'collaboration', 'tool', 'question'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${
  selectedFilter === filter
      ? 'bg-blue-500 text-white'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
}`}
                        >
                            {filter === 'all' ? '全部' :
                                filter === 'research' ? '研究成果' :
                                    filter === 'collaboration' ? '合作邀请' :
                                        filter === 'tool' ? '工具分享' : '学术问答'}
                        </button>
                    ))}
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                    <Filter className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
            {posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                                    {post.author.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {post.author.level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{post.author.affiliation}</p>
                                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {post.hasCode && (
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">代码</span>
                                )}
                                {post.hasData && (
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">数据</span>
                                )}
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-700 mb-4">{post.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Post Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => toggleLike(post.id)}
                                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                            >
                                <Heart className="w-4 h-4" />
                                <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm">{post.shares}</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ExpertsComponent = ({ experts }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">GIS领域专家</h2>
            <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                    <option>按影响力排序</option>
                    <option>按论文数量</option>
                    <option>按关注数</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experts.map(expert => (
                <div key={expert.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl">
                                {expert.avatar}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                                <p className="text-gray-600">{expert.affiliation}</p>
                                <p className="text-sm text-gray-500">{expert.specialization}</p>
                            </div>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                            <UserPlus className="w-4 h-4" />
                            <span>关注</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{expert.papers}</div>
                            <div className="text-sm text-gray-500">论文数</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{expert.hIndex}</div>
                            <div className="text-sm text-gray-500">H指数</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{expert.followers}</div>
                            <div className="text-sm text-gray-500">关注者</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ConferencesComponent = ({ conferences }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">学术会议</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                提交会议信息
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {conferences.map(conference => (
                <div key={conference.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{conference.name}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{conference.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{conference.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4" />
                                    <span>{conference.attendees} 预计参会</span>
                                </div>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                            {conference.type}
                        </span>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800">
                            <strong>投稿截止:</strong> {conference.deadline}
                        </p>
                    </div>

                    <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
                            查看详情
                        </button>
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors">
                            添加到日历
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const DatasetsComponent = ({ datasets }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">开源数据库</h2>
            <div className="flex items-center space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>贡献数据</span>
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    申请数据集
                </button>
            </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="搜索数据集、标签、作者..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                        <option>全部类型</option>
                        <option>矢量数据</option>
                        <option>栅格数据</option>
                        <option>工具代码</option>
                        <option>模型数据</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500">
                        <option>按下载量</option>
                        <option>按更新时间</option>
                        <option>按评分</option>
                        <option>按大小</option>
                    </select>
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
                {['遥感影像', '矢量数据', '统计数据', '气象数据', '人口数据', '交通数据', '环境数据', '工具代码'].map(category => (
                    <button
                        key={category}
                        className="px-3 py-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-700 rounded-full text-sm transition-colors"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>

        {/* Featured Datasets */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                精选数据集
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {datasets.slice(0, 3).map(dataset => (
                    <div key={dataset.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">{dataset.title}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{dataset.downloads} 下载</span>
                            <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                <span>{dataset.quality}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Datasets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {datasets.map(dataset => (
                <div key={dataset.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">{dataset.title}</h3>
                                    {dataset.documentation && (
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                            有文档
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>

                                {/* Author and Date */}
                                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <span>贡献者: {dataset.author}</span>
                                    <span>更新: {dataset.lastUpdated}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                                <div className="text-right">
                                    <div className="flex items-center space-x-1 text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-sm font-medium">{dataset.quality}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">{dataset.downloads} 下载</div>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {dataset.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Technical Details */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <span className="text-gray-600">大小:</span>
                                    <span className="ml-2 font-medium">{dataset.size}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">许可:</span>
                                    <span className="ml-2 font-medium">{dataset.license}</span>
                                </div>
                            </div>

                            <div className="mt-2">
                                <span className="text-gray-600 text-sm">格式:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {dataset.format.map((fmt, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                            {fmt}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3">
                            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>下载</span>
                            </button>
                            <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors">
                                预览
                            </button>
                            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                                <Heart className="w-4 h-4" />
                            </button>
                            <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Download Stats */}
                    <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-600">
                        <div className="flex justify-between items-center">
                            <span>本月下载 {Math.floor(dataset.downloads * 0.3)} 次</span>
                            <div className="flex items-center space-x-4">
                                <span>{dataset.likes} 点赞</span>
                                <span>5 评论</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Load More */}
        <div className="text-center">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors">
                加载更多数据集
            </button>
        </div>
    </div>
);

// This component was previously causing a syntax error.
const DiscussionsComponent = ({ discussions }) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">学术讨论</h2>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>发起讨论</span>
            </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
                <div className="flex items-center space-x-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">热门</button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">最新</button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">未解决</button>
                </div>
            </div>

            <div className="divide-y">
                {discussions.map(discussion => (
                    <div key={discussion.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                                    {discussion.title}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                    <span>by {discussion.author}</span>
                                    <span>{discussion.lastActivity}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {discussion.tags.map((tag, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-sm font-medium">{discussion.replies}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// +++ 2. 新增：智能推荐侧边栏组件 +++
const RecommendationSidebar = ({ recommendations, collaborators, knowledgeGraph }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <BrainCircuit className="w-5 h-5 mr-2 text-blue-600" />
            智能推荐
        </h3>
        <div className="space-y-5">
            {/* 个性化内容推荐 */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                    为你推荐
                </h4>
                <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <p className="font-medium text-gray-800 truncate">{recommendations.paper.title}</p>
                        <p className="text-xs text-gray-500">相关论文</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <p className="font-medium text-gray-800">{recommendations.expert.name} <span className="text-gray-500 font-normal">({recommendations.expert.affiliation})</span></p>
                        <p className="text-xs text-gray-500">相关学者</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                        <p className="font-medium text-gray-800 truncate">{recommendations.dataset.title}</p>
                        <p className="text-xs text-gray-500">相关数据集</p>
                    </div>
                </div>
            </div>

            {/* 相似研究者匹配 */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    潜在合作者
                </h4>
                <div className="space-y-2 text-sm">
                    {collaborators.map(user => (
                        <div key={user.id} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm">
                                {user.avatar}
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.specialization}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 智能文献关联 (知识图谱简化版) */}
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <GitBranchPlus className="w-4 h-4 mr-2 text-purple-600" />
                    研究脉络
                </h4>
                <div className="flex flex-wrap gap-2">
                    {knowledgeGraph.map(topic => (
                        <span key={topic} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full cursor-pointer hover:bg-purple-200">
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const GISAcademicPlatform = () => {
    // --- State declarations moved to the top ---
    const [activeTab, setActiveTab] = useState('feed');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    // 1. 新增state来控制页面切换
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [activeProject, setActiveProject] = useState(null); // 存储当前正在查看的项目


    // 2. 新增详尽的个人主页模拟数据
    const [mockProfileData, setMockProfileData] = useState({
        userInfo: { name: '陈院士', avatar: '🏆', title: '地理信息科学家，教授', affiliation: '中科院', bio: '致力于高光谱遥感与空间分析理论研究超过20年，专注于将深度学习应用于地理空间问题。', researchInterests: ['遥感', 'GIS', '空间分析', '深度学习', '城市计算'] },
        metrics: { publications: 156, citations: 8932, hIndex: 45 },
        publications: [
            { id: 1, title: '基于深度学习的遥感影像土地覆盖分类新方法', authors: ['陈院士', '张教授', '李博士'], journal: '遥感学报', year: 2023, citations: 120 },
            { id: 2, title: '城市热岛效应的多尺度时空演化分析', authors: ['陈院士', '刘教授'], journal: '地理研究', year: 2022, citations: 254 },
            { id: 3, title: '一种高效的时空数据索引结构', authors: ['陈院士', '王研究员'], journal: 'Journal of Geoinformatics', year: 2021, citations: 410 },
        ],
        timelineEvents: [
            { date: '2023-11-20', title: '发表论文', description: '在《遥感学报》发表关于深度学习土地覆盖分类的研究。' },
            { date: '2022-05-10', title: '获得国家科技进步奖', description: '因在城市气候研究中的突出贡献荣获二等奖。' },
            { date: '2020-09-01', title: '成立智慧城市实验室', description: '领导成立了专注于城市计算与GIS交叉学科的实验室。' },
        ],
// === 新增1：为可视化设计的图数据结构 ===
        collaborationGraph: {
            // "nodes" 代表图中的每个点 (学者)
            nodes: [
                { id: 'center', name: '陈院士', avatar: '🏆', isCenter: true, x: 250, y: 150 },
                { id: 'user2', name: '刘教授', avatar: '🎯', x: 100, y: 50 },
                { id: 'user3', name: '张教授', avatar: '👨‍🏫', x: 400, y: 50 },
                { id: 'user4', name: '李博士', avatar: '👩‍🔬', x: 80, y: 250 },
                { id: 'user5', name: '王研究生', avatar: '🎓', x: 420, y: 250 },
            ],
            // "links" 代表点与点之间的连线 (合作关系)
            links: [
                { source: 'center', target: 'user2', strength: 5 }, // strength 越大，线越粗
                { source: 'center', target: 'user3', strength: 4 },
                { source: 'center', target: 'user4', strength: 5 },
                { source: 'center', target: 'user5', strength: 2 },
                { source: 'user2', target: 'user4', strength: 3 }, // 学者之间也可能有合作
            ]
        },
        // === 3. 新增的项目数据 ===
        projects: [
            {
                id: 'proj-01',
                title: '城市热岛效应多尺度分析项目',
                status: '进行中', // '进行中' 或 '已完成'
                role: '负责人', // '负责人', '核心成员' 等
                description: '一个关于城市热岛效应的跨城市比较研究，旨在探索不同尺度下的影响因子。'
            },
            {
                id: 'proj-02',
                title: 'GeoAI开源工具包开发',
                status: '进行中',
                role: '核心成员',
                description: '与清华大学合作，共同开发一个面向GIS领域的Python自动化处理工具包。'
            },
            {
                id: 'proj-03',
                title: '2000-2020年中国土地覆盖变化研究',
                status: '已完成',
                role: '负责人',
                description: '基于长时间序列遥感影像，完成了对过去20年中国土地覆盖变化的制图与分析。'
            }
        ]
    });


    const [posts, setPosts] = useState([
        { id: 1, author: { name: '张教授', avatar: '👨‍🏫', affiliation: '北京大学地理系', level: '教授' }, title: '基于深度学习的遥感影像土地覆盖分类新方法', content: '我们团队最新开发了一种结合CNN和Transformer的混合架构，在Landsat-8数据上取得了95.2%的分类精度...', tags: ['遥感', '深度学习', '土地覆盖', 'CNN'], timestamp: '2小时前', likes: 24, comments: 8, shares: 5, views: 156, hasCode: true, hasData: true, type: 'research' },
        { id: 2, author: { name: '李博士', avatar: '👩‍🔬', affiliation: '中科院遥感所', level: '副研究员' }, title: '寻求合作：城市热岛效应多尺度分析项目', content: '正在筹备一个关于城市热岛效应的跨城市比较研究，希望找到有相关数据和经验的研究伙伴...', tags: ['城市气候', '热岛效应', '合作', '多尺度分析'], timestamp: '4小时前', likes: 18, comments: 12, shares: 3, views: 89, hasCode: false, hasData: false, type: 'collaboration' },
        { id: 3, author: { name: '王研究生', avatar: '🎓', affiliation: '清华大学', level: '博士生' }, title: '开源发布：QGIS自动化处理工具包', content: '经过半年开发，我们的QGIS自动化处理工具包终于开源了！包含20+常用空间分析算法的Python实现...', tags: ['QGIS', '开源', 'Python', '空间分析'], timestamp: '1天前', likes: 42, comments: 15, shares: 28, views: 234, hasCode: true, hasData: false, type: 'tool' }
    ]);

    const [conferences, setConferences] = useState([
        { id: 1, name: 'GeoSpatial 2025', date: '2025-09-15', location: '北京', type: '国际会议', deadline: '2025-07-01', attendees: 1200 },
        { id: 2, name: '中国GIS学术年会', date: '2025-11-20', location: '上海', type: '国内会议', deadline: '2025-08-15', attendees: 800 }
    ]);

    const [experts, setExperts] = useState([
        { id: 1, name: '陈院士', avatar: '🏆', affiliation: '中科院', specialization: '遥感与GIS', followers: 2341, papers: 156, hIndex: 45 },
        { id: 2, name: '刘教授', avatar: '🎯', affiliation: '北师大', specialization: '空间分析', followers: 1823, papers: 89, hIndex: 32 }
    ]);

    const [discussions, setDiscussions] = useState([
        { id: 1, title: 'GDAL处理大规模栅格数据的最佳实践', author: '技术达人', replies: 23, lastActivity: '30分钟前', tags: ['GDAL', '大数据', '栅格处理'] },
        { id: 2, title: '关于空间自相关分析的参数选择问题', author: '空间分析新手', replies: 15, lastActivity: '1小时前', tags: ['空间自相关', 'Moran I', '参数选择'] }
    ]);

    const [datasets, setDatasets] = useState([
        { id: 1, title: '全球城市建筑足迹数据集', description: '包含全球主要城市的建筑轮廓矢量数据，精度达到建筑级别，覆盖200+城市...', author: '中科院遥感所', size: '2.3 GB', format: ['Shapefile', 'GeoJSON', 'PostGIS'], tags: ['城市', '建筑', '矢量', '全球'], downloads: 1243, likes: 89, lastUpdated: '2025-05-15', license: 'CC BY 4.0', category: 'vector', quality: 4.8, documentation: true },
        { id: 2, title: '中国土地覆盖变化时间序列(2000-2020)', description: '基于Landsat影像生成的中国土地覆盖分类数据，时间跨度20年，包含10个主要类别...', author: '北京师范大学', size: '850 MB', format: ['GeoTIFF', 'NetCDF'], tags: ['土地覆盖', '时间序列', '中国', '栅格'], downloads: 892, likes: 67, lastUpdated: '2025-04-20', license: 'CC BY-SA 4.0', category: 'raster', quality: 4.6, documentation: true },
        { id: 3, title: 'OpenStreetMap道路网络提取工具', description: '自动从OSM数据提取和清理道路网络的Python工具包，支持拓扑检查和网络分析...', author: '清华大学交通学院', size: '45 MB', format: ['Python Package', 'Jupyter Notebook'], tags: ['道路网络', 'OSM', 'Python', '工具'], downloads: 456, likes: 34, lastUpdated: '2025-06-10', license: 'MIT', category: 'tool', quality: 4.7, documentation: true }
    ]);

    // +++ 3. 新增：为推荐系统创建模拟(Mock)数据 +++
    const [recommendations, setRecommendations] = useState({
        paper: { title: '城市扩张对生物多样性的时空影响分析', id: 101 },
        expert: { name: '赵研究员', affiliation: '同济大学', id: 102 },
        dataset: { title: '1990-2020年长三角城市扩张边界数据', id: 103 },
    });
    const [potentialCollaborators, setPotentialCollaborators] = useState([
        { id: 201, name: '孙博士', avatar: '🔬', specialization: '时空大数据分析' },
        { id: 202, name: '钱同学', avatar: '🎓', specialization: '土地利用变化模拟' },
    ]);
    const [knowledgeGraph, setKnowledgeGraph] = useState([
        '城市化', '土地利用', '生态系统服务', '遥感监测', '时空分析', 'CA-Markov模型'
    ]);

    const toggleLike = (postId) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, likes: post.likes + 1 }
                : post
        ));
    };

    const tabs = [
        { id: 'feed', name: '学术动态', icon: TrendingUp },
        { id: 'experts', name: '专家学者', icon: Award },
        { id: 'conferences', name: '会议信息', icon: Calendar },
        { id: 'discussions', name: '学术讨论', icon: MessageCircle },
        { id: 'datasets', name: '开源数据库', icon: Database },
        // === 新增的顶级入口 ===
        { id: 'projects', name: '协作空间', icon: Briefcase },
    ];

    // 4. 更新导航按钮的点击逻辑
    const handleNavClick = (tabId) => {
        // 第一步：无论点击哪个，都立刻更新 activeTab 的状态
        setActiveTab(tabId);

        // 第二步：根据 tabId 决定要跳转到哪个页面
        if (tabId === 'projects') {
            setCurrentPage('projectDashboard');
        } else {
            // 其他所有tab都链接到主仪表盘
            setCurrentPage('dashboard');
        }
    };

    // 2. 新增用于导航的函数
    const handleEnterProject = (projectFromProfile) => {
        // 在真实应用中，这里您会根据 project.id 从后端API获取详细的项目数据
        // 在此，我们直接构建一个丰富的模拟对象
        const detailedProjectData = {
            ...projectFromProfile, // 继承基础信息，如 id, title
            description: projectFromProfile.description || '一个关于城市热岛效应的跨城市比较研究，旨在探索不同尺度下的影响因子。',
            visibility: 'Private',
            members: [
                { id: 'user1', name: '陈院士', email: 'chen@example.com', avatar: '🏆', role: 'Owner' },
                { id: 'user2', name: '刘教授', email: 'liu@example.com', avatar: '🎯', role: 'Editor' },
                { id: 'user3', name: '张博士', email: 'zhang@example.com', avatar: '👨‍🏫', role: 'Editor' },
                { id: 'user4', name: '王研究生', email: 'wang@example.com', avatar: '🎓', role: 'Viewer' },
            ],
            // === 新增：文件管理系统的模拟数据 ===
            files: [
                { id: 'file1', name: '文献综述-最终版.pdf', type: 'PDF', size: '2.3 MB', uploadedBy: '张博士', uploadedAt: '2025-06-15' },
                { id: 'file2', name: '原始数据集.csv', type: 'CSV', size: '15.8 MB', uploadedBy: '李博士', uploadedAt: '2025-06-12' },
                { id: 'file3', name: '模型结构图.png', type: 'Image', size: '800 KB', uploadedBy: '王研究生', uploadedAt: '2025-06-10' },
                { id: 'file4', name: '项目中期报告.docx', type: 'DOCX', size: '450 KB', uploadedBy: '张博士', uploadedAt: '2025-05-20' },
            ]
            // 其他项目内部数据（看板、文档等）也可以在这里加载
        };
        setActiveProject(detailedProjectData);
        setCurrentPage('projectSpace');
    };

    const handleExitProject = () => {
        setActiveProject(null);
        setCurrentPage('profile'); // 从项目空间返回到个人主页
    };

    const handleViewProfile = () => {
        setCurrentPage('profile');
    };

    const handleExitProfile = () => {
        if (activeTab === 'projects') {
            setCurrentPage('projectDashboard');
        }
        else {
            setCurrentPage('dashboard');
        }
    }

    const renderPageContent = () => {
        switch (currentPage) {
            case 'profile':
                return (
                    <main className="py-8 px-4">
                        <AcademicProfilePage
                            profileData={mockProfileData}
                            onBack={() => handleExitProfile()} // 从个人主页可以返回主仪表盘
                            onEnterProject={handleEnterProject}
                        />
                    </main>
                );
            case 'projectDashboard':
                return (
                    <main className="py-8 px-4">
                        <ProjectDashboardPage
                            projects={mockProfileData.projects}
                            onEnterProject={handleEnterProject}
                        />
                    </main>
                );
            case 'projectSpace':
                // 项目空间是全屏的，它会替换掉所有内容，所以它的渲染逻辑是特殊的
                return (
                    <ProjectSpacePage
                        project={activeProject}
                        onExit={() => setCurrentPage('profile')} // 从项目空间返回到个人主页
                    />
                );
            case 'accountSettings':
                return (
                    <main className="py-8 px-4">
                        <AcademicProfilePage onBack={() => setCurrentPage('profile')} />
                    </main>
                );
            case 'dashboard':
            default:
                return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'feed' && <FeedComponent posts={posts} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} toggleLike={toggleLike} />}
                        {activeTab === 'experts' && <ExpertsComponent experts={experts} />}
                        {activeTab === 'conferences' && <ConferencesComponent conferences={conferences} />}
                        {activeTab === 'discussions' && <DiscussionsComponent discussions={discussions} />}
                        {activeTab === 'datasets' && <DatasetsComponent datasets={datasets} />}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        {/* +++ 4. 使用新的推荐组件替换旧的组件 +++ */}
                        <RecommendationSidebar
                            recommendations={recommendations}
                            collaborators={potentialCollaborators}
                            knowledgeGraph={knowledgeGraph}
                        />

                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">社区统计</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">活跃研究者</span>
                                    <span className="font-medium">12,453</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">今日发帖</span>
                                    <span className="font-medium">156</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">开源数据集</span>
                                    <span className="font-medium">1,245</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">本周下载</span>
                                    <span className="font-medium">3,892</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">进行中合作</span>
                                    <span className="font-medium">234</span>
                                </div>
                            </div>
                        </div>

                        {/* Trending Topics */}
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">热门话题</h3>
                            <div className="space-y-2">
                                {['#深度学习GIS', '#开源工具', '#城市分析', '#遥感应用', '#空间大数据'].map((topic) => (
                                    <div key={topic} className="flex items-center justify-between text-sm">
                                        <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{topic}</span>
                                        <span className="text-gray-500">{Math.floor(Math.random() * 100) + 20}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="font-semibold text-gray-800 mb-3">最新动态</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-gray-700">张教授分享了新的研究成果</p>
                                        <p className="text-gray-500 text-xs">5分钟前</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-gray-700">李博士发起了合作邀请</p>
                                        <p className="text-gray-500 text-xs">15分钟前</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                                    <div>
                                        <p className="text-gray-700">新用户王研究生加入社区</p>
                                        <p className="text-gray-500 text-xs">1小时前</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            )
    }
}

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-10 h-10 rounded-lg flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">GIS学术社区</h1>
                                <p className="text-sm text-gray-500">连接全球GIS研究者</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="搜索研究者、论文、会议..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            </div>

                            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* 修改头像，添加点击事件 */}
                            <button onClick={handleViewProfile} className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white cursor-pointer">
                                👤
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleNavClick(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
  activeTab === tab.id
      ? 'border-blue-500 text-blue-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
}`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
            {renderPageContent()}
        </div>
    );
};

export default GISAcademicPlatform;