import fs from "node:fs/promises";
import type { StockMindData, StockName } from "#/shared/stock";

interface TossInvestStockPricesCandleDailyData {
  result: {
    code: string;
    nextDate: string;
    prices: {
      dt: string;
      base: number;
      baseKrw: number;
      open: number;
      openKrw: number;
      high: number;
      highKrw: number;
      low: number;
      lowKrw: number;
      close: number; // 종가
      closeKrw: number;
      volume: number;
      amount: number;
      amountKrw: number;
    }[];
  };
}

const stocks: Record<StockName, string> = {
  amazon: "US19970515001",
  apple: "US19801212001",
  nvidia: "US19990122001",
  tesla: "US20100629001",
};

export const main = async () => {
  const data = {} as StockMindData;
  const date = calculateMinimumDate();

  for (const [name, code] of Object.entries(stocks)) {
    const daily = await fetchFromTossInvest1Year({ code });
    data[name] = daily.result.prices.reduce<Record<string, number>>(
      (acc, { dt, closeKrw }) => {
        if (new Date(dt) >= date) {
          acc[dt] = closeKrw;
        }
        return acc;
      },
      {},
    );
  }

  await fs.writeFile(
    "src/constants/stocks.json",
    JSON.stringify(data, undefined, 2),
  );
};

const calculateMinimumDate = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
};

const fetchFromTossInvest = async ({
  code,
  from,
}: { code: string; from: string | null }) => {
  const query = from
    ? new URLSearchParams({ count: "100", from })
    : new URLSearchParams({ count: "100" });

  const url = `https://wts-info-api.tossinvest.com/api/v1/stock-prices/${code}/candle-daily?${query}`;
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36";

  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  return response.json() as Promise<TossInvestStockPricesCandleDailyData>;
};

const fetchFromTossInvest1Year = async ({ code }: { code: string }) => {
  const data: TossInvestStockPricesCandleDailyData = {
    result: { code, nextDate: null, prices: [] },
  };

  while (data.result.prices.length < 365) {
    const from = data.result.nextDate;
    const nextData = await fetchFromTossInvest({ code, from });
    data.result.nextDate = nextData.result.nextDate;
    data.result.prices.push(...nextData.result.prices);
  }
  return data;
};

await main();
