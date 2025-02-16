import data from "#/constants/stocks.json";
import type { StockMindData, StockMindSequenceData } from "#/shared/stock";

export const stocks = Object.entries(data as StockMindData).reduce(
  (acc, [name, prices]) => {
    acc[name] = Object.entries(prices).map(([date, price]) => ({
      date,
      price,
    }));
    return acc;
  },
  {} as StockMindSequenceData,
);
