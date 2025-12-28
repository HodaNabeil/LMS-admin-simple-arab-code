export interface Path {
  id: string;
  title: string;
  slug: string;
  order: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  image: string | null;
  summary: string;
  roadmapUrl: string | null;
  description: string;
  thumbnailUrl?: string | null;
  parentId?: string | null;
  icon?: string | null;
  metatitle?: string | null;
  metaDescription?: string | null;
}

export interface PathResponse {
  status: "success";
  message: string;
  data: Path;
}
