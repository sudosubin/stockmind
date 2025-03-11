import { stocks } from "#/constants/stocks";

export interface StockMindData
  extends Record<StockName, Record<string, number>> {}

export interface StockMindSequenceData
  extends Record<StockName, { date: string; price: number }[]> {}

export enum StockName {
  AMAZON = "amazon",
  APPLE = "apple",
  NVIDIA = "nvidia",
  TESLA = "tesla",
}

export enum StockAnswer {
  MORE_THAN_50 = "0",
  BETWEEN_10_AND_50 = "1",
  BETWEEN_0_AND_10 = "2",
  LESS_THAN_0 = "3",
}

export const isValidStockName = (name: string): name is StockName => {
  return Object.keys(stocks).includes(name);
};
