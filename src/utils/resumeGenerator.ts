import jsPDF from 'jspdf';
import profile from '../data/profile.json';

export const generatePDFResume = () => {
  const doc = new jsPDF();
  
  // Set up colors
  const primaryColor = [59, 130, 246]; // Blue
  const secondaryColor = [107, 114, 128]; // Gray
  const accentColor = [139, 92, 246]; // Purple
  
  // Header Section
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(profile.name, 20, 25);
  
  // Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(profile.title, 20, 35);
  
  // Contact Info
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.text(`${profile.email} | ${profile.location}`, 20, 50);
  
  // Professional Summary Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Summary', 20, 65);
  
  // Draw line under section header
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(20, 68, 190, 68);
  
  // Bio
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  const bioLines = doc.splitTextToSize(profile.bio, 170);
  doc.text(bioLines, 20, 75);
  
  // Current Status
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...accentColor);
  doc.text('Current Status:', 20, 95);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text(profile.status, 20, 102);
  
  // Technical Skills Section
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Technical Skills', 20, 120);
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, 123, 190, 123);
  
  // Skills categories
  const skills = [
    {
      category: 'Programming Languages',
      items: ['Java', 'JavaScript', 'Python', 'PHP', 'Node.js']
    },
    {
      category: 'Frameworks & Technologies',
      items: ['Spring Boot', 'Spring Framework', 'Spring Security', 'Hibernate']
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch']
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (EC2, Lambda, S3, SNS)', 'Docker', 'Kubernetes', 'Jenkins']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'SPLUNK', 'Grafana', 'Dynatrace', 'Apache Kafka']
    }
  ];
  
  let yPosition = 130;
  
  skills.forEach((skillGroup) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(`${skillGroup.category}:`, 20, yPosition);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    doc.text(skillGroup.items.join(', '), 25, yPosition + 5);
    
    yPosition += 15;
  });
  
  // Experience Section
  yPosition += 10;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Experience', 20, yPosition);
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPosition + 3, 190, yPosition + 3);
  
  yPosition += 15;
  
  // Experience entries
  const experiences = [
    {
      title: 'Backend Developer',
      company: 'Walmart @ Caspex',
      period: '03/2022 - 09/2024',
      location: 'Sunnyvale, USA',
      achievements: [
        'Developed microservices for e-commerce platform using Java and Spring Boot',
        'Implemented AI-powered recommendation engine increasing conversion rates by 15%',
        'Optimized database queries resulting in 30% faster response times',
        'Led migration from monolithic to microservices architecture'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Contentserv Technologies',
      period: '03/2017 - 02/2021',
      location: 'Pune, India',
      achievements: [
        'Worked on enterprise Product Information Management (PIM) solutions',
        'Developed Java-based backend services with Spring Boot',
        'Implemented RESTful APIs and optimized database performance',
        'Collaborated with cross-functional teams in agile development'
      ]
    }
  ];
  
  experiences.forEach((exp) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(exp.title, 20, yPosition);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(exp.company, 20, yPosition + 6);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    doc.text(`${exp.period} | ${exp.location}`, 20, yPosition + 12);
    
    yPosition += 20;
    
    exp.achievements.forEach((achievement) => {
      doc.setFontSize(10);
      doc.setTextColor(...secondaryColor);
      doc.text('•', 25, yPosition);
      const achievementLines = doc.splitTextToSize(achievement, 160);
      doc.text(achievementLines, 30, yPosition);
      yPosition += achievementLines.length * 4 + 2;
    });
    
    yPosition += 5;
  });
  
  // Projects Section
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 20;
  } else {
    yPosition += 10;
  }
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Projects', 20, yPosition);
  
  doc.setDrawColor(...primaryColor);
  doc.line(20, yPosition + 3, 190, yPosition + 3);
  
  yPosition += 15;
  
  const projects = [
    {
      name: 'genREADME',
      description: 'AI-powered documentation system that generates intelligent, ecosystem-informed READMEs by analyzing successful projects and learning from community best practices.',
      technologies: ['Java', 'Spring Boot', 'AI', 'MCP', 'GCP']
    },
    {
      name: 'SpotClassify',
      description: 'ML pipeline using Spotify API to classify tracks by genre based on features like danceability, energy, and tempo. Applied supervised models for automated labeling.',
      technologies: ['Python', 'scikit-learn', 'Spotify API']
    }
  ];
  
  projects.forEach((project) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(project.name, 20, yPosition);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    const descLines = doc.splitTextToSize(project.description, 170);
    doc.text(descLines, 20, yPosition + 6);
    
    yPosition += descLines.length * 4 + 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...accentColor);
    doc.text('Technologies: ', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(project.technologies.join(', '), 45, yPosition);
    
    yPosition += 15;
  });
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...secondaryColor);
    doc.text(`Generated on ${new Date().toLocaleDateString()} | Page ${i} of ${pageCount}`, 20, 285);
    doc.text('This resume was generated automatically from portfolio data', 120, 285);
  }
  
  return doc;
};

export const downloadPDFResume = () => {
  const doc = generatePDFResume();
  const fileName = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;
  doc.save(fileName);
};