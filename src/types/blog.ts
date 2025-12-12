export interface Category {
  name: string;
  slug: string;
}

export interface Post {
  title: string;
  slug: string;

  coverImage: string | null;
}
