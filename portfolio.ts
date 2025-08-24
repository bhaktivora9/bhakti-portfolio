export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  bio: string;
  shortBio:string;
  tagline: string;
  phrases:string[];
  resume:string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  portfolio?: string;
}


export interface Experience {
  company: string;
  location: string;
  logo: string;
  link: string;
  totalPeriod:string;
  roles: {
    title: string;
    period: string;
    description: string[];
    technologies: string[];
  }[];
}
export interface Certs {
  degree: string;
  institution: string;
  period?: string;
  credentials?: string;
  gpa?: string;
}

export interface Education {
  degree: string;
  institution: string;
  university?: string;
  period?: string;
  description?: string;
  gpa?: string;

}


export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}


interface Skill {
  category: string;
score: number;
}


export const personalInfo: PersonalInfo = {
  name: "BHAKTI VORA",
  title: "Backend Developer | Java | AI Enthusiast",
  email: "bhaktivora16@gmail.com",
  phone: "+1 (415) 301-0317",
  location: "San Francisco, CA",
  profileImage: "Bhakti-Vora-PP.png",
  shortBio: "I'm a passionate full-stack developer with 7+ years of experience. Skilled in Core Java, Spring Boot, Kubernetes, Kafka. Additionally, I hold a Professional Certificate in Machine Learning & Artificial Intelligence from UC Berkeley Executive Education.",
  bio: "I'm a passionate full-stack developer with 7+ years of experience, hands-on experience in designing, developing, and maintaining scalable systems and frameworks. Proficient in taking projects from ideation to deployment. Skilled in Core Java, Spring Boot, Kubernetes, Kafka,and machine learning techniques, with a consistent track record of tackling complex engineering challenges and delivering practical solutions.Additionally, I hold a Professional Certificate in Machine Learning & Artificial Intelligence from UC Berkeley Executive Education.",
  tagline: "Backend Developer | AI Enthusiast",
  phrases: ['Frontend Developer in making...',
    'Learning about MCP, RAG, LLM',
    'Currently working on genReadME'
    ],
    resume : "Bhakti_Vora_Resume.pdf"
};

export const socialLinks: SocialLinks = {
  github: "https://github.com/bhaktivora9",
  linkedin: "https://www.linkedin.com/in/bhakti-vora/"
};


export const experiences: Experience[] = [
  {
    company: "Walmart @ Caspex",
    location: "Sunnyvale, USA",
    totalPeriod: "03/2022 - 09/2024",
    link:"https://www.walmart.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/archive/b/b1/20250802041144%21Walmart_logo_%282008%29.svg/120px-Walmart_logo_%282008%29.svg.png",
    roles: [
      {
        title: "Backend Developer",
        period: "03/2022 - 09/2024",
        description: ["Led ORBIT platform development, centralizing data for enhanced Business Intelligence and analytics.",
"Increased database write performance 35x with multithreading.",
"Contributed to Walmart Commerce Platform by scaling e-commerce infrastructure.",
"Designed and developed support for multi-piece shipments.",
"Reduced latency by migrating servers to the same region, speeding up app-database interactions.",
"Used Apache Kafka for secure, scalable inter-service communication.",
"Deployed containerized apps with Docker, orchestrated with Kubernetes for scalability.",
"Developed efficient data layers with Spring DAO, Hibernate, and Maven.",
"Delivered features under Agile, collaborating cross-functionally and using TDD with JUnit."
],
        technologies: [
          "Apache Kafka",
          "Docker",
          "Kubernetes",
          "Spring DAO",
          "Hibernate",
          "Maven",
          "JUnit",
          "Agile",
          "Multithreading"
        ]
      }
    ]
  },
  {
    company: "Contentserv Technologies (Now Acquired by Centric Software)",
    location: "Pune, India",
    totalPeriod:"03/2017 - 02/2021",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR8AAACwCAMAAAABtJrwAAAArlBMVEU/Pz////9Azvo6OjorKys2NjY5OTk/PTwzMzMqKiovLy8/NjI/Ozo/Mivg4OA/OjjT09M/MSru7u6lpaVAv+aampo/R0q4uLhzc3NpaWnZ2dmKiop5eXkkJCRaWlo/YW1Ax/FAs9dAmLQ/e4/Ly8s/Z3VFRUXCwsJAqsxAkKo/cYI/TVJAnLo/gphHR0dRUVGEhIQ/WmSurq4YGBg/LCOenp7p6elhYWEFBQU/VFxXdmfEAAAGp0lEQVR4nO2ai3KiShCGZxiug4ASDaKQqPGeeInums37v9jpBnIxiTEnddZYp/6vUhUGmmHmp7unAYUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIB/gRP5QSOgP9+v/fRYzo9a4Mxn0ybRny7ufd/56QGdFbXgetozXmjOLqHQC8F9n0Tpz+b3t7e31zd3TWoNnOinh3UmOMHMMHqz24YfOUSN8tBoSntGwU+P7CyoiT57i+9wgg74ryaiBnvUzP/psZ0BzmXT6F03HBJoften/DydXfu+qDXIqe6Rg5xa02heRsK/vXtJ0M2FH4lgNIM8IpgaTafmNBZFgh49Pt7PB5Sem9e+iL4TXuo/tDoD/IXRu6w5PuXj6WOZoCO/MSeFbr63fKXWF4xU+ytWZ4Bz2TPmvvD7tFo1HMEJukjPwcAYfMd7zFBu3KNWui4nx63OgeDOmDZEY2r0bjmebihB9wfXgUPp6FvuY8Zyoo9aeTtZP251BjiXhvHoRDdG7zESjZunBN1/rIn91Kxcz/TcKmtY2jTNKkCU6Qqb2ro45m5Jn60ufcMyn3aTld6zCuWwslLaM82njoVr0lWqi3g2Xciz6Fzr+eip05Y/Y/eJesaNLxp3JMzi+n40I5neLFzuKtnFYXJVjN3r1uO40yrmqq52yTaj9vCBZrFMEil3yeQ32Smv1aHdKfuJWoWTPB3GcT3lHpIkZqsL2tbphDreLAsJrPEmjHfJ2ObtbrzO6UItN921Ssnci3B1YoGCvjGPooXR/8WRZtz8iiKqnqPBYD+4dEuWtGgeVlhux0vFY5bx77Kd2la3MpMkitqVm79p2yKTqovMtrMnq7HQ1bmyTZpY7arxQB2bHTkc0vYkJ8kLVdRSyu5p0zqFV6/mlCKNDOP6KSP7+6mZZ7TLlulE7kzhdaS8uFrRdGOz0IfmkHIz9IS9zmJZz9apEnko4zTPaT81LBZnmK5Iv9gTVkZWYbZu22olZbIS7Q6na27Ul1s1lLEu9KFmK1O8mz1N6I2UJ07q0dzoN5xbo+ezJ80OPW6ZO5qWpZSXPiiVkivkSul2cTdZn4Sa1V22c8o/uaUKSR9oNrR/qAt9JltbeWS9YivKP2zF+7dk7KVLmv9ExrkSirqgjlmf37lFbuWRG9GdEFal0wmhyBr4JNI0KEX6GHVFQy2TqRIuCZHzdl6sQawPxxmH1pV6Wb9osuEfrXX+wN7AOvBRVo3c6Xn9stdSrnNtFeWipqts6ZRtIhO30Gf7fHm+E9THqYsmf2AsfMrRM5+WsOkh97HWZX4ooNKFAok3hhwrrE+ZTvf18Si86kyHj7M+5CHCbu/rI3RMETdpCc5XFEdhcUpxkPQpryM4onee8GK5OXVN4N8Zi+hFpANWPPf0aeF4HjeHg1noo8QH+lBIhiWUWg7qI9xNzBmZ0w+5ya46pYyvjlle0qaQbmu6SX9Tig/5mj4cFdmz/5DbFPFl1vmuHtKHp/fHLOD166A+ws1X3brkk8aU2LblKZZ4rQ/n+s6fUCYnLym/Fl888gn7jKKSzqUVecyKmJIH/FYfr9LHfVps+Jz3+oSyXjihS0WUsrYbdkU6tV4ob2t7Xx++QdT/qYufr+ZnYdIKkuXaWw4pcSopOzll0UkhyFt9KD3FXBlzNhnm2vWWk+R9fFFsSo/F3gxXnutSRuZURsp3c1fn7c7a3tOH1wK6Reah8f01vri+swPJTkJhEFLG4SJmQhWwvNDinT58q+PJRbnckFm9KJO4PnytDxcJ8WRj09Ms9bvplOsjL1lhkpAWm2L9Cp8FKQrPq9O/EzlYHzb2P4CpZacobOs8SZ3FZS3NEcKewXHEuvDBqtSmUDDXpdmQln+eX/E08lBNU3fLins8LCvmi0IKnVQtt3DEV4+wHHve39fjHe+fL2r0fEFpe/RGIHPVba1FeUMtL+1227osRqx1eV+tLC1TuKvb3eLtDpu1Mqt4THOzh9KqXb34sXTazWhTq6zbzdyq7tMWtdLyCXXcHb8awHj9Iy+MDj6fjt5+QVWWZX/YsNX+fz5qvzM7bGW/7phbTxb7gtjiJzj4fiMSEb4xi0/ejwXzET4Pfvp+1YA+4qP387Xq/fwC+jCffd8JkIM++z44b84h0KfflxFjAr9POAp+33IM/D7qCPh93THw+8xj4Pe9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID/Af8A4ZuX0WaYKWAAAAAASUVORK5CYII=",
    link:"https://www.contentserv.com/",
    roles: [
     
      {
        title: "Software Development Engineer I (SDE I)",
        period: "03/2020 - 02/2021",
        description: ["Developed and deployed microservices-based web services using Spring Boot, encapsulating business logic within Spring Beans.",
  "Designed, developed, and maintained RESTful APIs supporting scalable microservices architecture.",
  "Added TDD using JUnit and achieved seamless integration with CI builds powered by Gradle.",
  "Optimized application performance through meticulous performance tuning."
  ,"Implemented AWS Lambda for serverless computing to optimize backend workflows and reduce infrastructure costs."],
        technologies: [
          "Spring Boot",
          "REST API",
          "JUnit",
          "Gradle",
          "AWS Lambda",
          "Performance Tuning"
        ]
      }, {
        title: "Senior Software Engineer",
        period: "03/2018 - 02/2020",
        description: ["Designed and developed POC for connectors enabling product info export to Magento, Shopify, and Amazon Marketplace.",
"Developed a recommendation engine using ML for personalized product information.",
"Researched ML techniques to optimize contextual product data and upsell strategies.",
"Mentored junior developers on best practices and debugging."],
        technologies: [
          "Magento",
          "Shopify",
          "Amazon Marketplace",
          "Machine Learning",
          "Recommendation Systems",
          "Mentoring"
        ]
      },
       {
        title: "Software Engineer",
        period: "03/2017 - 02/2018",
        description: ["Integrated legacy systems with scalable alternatives for improved flexibility.",
"Implemented distributed image processing using Amazon S3 and Kafka.",
"Enhanced authentication and authorization using LDAP, AD, OAuth 2.0, and SAML.",
"Improved system reliability using Netflix Ribbon for soft load balancing."],
        technologies: [
          "Amazon S3",
          "Kafka",
          "LDAP",
          "Active Directory",
          "OAuth 2.0",
          "SAML",
          "Netflix Ribbon"
        ]
      }
    ]
  }
];

export const educationList: Education[] = [
  {
    degree: "Bachelor of Engineering [Information Technology]",
    institution: "Cummins College of Engineering",
    university: "University of Pune",
    period:"June 2016"
    
  }
];

export const certificates: Certs[] = [
{
  degree:"Professional Certificate in Machine Learning & Artificial Intelligence.",
  institution:"UC Berkeley Executive Education",
  credentials:"https://certificates.emeritus.org/fe943e05-a357-4561-987d-51ed62618e14#acc.nj8Ook9l",
  period:"May 2023"

}
];
export const projects: Project[] = [
  {
    name: "genReadME",
    description: "GenREADME is the first context-aware AI documentation system that generates intelligent, ecosystem-informed READMEs by analyzing successful projects in your tech stack and learning from community best practices.",
    technologies: ["Java", "GCP", "RAG","MCP"],
    github: "https://gitlab.com/bhaktivora09/genreadme/-/tree/MVP?ref_type=heads",
/*    demo: "https://ecommerce-demo.bhaktideveloper.dev",
*/    image: "genREADMELOGO.svg?compress=400"
  },
  {
    name: "spotClassify",
    description: "Designed a ML pipeline using Spotify API to classify tracks by genre based on features like danceability, energy, and tempo. Applied supervised models to automate labeling and optimize recommendations.",
    technologies: ["scikit-learn", "python"],
    github: "https://github.com/bhaktivora9/BH-PCMLAI-Capstone",
/*    demo: "https://tasks.bhaktideveloper.dev",
*/    image: "https://raw.githubusercontent.com/bhaktivora9/BH-PCMLAI-Capstone/e338159bf342d79d0a236f7d4b363c7d74b65370/images/pop-music-57bce3863df78c87634ea806.jpg?auto=compress&cs=tinysrgb&w=400"
  }
];


interface Skill {
  name: string;
  score: number;
  category: string;
  badgeLight: string;
  badgeDark: string;
}

export const flattenedSkills: Skill[] = [
  // Programming Languages
  { 
    name: "Java", 
    score: 7, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Programming Languages" 
  },
  // Java Technologies
  { 
    name: "Spring Framework", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/spring/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/spring/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Hibernate", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/hibernate/59666C?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/hibernate/BCAE79?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Boot", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/springboot/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/springboot/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Security", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/springsecurity/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/springsecurity/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Python", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/python/3776AB?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/python/4B8BBE?viewbox=auto",
    category: "Programming Languages" 
  },
/*
  
  { 
    name: "JavaScript", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/javascript/F7DF1E?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/javascript/F7DF1E?viewbox=auto",
    category: "Programming Languages" 
  },
  { 
    name: "PHP", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/php/777BB4?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/php/8892BF?viewbox=auto",
    category: "Programming Languages" 
  },
  { 
    name: "Node.js", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/nodedotjs/339933?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/nodedotjs/68CC44?viewbox=auto",
    category: "Programming Languages" 
  },
  */

  // Databases
  { 
    name: "SQL", 
    score: 7, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg",
    category: "Databases" 
  },
  { 
    name: "PostgreSQL", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/postgresql/4169E1?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/postgresql/336791?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "MySQL", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/mysql/4479A1?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/mysql/00758F?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "Elasticsearch", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/elasticsearch/005571?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/elasticsearch/FEC514?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "MongoDB", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/mongodb/47A248?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/mongodb/4DB33D?viewbox=auto",
    category: "Databases" 
  },

  // Middleware Technologies
  { 
    name: "Apache Kafka", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/apachekafka/000000?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/apachekafka/FFFFFF?viewbox=auto",
    category: "Middleware Technologies" 
  },
  { 
    name: "Netflix Ribbon", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/netflix/E50914?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/netflix/E50914?viewbox=auto",
    category: "Middleware Technologies" 
  },

  // CI/CD and Other Tools
  { 
    name: "GitHub", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/github/181717?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/github/FFFFFF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Docker", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/docker/2496ED?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/docker/2496ED?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Kubernetes", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/kubernetes/326CE5?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/kubernetes/326CE5?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "SPLUNK", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/splunk/000000?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/splunk/FFFFFF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Dynatrace", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/dynatrace/1496FF?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/dynatrace/1496FF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Grafana", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/grafana/F46800?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/grafana/F46800?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },

  // Cloud Technologies
  { 
    name: "AWS", 
    score: 7, 
    badgeLight: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-4.svg", 
    badgeDark: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-7.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "AWS Lambda", 
    score: 7, 
    badgeLight: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg", 
    badgeDark: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "AWS S3", 
    score: 7, 
    badgeLight: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg", 
    badgeDark: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "GCP", 
    score: 4, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg",
    category: "Cloud Technologies" 
  },

  // AI & Machine Learning
  { 
    name: "TensorFlow", 
    score: 4, 
    badgeLight: "https://cdn.simpleicons.org/tensorflow/FF6F00?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/tensorflow/FF6F00?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "PyTorch", 
    score: 4, 
    badgeLight: "https://cdn.simpleicons.org/pytorch/EE4C2C?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/pytorch/EE4C2C?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "Scikit-learn", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/scikitlearn/F7931E?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/scikitlearn/F7931E?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "Pandas", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/pandas/150458?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/pandas/E70488?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "NumPy", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/numpy/013243?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/numpy/4DABCF?viewbox=auto",
    category: "AI & Machine Learning" 
  }
];

export const analytics = {
  gtagId: "G-HDX9QZWHCE" // Replace with your actual Google Analytics ID
};

export const terminalCommands = {
  help: [
    'Available commands:',
    '  help       - Show this help message',
    '  clear      - Clear terminal',
    '  about      - Open About section',
    '  work       - Open Work Experience',
    '  experience - Open Work Experience',
    '  education  - Open Education section',
    '  projects   - Open Projects section',
    '  skills     - Open Skills section',
    '  contact    - Open Contact section',
    '  resume     - Open Resume',
    '  whoami     - Show user info',
    '  ls         - List available files',
    '  pwd        - Show current directory',
    '  date       - Show current date',
    '  echo <msg> - Echo a message'
  ],
  about: ['Opening About.java...'],
  work: ['Opening Work.css...'],
  experience: ['Opening Work.css...'],
  education: ['Opening education.yml...'],
  projects: ['Opening projects.ts...'],
  skills: ['Opening skills.json...'],
  contact: ['Opening Contact.html...'],
  resume: ['Opening resume.pdf...'],
  whoami: ['bhakti@portfolio:~$ Bhakti Vora - Backend Developer'],
  ls: [
    'About.java',
    'Work.css',
    'education.yml',
    'projects.ts',
    'skills.json',
    'Contact.html',
    'resume.pdf'
  ],
  pwd: ['/home/bhakti/portfolio'],
  date: [new Date().toString()]
};




