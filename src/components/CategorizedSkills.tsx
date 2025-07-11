import React, { useState } from 'react';
import { Code, Database, Server, Shield, Cloud, GitBranch, Settings, Zap, Globe, Package, Brain } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  logo: string;
  proficiency: number;
  yearsOfExperience: number;
}

interface SkillsSectionProps {
  isDark?: boolean;
}

const CategorizedSkills: React.FC<SkillsSectionProps> = ({ isDark = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      name: 'Node.js',
      category: 'runtime',
      icon: <Server className="w-5 h-5" />,
      description: 'Server-side JavaScript runtime with extensive API development experience',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      proficiency: 95,
      yearsOfExperience: 5
    },
    {
      name: 'Python',
      category: 'languages',
      icon: <Code className="w-5 h-5" />,
      description: 'Django, FastAPI, and Flask for web development and automation',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      proficiency: 90,
      yearsOfExperience: 4
    },
    {
      name: 'PostgreSQL',
      category: 'databases',
      icon: <Database className="w-5 h-5" />,
      description: 'Advanced SQL queries, indexing, and performance optimization',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      proficiency: 88,
      yearsOfExperience: 4
    },
    {
      name: 'MongoDB',
      category: 'databases',
      icon: <Database className="w-5 h-5" />,
      description: 'NoSQL document database design and aggregation pipelines',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      proficiency: 85,
      yearsOfExperience: 3
    },
    {
      name: 'Docker',
      category: 'devops',
      icon: <Package className="w-5 h-5" />,
      description: 'Containerization and orchestration with Docker Compose',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      proficiency: 92,
      yearsOfExperience: 3
    },
    {
      name: 'AWS',
      category: 'cloud',
      icon: <Cloud className="w-5 h-5" />,
      description: 'EC2, S3, RDS, Lambda, and CloudFormation deployments',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      proficiency: 80,
      yearsOfExperience: 3
    },
    {
      name: 'TensorFlow',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Deep learning framework for neural networks and model training',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      proficiency: 75,
      yearsOfExperience: 2
    },
    {
      name: 'PyTorch',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Dynamic neural network framework for research and production',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      proficiency: 70,
      yearsOfExperience: 2
    },
    {
      name: 'Scikit-learn',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Machine learning library for classification, regression, and clustering',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
      proficiency: 85,
      yearsOfExperience: 3
    },
    {
      name: 'Pandas',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Data manipulation and analysis library for Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      proficiency: 88,
      yearsOfExperience: 3
    },
    {
      name: 'NumPy',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Fundamental package for scientific computing with Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      proficiency: 90,
      yearsOfExperience: 3
    },
    {
      name: 'Jupyter',
      category: 'ml',
      icon: <Brain className="w-5 h-5" />,
      description: 'Interactive computing environment for data science and ML',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
      proficiency: 85,
      yearsOfExperience: 3
    }
    ,
    {
      name: 'Java',
      category: 'languages',
      icon: <Code className="w-5 h-5" />,
      description: 'Spring Boot applications and enterprise-level development',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      proficiency: 75,
      yearsOfExperience: 3
    },
    {
      name: 'Redis',
      category: 'databases',
      icon: <Zap className="w-5 h-5" />,
      description: 'Caching strategies and session management',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      proficiency: 82,
      yearsOfExperience: 2
    },
    {
      name: 'Git',
      category: 'tools',
      icon: <GitBranch className="w-5 h-5" />,
      description: 'Version control, branching strategies, and collaborative workflows',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      proficiency: 95,
      yearsOfExperience: 6
    },
    {
      name: 'Express.js',
      category: 'frameworks',
      icon: <Globe className="w-5 h-5" />,
      description: 'Fast, unopinionated web framework for Node.js applications',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      proficiency: 93,
      yearsOfExperience: 4
    },
    {
      name: 'GraphQL',
      category: 'api',
      icon: <Globe className="w-5 h-5" />,
      description: 'Schema design and resolver implementation',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
      proficiency: 78,
      yearsOfExperience: 2
    },
    {
      name: 'Kubernetes',
      category: 'devops',
      icon: <Settings className="w-5 h-5" />,
      description: 'Container orchestration and cluster management',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      proficiency: 70,
      yearsOfExperience: 2
    },
    {
      name: 'TypeScript',
      category: 'languages',
      icon: <Code className="w-5 h-5" />,
      description: 'Strongly typed JavaScript for large-scale applications',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      proficiency: 90,
      yearsOfExperience: 4
    },
    {
      name: 'Go',
      category: 'languages',
      icon: <Code className="w-5 h-5" />,
      description: 'High-performance concurrent programming and microservices',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
      proficiency: 72,
      yearsOfExperience: 1
    },
    {
      name: 'MySQL',
      category: 'databases',
      icon: <Database className="w-5 h-5" />,
      description: 'Relational database management and optimization',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      proficiency: 85,
      yearsOfExperience: 4
    },
    {
      name: 'Nginx',
      category: 'tools',
      icon: <Server className="w-5 h-5" />,
      description: 'Web server, reverse proxy, and load balancer configuration',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
      proficiency: 80,
      yearsOfExperience: 3
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', count: skills.length },
    { id: 'languages', name: 'Languages', count: skills.filter(s => s.category === 'languages').length },
    { id: 'databases', name: 'Databases', count: skills.filter(s => s.category === 'databases').length },
    { id: 'cloud', name: 'Cloud', count: skills.filter(s => s.category === 'cloud').length },
    { id: 'devops', name: 'DevOps', count: skills.filter(s => s.category === 'devops').length },
    { id: 'frameworks', name: 'Frameworks', count: skills.filter(s => s.category === 'frameworks').length },
    { id: 'tools', name: 'Tools', count: skills.filter(s => s.category === 'tools').length },
    { id: 'api', name: 'API', count: skills.filter(s => s.category === 'api').length },
    { id: 'runtime', name: 'Runtime', count: skills.filter(s => s.category === 'runtime').length },
    { id: 'ml', name: 'Machine Learning', count: skills.filter(s => s.category === 'ml').length }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      languages: isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-200',
      databases: isDark ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-green-100 text-green-700 border-green-200',
      cloud: isDark ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-200',
      devops: isDark ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200',
      frameworks: isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-cyan-100 text-cyan-700 border-cyan-200',
      tools: isDark ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' : 'bg-gray-100 text-gray-700 border-gray-200',
      api: isDark ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' : 'bg-pink-100 text-pink-700 border-pink-200',
      runtime: isDark ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
      ml: isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
    };
    return colors[category as keyof typeof colors] || colors.tools;
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return isDark ? 'bg-green-500' : 'bg-green-500';
    if (proficiency >= 80) return isDark ? 'bg-blue-500' : 'bg-blue-500';
    if (proficiency >= 70) return isDark ? 'bg-yellow-500' : 'bg-yellow-500';
    return isDark ? 'bg-red-500' : 'bg-red-500';
  };

  const themeClasses = {
    container: isDark 
      ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
      : 'bg-gradient-to-br from-slate-50 via-white to-slate-50 text-gray-900',
    categoryButton: (active: boolean) => isDark
      ? `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
            : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white backdrop-blur-sm'
        }`
      : `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
          active 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105' 
            : 'bg-white/70 text-gray-700 hover:bg-white hover:text-gray-900 backdrop-blur-sm border border-gray-200'
        }`,
    skillCard: isDark
      ? 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/50 backdrop-blur-sm'
      : 'bg-white/70 border-gray-200/50 hover:bg-white backdrop-blur-sm',
    skillDescription: isDark
      ? 'text-gray-300'
      : 'text-gray-600'
  };

  return (
    <div className={`p-8 rounded-2xl shadow-2xl ${themeClasses.container} transition-all duration-500 border border-gray-200/20`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
              <Server className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Backend Development Skills
            </h2>
          </div>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Specialized in building scalable, high-performance server-side applications with modern technologies
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={themeClasses.categoryButton(selectedCategory === category.id)}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-75 bg-black/10 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${themeClasses.skillCard} group`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Logo and Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={skill.logo} 
                      alt={skill.name}
                      className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      {skill.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{skill.name}</h3>
                    <p className={`text-sm ${themeClasses.skillDescription}`}>
                      {skill.yearsOfExperience} years
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(skill.category)}`}>
                  {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                </span>
              </div>

              {/* Proficiency Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Proficiency</span>
                  <span className="text-sm font-bold">{skill.proficiency}%</span>
                </div>
                <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 overflow-hidden`}>
                  <div 
                    className={`h-full ${getProficiencyColor(skill.proficiency)} transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
              
              {/* Description */}
              <p className={`text-sm ${themeClasses.skillDescription} leading-relaxed`}>
                {skill.description}
              </p>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 ${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center opacity-0 transition-opacity duration-300 ${hoveredSkill === skill.name ? 'opacity-100' : 'pointer-events-none'}`}>
                <div className="text-center">
                  <img 
                    src={skill.logo} 
                    alt={skill.name}
                    className="w-16 h-16 object-contain mx-auto mb-4 animate-pulse"
                  />
                  <h4 className="text-xl font-bold mb-2">{skill.name}</h4>
                  <p className={`text-sm ${themeClasses.skillDescription} mb-4`}>
                    {skill.description}
                  </p>
                  <div className="flex justify-center gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-blue-500">{skill.proficiency}%</span>
                      <p className={themeClasses.skillDescription}>Proficiency</p>
                    </div>
                    <div>
                      <span className="font-semibold text-green-500">{skill.yearsOfExperience}</span>
                      <p className={themeClasses.skillDescription}>Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { category: 'languages', color: 'blue', label: 'Languages' },
            { category: 'databases', color: 'green', label: 'Databases' },
            { category: 'ml', color: 'indigo', label: 'Machine Learning' },
            { category: 'devops', color: 'orange', label: 'DevOps' }
          ].map(({ category, color, label }) => (
            <div key={category} className={`text-center p-6 rounded-2xl ${isDark ? 'bg-gray-800/30' : 'bg-white/50'} backdrop-blur-sm border border-gray-200/20`}>
              <div className={`text-3xl font-bold text-${color}-500 mb-2`}>
                {skills.filter(s => s.category === category).length}
              </div>
              <div className={`text-sm font-medium ${themeClasses.skillDescription}`}>{label}</div>
              <div className={`text-xs ${themeClasses.skillDescription} mt-1`}>
                Technologies
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorizedSkills;