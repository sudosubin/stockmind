import { stocks } from "#/constants/stocks";
import {
  StockAnswer,
  type StockMindSequenceData,
  type StockName,
} from "#/shared/stock";

export class StockClient {
  private stocks: StockMindSequenceData;

  constructor(stocks: StockMindSequenceData) {
    this.stocks = stocks;
  }

  public getDates() {
    const dates = Object.entries<StockMindSequenceData[StockName]>(
      this.stocks,
    ).map(([_, items]) => new Set(items.map(({ date }) => date)));

    const intersection = Array.from(
      dates.reduce(
        (acc, dates) =>
          new Set(Array.from(acc).filter((date) => dates.has(date))),
      ),
    ).sort((a, b) => b.localeCompare(a));

    return {
      from: new Date(intersection[intersection.length - 1]),
      to: new Date(intersection[0]),
    };
  }

  public getStock({ stockName }: { stockName: StockName }) {
    return this.stocks[stockName].map(({ date, price }) => ({
      date: new Date(date),
      price,
    }));
  }

  public getStockNames() {
    return Object.keys(this.stocks) as StockName[];
  }

  public getStockDates({ stockName }: { stockName: StockName }) {
    const { from, to } = this.getDates();

    const findPrice = (date: Date) => {
      const stock = this.stocks[stockName];
      const dateString = this.formatDateToString(date);
      return stock.find(({ date }) => date === dateString)?.price || 0;
    };

    return {
      from: { date: from, price: findPrice(from) },
      to: { date: to, price: findPrice(to) },
    };
  }

  /**
   * returns 4 predicate prices
   * more than 50%, 10% ~ 50%, 0% ~ 10%, less than 0%
   */
  public getStockAnswerOptions({ stockName }: { stockName: StockName }) {
    const { from, to } = this.getStockDates({ stockName });

    // use `to.price` value directly if stock price is decreased
    const last = from.price > to.price ? to.price : from.price * 0.9;

    return [
      {
        answer: StockAnswer.MORE_THAN_50,
        price: Math.floor(from.price * 1.75),
      },
      {
        answer: StockAnswer.BETWEEN_10_AND_50,
        price: Math.floor(from.price * 1.35),
      },
      {
        answer: StockAnswer.BETWEEN_0_AND_10,
        price: Math.floor(from.price * 1.08),
      },
      {
        answer: StockAnswer.LESS_THAN_0,
        price: Math.floor(last),
      },
    ];
  }

  public getAnswer({ stockName }: { stockName: StockName }) {
    const { from, to } = this.getStockDates({ stockName });
    const rate = Math.floor((to.price / from.price) * 100);
    const answer = this.calculateStockAnswer(rate);
    return { stockName, from, to, answer, rate };
  }

  public getAnswers() {
    const stocks = this.getStockNames().map((stockName) =>
      this.getAnswer({ stockName }),
    );

    return {
      rising: {
        top: stocks.sort((a, b) => b.rate - a.rate)[0],
        rest: stocks.sort((a, b) => b.rate - a.rate).slice(1),
      },
      stocks,
    };
  }

  private calculateStockAnswer(rate: number) {
    if (rate >= 150) {
      return StockAnswer.MORE_THAN_50;
    }
    if (rate >= 110) {
      return StockAnswer.BETWEEN_10_AND_50;
    }
    if (rate >= 100) {
      return StockAnswer.BETWEEN_0_AND_10;
    }
    return StockAnswer.LESS_THAN_0;
  }

  private formatDateToString(date: Date) {
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${date.getFullYear()}-${month}-${day}`;
  }
}

export const stockClient = new StockClient(stocks);
