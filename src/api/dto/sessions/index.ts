export interface SessionInterface {
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

export interface SessionPageResponseInterface {
  page: number;
  total_pages: number;
  sessions: SessionInterface[];
}
