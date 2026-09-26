export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';
  admin_notes?: string;
  created_at: string;
  budget_range?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Web & App' | 'Enterprise & ERP' | 'AI & LLMs' | 'Healthcare' | 'Education';
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  client: string;
  metrics: string;
  status: 'Delivered' | 'Live Production';
  featuredImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
}
