import {
  OlxProduct,
  OlxProductAd,
  OlxProductAdsCount,
} from "@/types/types/olx-product.types";

export interface OlxAd {
  id: number;
  olxId: string;
  name: string;
  price: number;
  url: string;
  categoryId: number;
  createdAt: Date;
}

export interface OlxAdProduct {
  productAd: {
    product: {
      brand: string;
      model: string;
    };
  } | null;
}

export interface OlxAdCreateInput {
  olxId: string;
  name: string;
  price: number;
  url: string;
  categoryName: string;
}

export interface OlxAdWsResponse {
  ad: OlxAd & OlxAdProduct;
  products: (OlxProduct & OlxProductAd & OlxProductAdsCount)[];
}
