import React, { useState } from 'react';
import { GraduationCap, Award, Calendar, MapPin, ExternalLink, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';
import educationData from '../data/education.json';
import certificatesData from '../data/certificates.json';

interface EducationProps {
  isDark: boolean;
}

const Education: React.FC<EducationProps> = ({ isDark }) => {
  const [expandedCertificate, setExpandedCertificate] = useState<string | null>(null);

  const toggleCertificate = (id: string) => {
    setExpandedCertificate(expandedCertificate === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return isDark ? 'text-green-400' : 'text-green-600';
      case 'expired':
        return isDark ? 'text-red-400' : 'text-red-600';
      case 'completed':
        return isDark ? 'text-blue-400' : 'text-blue-600';
      default:
        return isDark ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Education & Certifications
          </h2>
          <p className={`text-lg ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Academic background and professional certifications
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          
          {/* Education Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className={`w-6 h-6 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {educationData.map((education) => (
                <div key={education.id} className={`card-highlighter custom-highlighter ${
                  isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                } border rounded-xl p-6 hover:shadow-lg transition-all duration-300`}>
                  
                  <div className="flex items-start gap-6">
                    {education.logo && (
                      <div className="flex-shrink-0">
                        <img 
                          src={education.logo} 
                          alt={`${education.institution} logo`} 
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                        <div>
                          <h4 className={`text-xl font-bold mb-2 ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {education.degree}
                          </h4>
                          <p className={`text-lg font-semibold ${
                            isDark ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {education.institution}
                          </p>
                        </div>
                        
                        <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className={`text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {education.period}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className={`text-sm ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {education.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className={`mb-4 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {education.description}
                      </p>
                      
                      {education.gpa && (
                        <div className="mb-4">
                          <span className={`text-sm font-semibold ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`}>
                            GPA: {education.gpa}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        {education.skills.map((skill, index) => (
                          <span key={index} className={`px-3 py-1 text-xs rounded-full ${
                            isDark 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award className={`w-6 h-6 ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <h3 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Professional Certifications
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificatesData.map((certificate) => (
                <div key={certificate.id} className={`card-highlighter custom-highlighter ${
                  isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
                } border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300`}>
                  
                  {/* Certificate Header */}
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {certificate.logo && (
                        <div className="flex-shrink-0">
                          <img 
                            src={certificate.logo} 
                            alt={`${certificate.issuer} logo`} 
                            className="w-12 h-12 object-contain rounded"
                          />
                        </div>
                      )}
                      
                      <div className="flex-grow">
                        <h4 className={`text-lg font-bold mb-2 ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {certificate.name}
                        </h4>
                        <p className={`text-sm font-semibold ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          {certificate.issuer}
                        </p>
                      </div>
                      
                      <div className={`flex items-center gap-1 ${getStatusColor(certificate.status)}`}>
                        {getStatusIcon(certificate.status)}
                        <span className="text-xs font-medium capitalize">
                          {certificate.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {certificate.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {certificate.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className={`px-2 py-1 text-xs rounded ${
                          isDark 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {skill}
                        </span>
                      ))}
                      {certificate.skills.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded ${
                          isDark 
                            ? 'bg-gray-700 text-gray-400' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          +{certificate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    {/* Toggle Button */}
                    <button
                      onClick={() => toggleCertificate(certificate.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 button-highlighter custom-highlighter ${
                        isDark 
                          ? 'text-blue-400 hover:text-blue-300' 
                          : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      View Certificate Details
                      {expandedCertificate === certificate.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  
                  {/* Collapsible Certificate Details */}
                  {expandedCertificate === certificate.id && (
                    <div className={`border-t px-6 py-4 animate-fadeIn ${
                      isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-100'
                    }`}>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className={`font-medium ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Issue Date:
                            </span>
                            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {new Date(certificate.issueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className={`font-medium ${
                              isDark ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              Expiry Date:
                            </span>
                            <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                              {new Date(certificate.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <span className={`font-medium text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Credential ID:
                          </span>
                          <p className={`text-sm font-mono ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {certificate.credentialId}
                          </p>
                        </div>
                        
                        <div>
                          <span className={`font-medium text-sm ${
                            isDark ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            All Skills:
                          </span>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {certificate.skills.map((skill, index) => (
                              <span key={index} className={`px-2 py-1 text-xs rounded ${
                                isDark 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-200 text-gray-700'
                              }`}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <a
                            href={certificate.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 button-highlighter glow-highlighter ${
                              isDark 
                                ? 'text-green-400 hover:text-green-300' 
                                : 'text-green-600 hover:text-green-700'
                            }`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Verify Certificate
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;