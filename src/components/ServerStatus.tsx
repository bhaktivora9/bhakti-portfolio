import React, { useState, useEffect } from 'react';
import { Server, Wifi, Activity, Zap } from 'lucide-react';

interface ServerStatusProps {
  isDark: boolean;
}

const ServerStatus: React.FC<ServerStatusProps> = ({ isDark }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [uptime, setUptime] = useState('99.9%');
  const [responseTime, setResponseTime] = useState('45ms');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setResponseTime(`${Math.floor(Math.random() * 50) + 30}ms`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed top-6 left-6 z-50 transition-all duration-500 ${
      isExpanded ? 'w-80' : 'w-auto'
    }`}>
      
      {/* Main Status Card */}
      <div 
        className={`relative overflow-hidden rounded-xl backdrop-blur-md transition-all duration-500 cursor-pointer card-highlighter glow-highlighter ${
          isDark 
            ? 'bg-gray-900/80 border border-gray-700/50' 
            : 'bg-white/80 border border-gray-200/50'
        } shadow-lg hover:shadow-xl`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 opacity-20 ${
          isOnline 
            ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600' 
            : 'bg-gradient-to-r from-red-400 to-orange-500'
        } animate-gradient-x`} />
        
        {/* Content */}
        <div className="relative z-10 p-4">
          
          {/* Header Row */}
          <div className="flex items-center gap-3">
            
            {/* Server Icon with Pulse */}
            <div className="relative">
              <div className={`p-2 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-gray-100'
              } transition-all duration-300`}>
                <Server className={`w-5 h-5 ${
                  isOnline 
                    ? isDark ? 'text-green-400' : 'text-green-600'
                    : isDark ? 'text-red-400' : 'text-red-600'
                }`} />
              </div>
              
              {/* Pulse Ring */}
              {isOnline && (
                <div className="absolute inset-0 rounded-lg animate-ping">
                  <div className={`w-full h-full rounded-lg ${
                    isDark ? 'bg-green-400/30' : 'bg-green-600/30'
                  }`} />
                </div>
              )}
            </div>
            
            {/* Domain and Status */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-lg ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  bhakti.dev
                </h3>
                
                {/* Status Indicator */}
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${
                    isOnline 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-red-500'
                  }`} />
                  <span className={`text-xs font-medium ${
                    isOnline 
                      ? isDark ? 'text-green-400' : 'text-green-600'
                      : isDark ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className={`text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Portfolio Server • {responseTime}
              </div>
            </div>
            
            {/* Expand Indicator */}
            <div className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}>
              <Zap className={`w-4 h-4 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`} />
            </div>
          </div>
          
          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200/20 animate-fadeIn">
              
              {/* Detailed Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                
                {/* Uptime */}
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className={`w-3 h-3 ${
                      isDark ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Uptime
                    </span>
                  </div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {uptime}
                  </div>
                </div>
                
                {/* Response Time */}
                <div className={`p-3 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Wifi className={`w-3 h-3 ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`} />
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Response
                    </span>
                  </div>
                  <div className={`text-lg font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {responseTime}
                  </div>
                </div>
              </div>
              
              {/* Services Status */}
              <div className="space-y-2">
                <h4 className={`text-xs font-semibold uppercase tracking-wide ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Services
                </h4>
                
                {[
                  { name: 'Portfolio API', status: 'operational', latency: '23ms' },
                  { name: 'Resume Generator', status: 'operational', latency: '31ms' },
                  { name: 'Contact Form', status: 'operational', latency: '18ms' },
                  { name: 'Analytics', status: 'operational', latency: '42ms' }
                ].map((service, index) => (
                  <div key={service.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        service.status === 'operational' 
                          ? 'bg-green-500 animate-pulse' 
                          : 'bg-red-500'
                      }`} />
                      <span className={`text-xs ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {service.name}
                      </span>
                    </div>
                    <span className={`text-xs font-mono ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {service.latency}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Last Updated */}
              <div className={`mt-4 pt-3 border-t border-gray-200/20 text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-500'
              }`}>
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-xl ${
          isOnline 
            ? 'bg-gradient-to-r from-green-400 via-blue-500 to-purple-600' 
            : 'bg-gradient-to-r from-red-400 to-orange-500'
        } opacity-20 animate-gradient-x`} />
      </div>
      
      {/* Floating Particles */}
      {isOnline && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${
                isDark ? 'bg-blue-400' : 'bg-blue-600'
              } animate-float opacity-60`}
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerStatus;