import {
  OlxProduct,
  OlxProductAd,
  OlxProductAdsCount,
} from "@/types/olx/olx-product.types";

export interface OlxAd {
  id: number;
  olxId: string;
  olxUserId: string;
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

export interface OlxAdWsResponse {
  ad: OlxAd & OlxAdProduct;
  products: (OlxProduct & OlxProductAd & OlxProductAdsCount)[];
}

export interface OlxAdCreateInput {
  olxId: string;
  olxUserId: string;
  name: string;
  price: number;
  url: string;
  categoryName: string;
}
