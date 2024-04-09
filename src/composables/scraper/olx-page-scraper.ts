import { useOlxAdBuilder } from "@/composables/scraper/olx-ad-builder";
import axios from "axios";

export function useOlxPageScraper() {
  const baseUrl = "https://www.olx.pl/";
  const filterQuery = "/?search%5Border%5D=created_at:desc";

  const getAdsFromPlp = async (url: string) => {
    const response = await axios.get(baseUrl + url + filterQuery);

    const parser = new DOMParser();
    const dom = parser.parseFromString(response.data, "text/html");
    const cards = [...dom.querySelectorAll("div[data-testid='l-card']")];
    const ads = [];

    const { build } = useOlxAdBuilder();

    for (const card of cards) {
      const featured = card.querySelector("[data-testid='adCard-featured']");
      if (featured) continue;

      const ad = build(card, url);
      if (!ad) continue;

      ads.push(ad);
    }

    return ads;
  };

  return {
    getAdsFromPlp,
  };
}
