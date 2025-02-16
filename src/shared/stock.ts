import { stocks } from "#/constants/stocks";

export interface StockMindData
  extends Record<StockName, Record<string, number>> {}

export interface StockMindSequenceData
  extends Record<StockName, { date: string; price: number }[]> {}

export type StockName = "amazon" | "apple" | "nvidia" | "tesla";

const calculateStockDates = () => {
  const dates = Object.entries<StockMindSequenceData[StockName]>(stocks).map(
    ([_, items]) => new Set(items.map(({ date }) => date)),
  );

  const intersection = Array.from(
    dates.reduce(
      (acc, dates) =>
        new Set(Array.from(acc).filter((date) => dates.has(date))),
    ),
  );

  return intersection.sort((a, b) => b.localeCompare(a));
};

export const calculateStockFrom = () => {
  const dates = calculateStockDates();
  return new Date(dates[dates.length - 1]);
};

export const calculateStockTo = () => {
  const dates = calculateStockDates();
  return new Date(dates[0]);
};
