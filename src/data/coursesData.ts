
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  quizzes?: Quiz[];
}

export interface Quiz {
  question: string;
  options: string[];
  correctOption: number;
}

export const coursesData: Course[] = [
  {
    id: "digital-basics",
    title: "Digital Literacy Basics",
    description: "Learn the fundamentals of using smartphones, internet safety, and essential digital skills.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
    category: "Digital Literacy",
    level: "Beginner",
    duration: "4 weeks",
    modules: [
      {
        id: "smartphone-basics",
        title: "Smartphone Basics",
        description: "Learn the essential features of your smartphone",
        content: "In this module, you will learn how to navigate your smartphone, understand basic settings, make calls, send messages, and install applications safely.",
        videoUrl: "https://example.com/videos/smartphone-basics",
        quizzes: [
          {
            question: "How do you install an app on your smartphone?",
            options: [
              "By visiting a website",
              "Through the app store/play store",
              "By asking someone else to do it",
              "It's not possible to install new apps"
            ],
            correctOption: 1
          }
        ]
      },
      {
        id: "internet-safety",
        title: "Internet Safety",
        description: "Stay safe while browsing the internet",
        content: "This module covers how to identify secure websites, protect your personal information, create strong passwords, and avoid common online scams.",
        videoUrl: "https://example.com/videos/internet-safety"
      }
    ]
  },
  {
    id: "data-entry-skills",
    title: "Data Entry Fundamentals",
    description: "Master basic data entry skills to qualify for remote work opportunities.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
    category: "Job Skills",
    level: "Beginner",
    duration: "3 weeks",
    modules: [
      {
        id: "typing-skills",
        title: "Typing Skills",
        description: "Improve your typing speed and accuracy",
        content: "Learn proper finger placement, posture, and practice exercises to increase your typing speed and accuracy."
      }
    ]
  },
  {
    id: "financial-basics",
    title: "Financial Literacy for Beginners",
    description: "Learn about banking, saving, and managing your finances digitally.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Financial Independence",
    level: "Beginner",
    duration: "2 weeks",
    modules: [
      {
        id: "banking-basics",
        title: "Banking Basics",
        description: "Understanding banking and financial institutions",
        content: "Learn about different types of bank accounts, how to set up an account, using ATMs, and managing your money safely."
      }
    ]
  },
  {
    id: "small-business",
    title: "Starting a Small Business",
    description: "Essential knowledge for women entrepreneurs seeking to start their own business.",
    image: "https://images.unsplash.com/photo-1571942676516-bcab84649e44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1768&q=80",
    category: "Entrepreneurship",
    level: "Intermediate",
    duration: "6 weeks",
    modules: [
      {
        id: "business-planning",
        title: "Business Planning",
        description: "Creating a solid foundation for your business",
        content: "Learn how to identify business opportunities, create a business plan, understand your target market, and set realistic goals."
      }
    ]
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    description: "Learn to promote products and services through social media platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "4 weeks",
    modules: [
      {
        id: "social-media-basics",
        title: "Social Media Basics",
        description: "Understanding different social platforms",
        content: "Explore the most popular social media platforms, their unique features, and how to create professional profiles for business purposes."
      }
    ]
  },
  {
    id: "digital-payments",
    title: "Digital Payment Systems",
    description: "Master mobile wallets, UPI, and online banking for financial transactions.",
    image: "https://images.unsplash.com/photo-1556741533-411cf82e4e2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Financial Independence",
    level: "Beginner",
    duration: "2 weeks",
    modules: [
      {
        id: "mobile-wallets",
        title: "Mobile Wallets",
        description: "Using digital wallets safely",
        content: "Learn how to set up and use popular mobile wallets, make payments, transfer money, and keep your financial information secure."
      }
    ]
  }
];

export const courseCategories = [
  { id: "digital-literacy", name: "Digital Literacy" },
  { id: "job-skills", name: "Job Skills" },
  { id: "financial", name: "Financial Independence" },
  { id: "entrepreneurship", name: "Entrepreneurship" },
  { id: "digital-marketing", name: "Digital Marketing" }
];
