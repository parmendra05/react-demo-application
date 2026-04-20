export const mockProjects = [
  {
    id: 1,
    name: "HR Platform Migration",
    manager: "Ranjat Srivastava",
    status: "In Progress",
    deadline: "2026-06-15",
    description: "Migrating the legacy HR platform to a new cloud-native architecture."
  },
  {
    id: 2,
    name: "Q2 Marketing Campaign Analytics",
    manager: "Priya Sharma",
    status: "Completed",
    deadline: "2026-04-30",
    description: "Analyze the performance of all digital marketing campaigns from the second quarter."
  },
  {
    id: 3,
    name: "Customer Support AI Chatbot",
    manager: "Sushant Mishra",
    status: "On Hold",
    deadline: "2026-09-01",
    description: "Develop a new AI-powered chatbot to handle initial customer support queries."
  },
  {
    id: 4,
    name: "Internal DevOps Toolchain Upgrade",
    manager: "Ankit Verma",
    status: "In Progress",
    deadline: "2026-07-20",
    description: "Upgrade CI/CD pipelines and containerize all internal services using Docker and Kubernetes."
  }
];

export const fetchProjects = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockProjects), 700));
