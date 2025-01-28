export interface Session {
  id: string;
  game: string;
  objetive: string;
  rank: string | null;
  is_ranked: boolean;
  updated_at: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    gamertag: string;
    avatar: string;
  };
}

export interface SessionPageResponse {
  page: number;
  total_pages: number;
  sessions: Session[];
}
