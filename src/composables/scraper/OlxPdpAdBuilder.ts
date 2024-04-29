import { OlxScraperPdpAd } from "@/types/scraper/olx-scraper.types";

export class OlxPdpAdBuilder {
  private _ad?: OlxScraperPdpAd;

  build(dom: Document) {
    const userLink = dom.querySelector("a[data-testid='user-profile-link']");
    const olxUserId = userLink
      ?.getAttribute("href")
      ?.replace("oferty", "")
      .replace("uzytkownik", "")
      .replaceAll("/", "");

    if (!olxUserId) return this;

    this._ad = {
      olxUserId,
    };

    return this;
  }

  get ad() {
    return this._ad;
  }
}
