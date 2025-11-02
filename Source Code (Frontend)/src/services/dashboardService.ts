// Note: This service uses mock data for now
// In production, you would import and use actual database services here

export interface DashboardStats {
  totalJobsPosted: number;
  activeApplications: number;
  interviewsScheduled: number;
  hiredCandidates: number;
}

export interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  applications: number;
  status: string;
}

export interface Application {
  id: number;
  candidate: string;
  position: string;
  experience: string;
  location: string;
  status: string;
  applied: string;
  rating: number;
}

export const dashboardService = {
  // Get dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // For now, we'll return mock data since we don't have actual job/application tables yet
      // In a real app, you would query your database tables here
      
      // Mock API call - replace with actual database queries
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        totalJobsPosted: Math.floor(Math.random() * 50) + 10, // Random between 10-60
        activeApplications: Math.floor(Math.random() * 200) + 50, // Random between 50-250
        interviewsScheduled: Math.floor(Math.random() * 20) + 5, // Random between 5-25
        hiredCandidates: Math.floor(Math.random() * 30) + 5, // Random between 5-35
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  },

  // Get recent job postings
  async getRecentJobs(): Promise<JobPosting[]> {
    try {
      // Mock API call - replace with actual database queries
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockJobs: JobPosting[] = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$80,000 - $120,000',
          posted: '2 days ago',
          applications: Math.floor(Math.random() * 50) + 10,
          status: 'Active',
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          company: 'DesignStudio',
          location: 'New York, NY',
          type: 'Contract',
          salary: '$60,000 - $90,000',
          posted: '5 days ago',
          applications: Math.floor(Math.random() * 40) + 5,
          status: 'Active',
        },
        {
          id: 3,
          title: 'Backend Engineer',
          company: 'DataFlow Systems',
          location: 'Austin, TX',
          type: 'Full-time',
          salary: '$90,000 - $130,000',
          posted: '1 week ago',
          applications: Math.floor(Math.random() * 60) + 15,
          status: 'Paused',
        },
        {
          id: 4,
          title: 'Product Manager',
          company: 'InnovateTech',
          location: 'Seattle, WA',
          type: 'Full-time',
          salary: '$100,000 - $150,000',
          posted: '3 days ago',
          applications: Math.floor(Math.random() * 30) + 8,
          status: 'Active',
        },
        {
          id: 5,
          title: 'DevOps Engineer',
          company: 'CloudScale',
          location: 'Remote',
          type: 'Full-time',
          salary: '$85,000 - $125,000',
          posted: '1 week ago',
          applications: Math.floor(Math.random() * 25) + 5,
          status: 'Closed',
        },
      ];
      
      return mockJobs;
    } catch (error) {
      console.error('Error fetching recent jobs:', error);
      throw new Error('Failed to fetch recent jobs');
    }
  },

  // Get recent applications
  async getRecentApplications(): Promise<Application[]> {
    try {
      // Mock API call - replace with actual database queries
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const mockApplications: Application[] = [
        {
          id: 1,
          candidate: 'John Smith',
          position: 'Senior Frontend Developer',
          experience: '5 years',
          location: 'San Francisco, CA',
          status: 'Under Review',
          applied: '2 days ago',
          rating: 4.5,
        },
        {
          id: 2,
          candidate: 'Sarah Johnson',
          position: 'UX/UI Designer',
          experience: '3 years',
          location: 'New York, NY',
          status: 'Interview Scheduled',
          applied: '3 days ago',
          rating: 4.8,
        },
        {
          id: 3,
          candidate: 'Mike Chen',
          position: 'Backend Engineer',
          experience: '7 years',
          location: 'Austin, TX',
          status: 'Shortlisted',
          applied: '1 week ago',
          rating: 4.2,
        },
        {
          id: 4,
          candidate: 'Emily Davis',
          position: 'Product Manager',
          experience: '4 years',
          location: 'Seattle, WA',
          status: 'Under Review',
          applied: '1 day ago',
          rating: 4.7,
        },
        {
          id: 5,
          candidate: 'Alex Rodriguez',
          position: 'DevOps Engineer',
          experience: '6 years',
          location: 'Remote',
          status: 'Interview Scheduled',
          applied: '4 days ago',
          rating: 4.3,
        },
      ];
      
      return mockApplications;
    } catch (error) {
      console.error('Error fetching recent applications:', error);
      throw new Error('Failed to fetch recent applications');
    }
  },
};
