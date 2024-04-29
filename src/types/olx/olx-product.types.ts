export interface OlxProduct {
  id: number;
  brand: string;
  model: string;
  avgPrice: number | null;
}

export interface OlxProductAd {
  productAds: {
    ad: {
      name: string;
      price: number;
      url: string;
      createdAt: Date;
    };
  }[];
}

export interface OlxProductAdsCount {
  _count: {
    productAds: number;
  };
}
