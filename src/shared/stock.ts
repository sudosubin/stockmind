import { stocks } from "#/constants/stocks";

export interface StockMindData
  extends Record<StockName, Record<string, number>> {}

export interface StockMindSequenceData
  extends Record<StockName, { date: string; price: number }[]> {}

export type StockName = "amazon" | "apple" | "nvidia" | "tesla";

export enum StockAnswer {
  MORE_THAN_50 = "0",
  BETWEEN_10_AND_50 = "1",
  BETWEEN_0_AND_10 = "2",
  LESS_THAN_0 = "3",
}

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

const formatDateToString = (date: Date) => {
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${date.getFullYear()}-${month}-${day}`;
};

export const calculateStockFrom = () => {
  const dates = calculateStockDates();
  return new Date(dates[dates.length - 1]);
};

export const calculateStockTo = () => {
  const dates = calculateStockDates();
  return new Date(dates[0]);
};

/**
 * returns 4 predicate prices
 * more than 50%, 10% ~ 50%, 0% ~ 10%, less than 0%
 */
export const calculatePredicatePrices = ({
  from,
  to,
}: { from: number; to: number }) => {
  // use `to` value directly if stock price is decreased
  const last = from > to ? to : from * 0.9;

  return [
    Math.floor(from * 1.75),
    Math.floor(from * 1.35),
    Math.floor(from * 1.08),
    Math.floor(last),
  ];
};

export const findStockDateByDate = ({
  stock,
  date,
}: { stock: StockName; date: Date }) => {
  const dateString = formatDateToString(date);
  return stocks[stock].find(({ date }) => date === dateString);
};

export const isValidStockName = (name: string): name is StockName => {
  return Object.keys(stocks).includes(name);
};
