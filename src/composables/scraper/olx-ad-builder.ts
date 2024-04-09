export function useOlxAdBuilder() {
  const baseUrl = "https://www.olx.pl";

  const build = (card: Element, categoryName: string) => {
    const name = card.querySelector("h6")?.textContent;
    const olxId = card.getAttribute("id");
    const url = card.querySelector("a")?.getAttribute("href");

    const price = parseInt(
      card
        .querySelector("[data-testid='ad-price']")
        ?.textContent?.split("zł")[0]
        .replaceAll(" ", "") || "0"
    );

    if (!name || !olxId || !url || !price) return;

    return {
      olxId,
      name,
      price,
      url: baseUrl + url,
      categoryName,
    };
  };

  return { build };
}
