export interface Category {
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  createdAt: Date;
  categories: Category[];
}
