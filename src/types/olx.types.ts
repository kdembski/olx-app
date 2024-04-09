export interface OlxAdCategory {
  id: number;
  name: string;
}

export interface OlxAd {
  id: string;
  olxId: string;
  name: string;
  price: number;
  url: string;
  categoryName: string;
}

export interface OlxAdSelectResult {
  id: number;
  olxId: string;
  name: string;
  price: number;
  url: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface OlxAdCreateInput {
  olxId: string;
  name: string;
  price: number;
  url: string;
  categoryName: string;
}
