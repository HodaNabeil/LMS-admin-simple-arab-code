export interface Path {
  id: string;
  name: string;
  slug: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  image: null;
  heading: string;
  roadmapUrl: string | null;
  description: string;
}

export interface PathResponse {
  paths: Path[];
}
