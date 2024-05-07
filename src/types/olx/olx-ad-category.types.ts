export interface OlxAdCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OlxAdCategoryCreateInput {
  name?: string;
}

export interface OlxAdCategoryUpdateInput {
  id: number;
  name: string;
}

export const isOlxAdCategory = (
  category: OlxAdCategory | OlxAdCategoryCreateInput
): category is OlxAdCategory => !!(category as OlxAdCategory).id;
