import axios from "axios";
import { OlxAd } from "@/scraper/OlxAd";
import { OlxAdBuilder } from "@/scraper/OlxAdBuilder";

export class OlxPageScraper {
  private _ads?: OlxAd[];
  private baseUrl = "https://www.olx.pl/";
  private query = "/?search%5Border%5D=created_at:desc";

  async scrapPlp(url: string) {
    const response = await axios.get(this.baseUrl + url + this.query);

    const parser = new DOMParser();
    const dom = parser.parseFromString(response.data, "text/html");
    const cards = [...dom.querySelectorAll("div[data-testid='l-card']")];
    const ads = [];

    for (const card of cards) {
      const featured = card.querySelector("[data-testid='adCard-featured']");
      if (featured) continue;

      const builder = new OlxAdBuilder();
      builder.build(card, url);

      if (!builder.ad) continue;
      ads.push(builder.ad);
    }

    this._ads = ads;
    return this;
  }

  get ads() {
    return this._ads;
  }
}
