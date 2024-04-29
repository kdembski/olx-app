import { ref } from "vue";

import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { useConsoleStore } from "@/store/console.store";
import { OlxPageScraper } from "@/composables/scraper/OlxPageScraper";

export function useScrapper() {
  const interval = ref();
  const collectedOlxIds: string[] = [];

  const olxAdCategoryStore = useOlxAdCategoryStore();
  const olxAdStore = useOlxAdStore();
  const consoleStore = useConsoleStore();
  const scraper = new OlxPageScraper();

  const scrap = () => {
    olxAdCategoryStore.categoryNames.forEach(async (category) => {
      try {
        // Clean collected ads
        if (collectedOlxIds.length > 1000) {
          collectedOlxIds.length = 100;
        }

        // Scrap all plp ads and take first one (newest)
        const plpAds = await scraper.scrapPlp(category);
        const plpAd = plpAds?.[0];
        if (!plpAd) return;

        // Check if ad has been already scraped
        const isNew = !collectedOlxIds.some(
          (collectedId) => collectedId === plpAd.olxId
        );
        if (!isNew) return;

        collectedOlxIds.unshift(plpAd.olxId);

        // Scrap pdp of that ad
        const pdpAd = await scraper.scrapPdp(plpAd.url);
        if (!pdpAd) return;

        // Build olx ad create input and send post request
        const ad = { ...plpAd, ...pdpAd };

        consoleStore.create({
          type: "info",
          message: `<a target="_blank" href="${ad.url}">${ad.url}</a> ${ad.categoryName}`,
        });

        await olxAdStore.create(ad);
      } catch (error: any) {
        consoleStore.create({
          type: "error",
          message: error?.message,
        });
      }
    });
  };

  const start = () => {
    if (interval.value) return;
    interval.value = setInterval(scrap, 1000);
  };

  const stop = () => {
    clearInterval(interval.value);
  };

  return {
    start,
    stop,
  };
}
