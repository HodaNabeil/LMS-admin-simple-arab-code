export interface Review {
  id: string;
  rating: number;
  comment: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  student: {
    id: string;
    name: string;
    avatar: string | null;
  };
  course: {
    id: string;
    title: string;
  };
  instructorReply: {
    message: string;
    createdAt: string;
  } | null;
  meta: {
    completionRate: number;
    source: string;
    flagged?: boolean;
  };
}
