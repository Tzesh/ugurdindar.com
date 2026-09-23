export type Certificate = {
  name: string;
  issuer: string;
  href: string;
  category: 'engineering' | 'cloud' | 'delivery' | 'ai';
};

// Each URL is the link attached to the matching certificate title in public/resume.pdf.
export const certificates: Certificate[] = [
  {
    name: 'ScrumInc Scrum Team Member', issuer: 'ScrumInc', category: 'delivery',
    href: 'https://s3.amazonaws.com/scruminc-certs/5b644c8e-8f04-4dc6-a6a5-4657f237fe56',
  },
  {
    name: 'IBM Full Stack Software Developer Assessment', issuer: 'IBM', category: 'engineering',
    href: 'https://www.coursera.org/account/accomplishments/certificate/RD4RTDXYFCXB',
  },
  {
    name: 'Google Project Initiation: Starting a Successful Project', issuer: 'Google', category: 'delivery',
    href: 'https://www.coursera.org/account/accomplishments/records/RJ1Y8U98G4RD',
  },
  {
    name: 'AWS Fundamentals: Building Serverless Applications', issuer: 'AWS', category: 'cloud',
    href: 'https://www.coursera.org/account/accomplishments/certificate/WAMESF6YU3G8',
  },
  {
    name: 'IBM Introduction to Containers w/ Docker, Kubernetes & OpenShift', issuer: 'IBM', category: 'cloud',
    href: 'https://www.coursera.org/account/accomplishments/certificate/AZUPDLEN34EZ',
  },
  {
    name: 'Google Project Planning: Putting It All Together', issuer: 'Google', category: 'delivery',
    href: 'https://www.coursera.org/account/accomplishments/records/2PGMTMSLQFXI',
  },
  {
    name: 'Google Cloud Building Scalable Java Microservices with Spring Boot and Spring Cloud', issuer: 'Google Cloud', category: 'cloud',
    href: 'https://www.coursera.org/account/accomplishments/certificate/KRSRAYH6TBJD',
  },
  {
    name: 'AWS S3 Basics', issuer: 'Coursera', category: 'cloud',
    href: 'https://www.coursera.org/account/accomplishments/certificate/XPFZS5TS8JH4',
  },
  {
    name: 'Google Capstone: Applying Project Management in the Real World', issuer: 'Google', category: 'delivery',
    href: 'https://www.coursera.org/account/accomplishments/records/OGGBPYN2ZF92',
  },
  {
    name: 'DeepLearning.AI AI For Everyone', issuer: 'DeepLearning.AI', category: 'ai',
    href: 'https://www.coursera.org/account/accomplishments/certificate/Q6Z8WTASTDM5',
  },
  {
    name: 'Google Foundations of Project Management', issuer: 'Google', category: 'delivery',
    href: 'https://www.coursera.org/account/accomplishments/records/5NPX49XC4742',
  },
  {
    name: 'Google Agile Project Management', issuer: 'Google', category: 'delivery',
    href: 'https://www.coursera.org/account/accomplishments/records/FP5K9NNM16BT',
  },
];
