import { OlxPageScraper } from "./OlxPageScraper";
import { OlxAd } from "@/scraper/OlxAd";
import axios from "axios";
import { ref } from "vue";

export function useScrapper() {
  const interval = ref();
  const scraper = new OlxPageScraper();
  const categories = [
    "elektronika/fotografia/lustrzanki",
    "elektronika/fotografia/bezlusterkowce",
    "elektronika/gry-konsole/konsole",
    "elektronika/komputery/podzespoly-i-czesci/q-karta-graficzna",
  ];
  let collectedAds: OlxAd[] = [];

  const createAd = (ad: OlxAd) => {
    return axios.post("http://159.89.105.225:5001/olx-ads", ad);
  };

  const scrap = async () => {
    for (const category of categories) {
      try {
        await scraper.scrapPlp(category);
        const ad = scraper.ads?.[0];
        if (!ad) continue;

        const isNew = !collectedAds.some(
          (collected) => collected.olxId === ad.olxId
        );
        if (!isNew) return;

        console.log(ad);
        collectedAds.push(ad);
        await createAd(ad);
      } catch (error: any) {
        console.error(error?.message);
      }
    }
  };

  const start = () => {
    interval.value = setInterval(scrap, 500);
  };

  const stop = () => {
    clearInterval(interval.value);
  };

  return {
    start,
    stop,
  };
}
