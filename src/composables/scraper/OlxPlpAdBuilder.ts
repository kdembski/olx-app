import { OlxScraperPlpAd } from "@/types/scraper/olx-scraper.types";

export class OlxPlpAdBuilder {
  private _ad?: OlxScraperPlpAd;
  private baseUrl = "https://www.olx.pl";

  build(card: Element, categoryName: string) {
    const name = card.querySelector("h6")?.textContent;
    const olxId = card.getAttribute("id");
    const url = card.querySelector("a")?.getAttribute("href");

    const price = parseInt(
      card
        .querySelector("[data-testid='ad-price']")
        ?.textContent?.split("zł")[0]
        .replaceAll(" ", "") || "0"
    );

    if (!name || !olxId || !url || !price) return this;

    this._ad = {
      olxId,
      name,
      price,
      url: this.baseUrl + url,
      categoryName,
    };

    return this;
  }

  get ad() {
    return this._ad;
  }
}
