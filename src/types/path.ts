export interface Path {
  id: string;
  name: string;
  slug: string;
  order: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  image: string | null;
  heading: string;
  roadmapUrl: string | null;
  description: string;
}

export interface PathResponse {
  status: "success";
  message: string;
  data: Path;
}
