export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  bio: string;
  tagline: string;
  phrases:[];
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
  roles: {
    title: string;
    period: string;
    description: string;
    technologies: string[];
  }[];
}
export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa?: string;
}
export interface Certificate {
  degree: string;
  institution: string;
  credential: string;
}


export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

type SkillLevel = 'beginner' | 'experienced';

interface SkillItem {
  name: string;
  level: SkillLevel;
}

interface Skill {
  category: string;
  items: SkillItem[];
}

type SkillLevel = 'beginner' | 'experienced';

interface SkillItem {
  name: string;
  level: SkillLevel;
  badge: string;
}

interface Skill {
  category: string;
  items: SkillItem[];
}


export const personalInfo: PersonalInfo = {
  name: "BHAKTI VORA",
  title: "Backend Developer | Java | AI Enthusiast",
  email: "bhaktivora16@gmail.com",
  phone: "+1 (415) 301-0317",
  location: "San Francisco, CA",
  profileImage: "Bhakti-Vora-PP.jpg",
  bio: "I'm a passionate full-stack developer with 7+ years of experience, hand-on experience in designing, developing, and maintaining scalable systems and frameworks. Proficient in taking projects from ideation to deployment. Skilled in Core Java, Spring Boot, Kubernetes, Kafka,and machine learning techniques, with a consistent track record of tackling complex engineering challenges and delivering practical solutions.Additionally, I hold a Professional Certificate in Machine Learning & Artificial Intelligence from UC Berkeley Executive Education.",
  tagline: "Backend Developer | AI Enthusiast",
  phrases: ['Frontend Developer in making...',
    'Learning about MCP, RAG, LLM',
    'Currently working on genReadME'
    ],
    resume : "Bhakti Vora Resume.pdf"
};

export const socialLinks: SocialLinks = {
  github: "https://github.com/bhaktivora9",
  linkedin: "https://www.linkedin.com/in/bhakti-vora/"
};

/*export const experiences: Experience[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and mentored junior developers.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built MVP from ground up, scaling to 100K+ users. Developed real-time features using WebSockets and implemented payment processing.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Stripe", "Redis"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2019 - 2020",
    description: "Created responsive web applications for various clients. Improved site performance by 40% through optimization techniques.",
    technologies: ["React", "JavaScript", "SCSS", "Webpack", "Jest"]
  }
];
*/

export const experiences: Experience[] = [
  {
    company: "Walmart @ Caspex",
    location: "Sunnyvale, USA",
    link:"https://www.walmart.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg",
    roles: [
      {
        title: "Backend Developer",
        period: "03/2018 - 02/2020",
        description: `● Led ORBIT platform development, centralizing data for enhanced Business Intelligence and analytics.
● Increased database write performance 35x with multithreading.
● Contributed to Walmart Commerce Platform by scaling e-commerce infrastructure.
● Designed and developed support for multi-piece shipments.
● Reduced latency by migrating servers to the same region, speeding up app-database interactions.
● Used Apache Kafka for secure, scalable inter-service communication.
● Deployed containerized apps with Docker, orchestrated with Kubernetes for scalability.
● Developed efficient data layers with Spring DAO, Hibernate, and Maven.
● Delivered features under Agile, collaborating cross-functionally and using TDD with JUnit.`,
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
    logo: "https://www.contentserv.com/hs-fs/hubfs/Contentserv%20Theme%202024/images/Centric%2BContentserv.png?width=938&height=550&name=Centric%2BContentserv.png",
    link:"https://www.contentserv.com/",
    roles: [
      {
        title: "Software Engineer",
        period: "03/2017 - 02/2018",
        description: `● Integrated legacy systems with scalable alternatives for improved flexibility.
● Implemented distributed image processing using Amazon S3 and Kafka.
● Enhanced authentication and authorization using LDAP, AD, OAuth 2.0, and SAML.
● Improved system reliability using Netflix Ribbon for soft load balancing.`,
        technologies: [
          "Amazon S3",
          "Kafka",
          "LDAP",
          "Active Directory",
          "OAuth 2.0",
          "SAML",
          "Netflix Ribbon"
        ]
      },
      {
        title: "Senior Software Engineer",
        period: "03/2018 - 02/2020",
        description: `● Designed and developed POC for connectors enabling product info export to Magento, Shopify, and Amazon Marketplace.
● Developed a recommendation engine using ML for personalized product information.
● Researched ML techniques to optimize contextual product data and upsell strategies.
● Mentored junior developers on best practices and debugging.`,
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
        title: "Software Development Engineer I (SDE I)",
        period: "03/2020 - 02/2021",
        description: `● Developed and deployed microservices-based web services using Spring Boot, encapsulating business logic within Spring Beans.
● Designed, developed, and maintained RESTful APIs supporting scalable microservices architecture.
● Added TDD using JUnit and achieved seamless integration with CI builds powered by Gradle.
● Optimized application performance through meticulous performance tuning.
● Implemented AWS Lambda for serverless computing to optimize backend workflows and reduce infrastructure costs.`,
        technologies: [
          "Spring Boot",
          "REST API",
          "JUnit",
          "Gradle",
          "AWS Lambda",
          "Performance Tuning"
        ]
      }
    ]
  }
];

export const education: Education[] = [
  {
    degree: "Bachelor of Engineering in Information Technology",
    institution: "University of Pune"
    
  }
];
export const certificates: Certificates[] = [
{
  degree:"Professional Certificate in Machine Learning & Artificial Intelligence.",
  institution:"UC Berkeley Executive Education",
  credential:"https://certificates.emeritus.org/fe943e05-a357-4561-987d-51ed62618e14#acc.nj8Ook9l"

}
];
export const projects: Project[] = [
  {
    name: "genReadME",
    description: "GenREADME is the first context-aware AI documentation system that generates intelligent, ecosystem-informed READMEs by analyzing successful projects in your tech stack and learning from community best practices.",
    technologies: ["Java", "GCP", "RAG","MCP"],
    github: "https://gitlab.com/bhaktivora09/genreadme/-/tree/MVP?ref_type=heads",
/*    demo: "https://ecommerce-demo.bhaktideveloper.dev",
*/    image: "assets/genReadME_LOGO.png?compress=400"
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

export const skills: Skill[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "Java", level: "experienced", badge: "https://img.shields.io/badge/Java-Experienced-lightgray?style=plastic&logo=java&logoColor=white&colorA=007396&size=20" },
      { name: "JavaScript", level: "experienced", badge: "https://img.shields.io/badge/JavaScript-Experienced-lightgray?style=plastic&logo=javascript&logoColor=black&colorA=F7DF1E&size=20" },
      { name: "PHP", level: "beginner", badge: "https://img.shields.io/badge/PHP-Beginner-lightgray?style=plastic&logo=php&logoColor=white&colorA=777BB4&size=20" },
      { name: "Node.js", level: "experienced", badge: "https://img.shields.io/badge/Node.js-Experienced-lightgray?style=plastic&logo=nodedotjs&logoColor=white&colorA=339933&size=20" },
      { name: "Python", level: "beginner", badge: "https://img.shields.io/badge/Python-Beginner-lightgray?style=plastic&logo=python&logoColor=white&colorA=3776AB&size=20" }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Spring Framework", level: "experienced", badge: "https://img.shields.io/badge/Spring-Experienced-lightgray?style=plastic&logo=spring&logoColor=white&colorA=6DB33F" },
      { name: "Spring Hibernate", level: "experienced", badge: "https://img.shields.io/badge/Spring%20Hibernate-Experienced-lightgray?style=plastic&logo=spring&logoColor=white&colorA=59666C" },
      { name: "Spring Boot", level: "experienced", badge: "https://img.shields.io/badge/Spring%20Boot-Experienced-lightgray?style=plastic&logo=springboot&logoColor=white&colorA=6DB33F" },
      { name: "Spring Security", level: "experienced", badge: "https://img.shields.io/badge/Spring%20Security-Experienced-lightgray?style=plastic&logo=springsecurity&logoColor=white&colorA=6DB33F" }
    ]
  },
  {
    category: "Databases",
    items: [
      { name: "SQL", level: "experienced", badge: "https://img.shields.io/badge/SQL-Experienced-lightgray?style=plastic&logo=mysql&logoColor=white&colorA=4479A1" },
      { name: "PostgreSQL", level: "experienced", badge: "https://img.shields.io/badge/PostgreSQL-Experienced-lightgray?style=plastic&logo=postgresql&logoColor=white&colorA=4169E1" },
      { name: "MySQL", level: "experienced", badge: "https://img.shields.io/badge/MySQL-Experienced-lightgray?style=plastic&logo=mysql&logoColor=white&colorA=4479A1" },
      { name: "Elasticsearch", level: "beginner", badge: "https://img.shields.io/badge/Elasticsearch-Beginner-lightgray?style=plastic&logo=elasticsearch&logoColor=white&colorA=005571" },
      { name: "MongoDB", level: "beginner", badge: "https://img.shields.io/badge/MongoDB-Beginner-lightgray?style=plastic&logo=mongodb&logoColor=white&colorA=47A248" },
      { name: "OrientDB", level: "beginner", badge: "https://img.shields.io/badge/OrientDB-Beginner-lightgray?style=plastic&logo=databricks&logoColor=white&colorA=FF6600" }
    ]
  },
  {
    category: "Middleware Technologies",
    items: [
      { name: "Apache Kafka", level: "experienced", badge: "https://img.shields.io/badge/Apache%20Kafka-Experienced-lightgray?style=plastic&logo=apachekafka&logoColor=white&colorA=231F20" },
      { name: "Netflix Ribbon", level: "beginner", badge: "https://img.shields.io/badge/Netflix%20Ribbon-Beginner-lightgray?style=plastic&logo=netflix&logoColor=white&colorA=E50914" },
      { name: "ActiveMQ", level: "beginner", badge: "https://img.shields.io/badge/ActiveMQ-Beginner-lightgray?style=plastic&logo=apache&logoColor=white&colorA=D22128" }
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS EC2", level: "beginner", badge: "https://img.shields.io/badge/AWS%20EC2-Beginner-lightgray?style=plastic&logo=amazonaws&logoColor=white&colorA=FF9900" },
      { name: "AWS Lambda", level: "beginner", badge: "https://img.shields.io/badge/AWS%20Lambda-Beginner-lightgray?style=plastic&logo=awslambda&logoColor=white&colorA=FF9900" },
      { name: "AWS S3", level: "beginner", badge: "https://img.shields.io/badge/AWS%20S3-Beginner-lightgray?style=plastic&logo=amazons3&logoColor=white&colorA=569A31" },
      { name: "AWS SNS", level: "beginner", badge: "https://img.shields.io/badge/AWS%20SNS-Beginner-lightgray?style=plastic&logo=amazonaws&logoColor=white&colorA=FF9900" },
      { name: "Docker", level: "experienced", badge: "https://img.shields.io/badge/Docker-Experienced-lightgray?style=plastic&logo=docker&logoColor=white&colorA=2496ED" },
      { name: "Kubernetes", level: "beginner", badge: "https://img.shields.io/badge/Kubernetes-Beginner-lightgray?style=plastic&logo=kubernetes&logoColor=white&colorA=326CE5" }
    ]
  },
  {
    category: "Tools & Others",
    items: [
      { name: "GitHub", level: "experienced", badge: "https://img.shields.io/badge/GitHub-Experienced-lightgray?style=plastic&logo=github&logoColor=white&colorA=181717" },
      { name: "SPLUNK", level: "beginner", badge: "https://img.shields.io/badge/Splunk-Beginner-lightgray?style=plastic&logo=splunk&logoColor=white&colorA=000000" },
      { name: "xMatters", level: "beginner", badge: "https://img.shields.io/badge/xMatters-Beginner-lightgray?style=plastic&logo=openaccess&logoColor=white&colorA=00BFA5" },
      { name: "Dynatrace", level: "beginner", badge: "https://img.shields.io/badge/Dynatrace-Beginner-lightgray?style=plastic&logo=dynatrace&logoColor=white&colorA=1496FF" },
      { name: "Grafana", level: "beginner", badge: "https://img.shields.io/badge/Grafana-Beginner-lightgray?style=plastic&logo=grafana&logoColor=white&colorA=F46800" }
    ]
  },
  {
    category: "Methodologies",
    items: [
      { name: "Agile (Scrum)", level: "experienced", badge: "https://img.shields.io/badge/Agile%20(Scrum)-Experienced-lightgray?style=plastic&logo=scrumalliance&logoColor=white&colorA=6DB33F" },
      { name: "SDLC", level: "experienced", badge: "https://img.shields.io/badge/SDLC-Experienced-lightgray?style=plastic&logo=bookstack&logoColor=white&colorA=0A66C2" }
    ]
  }
];


export const analytics = {
  gtagId: "G-XXXXXXXXXX" // Replace with your actual Google Analytics ID
};