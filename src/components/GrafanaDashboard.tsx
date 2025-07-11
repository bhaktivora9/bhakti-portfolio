import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Zap, Database, Server, Brain, Coffee, Cloud, Cpu } from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  change: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface GrafanaDashboardProps {
  isDark: boolean;
}

const GrafanaDashboard: React.FC<GrafanaDashboardProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6y');
  const [isLive, setIsLive] = useState(true);

  const metrics: MetricData[] = [
    { name: 'Java Expertise', value: 95, change: 5, icon: Coffee, color: '#3B82F6' },
    { name: 'Spring Boot', value: 92, change: 8, icon: Server, color: '#1E40AF' },
    { name: 'Database Design', value: 88, change: 3, icon: Database, color: '#1F2937' },
    { name: 'Microservices', value: 90, change: 12, icon: Cloud, color: '#374151' },
    { name: 'AI Integration', value: 85, change: 15, icon: Brain, color: '#4B5563' },
    { name: 'System Architecture', value: 87, change: 7, icon: Cpu, color: '#6B7280' }
  ];

  const experienceData = [
    { period: '2017-2018', level: 65, role: 'Software Engineer' },
    { period: '2018-2020', level: 75, role: 'Senior Software Engineer' },
    { period: '2020-2021', level: 82, role: 'SDE I' },
    { period: '2022-2024', level: 95, role: 'Backend Developer' }
  ];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (isLive) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLive]);

  return (
    <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-300'} overflow-hidden shadow-lg`}>
      {/* Grafana Header */}
      <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border-b p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-orange-500" />
              <span className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>Grafana</span>
            </div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Skills & Experience Dashboard</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{isLive ? 'Live' : 'Paused'}</span>
            </div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm font-mono`}>
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex gap-1 mt-4">
          {['overview', 'skills'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors button-highlighter custom-highlighter ${
                activeTab === tab
                  ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                  : `${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-600' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-300'}`
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {activeTab === 'overview' && 'Technical Skills Overview'}
            {activeTab === 'skills' && 'Skill Proficiency Metrics'}
          </h2>
          <div className="flex gap-2">
            {['1y', '3y', '6y', 'All'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded transition-colors button-highlighter custom-highlighter ${
                  timeRange === range
                    ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`
                    : `${isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}`
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-4 shadow-sm`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm font-medium`}>{metric.name}</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400 text-xs">
                    <TrendingUp className="w-3 h-3" />
                    +{metric.change}%
                  </div>
                </div>
                <div className="mb-2">
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{metric.value}%</div>
                </div>
                <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full h-2`}>
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${metric.value}%`,
                      backgroundColor: metric.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Core Expertise Section */}
            <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-6 shadow-sm`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <Brain className="w-5 h-5 text-purple-500" />
                Core Expertise & Specializations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    category: 'Programming Languages', 
                    skills: ['Java', 'JavaScript', 'PHP', 'Node.js', 'Python'],
                    proficiency: 92,
                    color: '#FF6B35',
                    icon: Coffee
                  },
                  { 
                    category: 'Java Technologies', 
                    skills: ['Spring Framework', 'Spring Hibernate', 'Spring Boot', 'Spring Security'],
                    proficiency: 95,
                    color: '#6DB33F',
                    icon: Server
                  },
                  { 
                    category: 'Databases', 
                    skills: ['SQL', 'PostgreSQL', 'MySQL', 'NoSQL (Elasticsearch, MongoDB, OrientDB)'],
                    proficiency: 88,
                    color: '#336791',
                    icon: Database
                  },
                  { 
                    category: 'Middleware Technologies', 
                    skills: ['Apache Kafka', 'Netflix Ribbon'],
                    proficiency: 85,
                    color: '#8B5CF6',
                    icon: Brain
                  },
                  { 
                    category: 'CI/CD & Tools', 
                    skills: ['GitHub', 'Docker', 'Kubernetes', 'SPLUNK', 'xMatters', 'Dynatrace', 'Grafana'],
                    proficiency: 87,
                    color: '#EF4444',
                    icon: Cpu
                  },
                  { 
                    category: 'Cloud Technologies', 
                    skills: ['AWS (EC2, Lambda, S3, SNS)'],
                    proficiency: 83,
                    color: '#FF9500',
                    icon: Cloud
                  }
                ].map((expertise, index) => (
                  <div key={index} className={`${isDark ? 'bg-gray-600 border-gray-500 hover:border-gray-400' : 'bg-gray-100 border-gray-300 hover:border-gray-400'} border rounded-lg p-4 transition-colors shadow-sm`}>
                    <div className="flex items-center gap-2 mb-3">
                      <expertise.icon className="w-5 h-5" style={{ color: expertise.color }} />
                      <h4 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold text-sm`}>{expertise.category}</h4>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs`}>Proficiency</span>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-xs font-mono`}>{expertise.proficiency}%</span>
                      </div>
                      <div className={`w-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full h-2`}>
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{
                            width: `${expertise.proficiency}%`,
                            backgroundColor: expertise.color
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {expertise.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: expertise.color }}></div>
                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs`}>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodologies & SDLC Section */}
            <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-6 shadow-sm`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                <Activity className="w-5 h-5 text-blue-500" />
                Methodologies & Software Development Life Cycle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${isDark ? 'bg-gray-600 border-gray-500' : 'bg-gray-100 border-gray-300'} border rounded-lg p-4 shadow-sm`}>
                  <h4 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-3 flex items-center gap-2`}>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    Agile Methodologies
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Scrum Practices',
                      'Sprint Planning',
                      'Daily Stand-ups',
                      'Retrospective Meetings'
                    ].map((method, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{method}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Experience Level</span>
                      <span className="text-green-400 text-xs font-mono">Expert</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full h-1.5 mt-1`}>
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>

                <div className={`${isDark ? 'bg-gray-600 border-gray-500' : 'bg-gray-100 border-gray-300'} border rounded-lg p-4 shadow-sm`}>
                  <h4 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-3 flex items-center gap-2`}>
                    <Zap className="w-4 h-4 text-blue-500" />
                    SDLC Phases
                  </h4>
                  <div className="space-y-2">
                    {[
                      'Requirement Gathering',
                      'Design & Development',
                      'Testing & Quality Assurance',
                      'Deployment of Systems'
                    ].map((phase, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{phase}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Experience Level</span>
                      <span className="text-blue-400 text-xs font-mono">Advanced</span>
                    </div>
                    <div className={`w-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'} rounded-full h-1.5 mt-1`}>
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-6 shadow-sm`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Technology Stack Proficiency</h3>
              <div className="space-y-4">
                {[
                  { name: 'Java & Spring Boot', value: 95, color: '#FF6B35' },
                  { name: 'Database Technologies', value: 88, color: '#336791' },
                  { name: 'Microservices Architecture', value: 90, color: '#FF9500' },
                  { name: 'Cloud & DevOps', value: 85, color: '#00D4AA' },
                  { name: 'AI/ML Integration', value: 82, color: '#8B5CF6' },
                  { name: 'System Design', value: 87, color: '#EF4444' }
                ].map((skill, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-32 ${isDark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{skill.name}</div>
                    <div className={`flex-1 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full h-3`}>
                      <div
                        className="h-3 rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.value}%`,
                          backgroundColor: skill.color
                        }}
                      ></div>
                    </div>
                    <div className={`w-12 ${isDark ? 'text-white' : 'text-gray-900'} text-sm font-mono`}>{skill.value}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-6 shadow-sm`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Programming Languages</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Java', value: 95, color: '#FF6B35' },
                    { name: 'JavaScript', value: 85, color: '#F7DF1E' },
                    { name: 'Python', value: 80, color: '#3776AB' },
                    { name: 'PHP', value: 75, color: '#777BB4' }
                  ].map((lang, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{lang.name}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-20 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full h-2`}>
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${lang.value}%`,
                              backgroundColor: lang.color
                            }}
                          ></div>
                        </div>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm w-8`}>{lang.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border rounded-lg p-6 shadow-sm`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Frameworks & Tools</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Spring Boot', value: 92, color: '#6DB33F' },
                    { name: 'Docker', value: 88, color: '#2496ED' },
                    { name: 'Kubernetes', value: 82, color: '#326CE5' },
                    { name: 'Apache Kafka', value: 85, color: '#231F20' }
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{tool.name}</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-20 ${isDark ? 'bg-gray-600' : 'bg-gray-400'} rounded-full h-2`}>
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${tool.value}%`,
                              backgroundColor: tool.color
                            }}
                          ></div>
                        </div>
                        <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm w-8`}>{tool.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'} border-t p-3`}>
        <div className={`flex items-center justify-between text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <div>Last updated: {currentTime.toLocaleString()}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-2 py-1 rounded text-xs button-highlighter custom-highlighter ${
                isLive ? 'bg-green-600 text-white' : `${isDark ? 'bg-gray-500 text-gray-300' : 'bg-gray-400 text-gray-700'}`
              }`}
            >
              {isLive ? 'Live' : 'Paused'}
            </button>
            <span>Refresh: 1s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafanaDashboard;