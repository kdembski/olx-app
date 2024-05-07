import axios from "axios";

import { OlxPdpAdBuilder } from "@/composables/scraper/OlxPdpAdBuilder";
import { OlxPlpAdBuilder } from "@/composables/scraper/OlxPlpAdBuilder";

import { useConsoleStore } from "@/store/console.store";

export class OlxPageScraper {
  private baseUrl = "https://www.olx.pl/";
  private query = "/?search%5Border%5D=created_at:desc";

  async scrapPlp(url: string) {
    const consoleStore = useConsoleStore();

    try {
      const response = await axios.get(this.baseUrl + url + this.query);
      const parser = new DOMParser();
      const dom = parser.parseFromString(response.data, "text/html");
      const cards = [...dom.querySelectorAll("div[data-testid='l-card']")];

      const ads = [];
      const builder = new OlxPlpAdBuilder();

      for (const card of cards) {
        const featured = card.querySelector("[data-testid='adCard-featured']");
        if (featured) continue;

        builder.build(card, url);
        if (!builder.ad) continue;

        ads.push(builder.ad);
      }

      return ads;
    } catch (e: any) {
      consoleStore.create({
        label: "bot",
        type: "error",
        message: e?.message,
      });
    }
  }

  async scrapPdp(url: string) {
    const consoleStore = useConsoleStore();

    try {
      const response = await axios.get(url);
      const parser = new DOMParser();
      const dom = parser.parseFromString(response.data, "text/html");

      const builder = new OlxPdpAdBuilder();
      builder.build(dom);

      return builder.ad;
    } catch (e: any) {
      consoleStore.create({
        label: "bot",
        type: "error",
        message: e?.message,
      });
    }
  }
}
