import { ref } from "vue";
import { useOlxPageScraper } from "@/composables/scraper/olx-page-scraper";
import { useOlxAdStore } from "@/store/olx/olx-ad.store";
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { useConsoleStore } from "@/store/console.store";

export function useScrapper() {
  const interval = ref();
  const collectedOlxIds: string[] = [];

  const { getAdsFromPlp } = useOlxPageScraper();
  const olxCategoryStore = useOlxAdCategoryStore();
  const olxAdStore = useOlxAdStore();
  const consoleStore = useConsoleStore();

  const scrap = async () => {
    for (const category of olxCategoryStore.categoryNames) {
      try {
        const ad = (await getAdsFromPlp(category))?.[0];
        if (!ad) continue;

        const isNew = !collectedOlxIds.some((olxId) => olxId === ad.olxId);
        if (!isNew) continue;

        consoleStore.create({
          type: "info",
          message: `<a href="${ad.url}">${ad.url}</a> ${ad.categoryName}`,
        });

        collectedOlxIds.push(ad.olxId);
        await olxAdStore.create(ad);
      } catch (error: any) {
        consoleStore.create({
          type: "error",
          message: error?.message,
        });
      }
    }
  };

  const start = () => {
    if (interval.value) return;
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
