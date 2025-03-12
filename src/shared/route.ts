import {
  type StockAnswer,
  type StockName,
  isValidStockName,
} from "#/shared/stock";

export interface Query {
  "steps.stock": {
    top?: StockName;
    [key: `previous.${string}`]: StockAnswer;
  };
  "steps.result": {
    state?: string;
  };
}

export const route = {
  steps: {
    stock: ({
      stock,
      query = {},
    }: { stock: StockName; query?: Query["steps.stock"] }) => {
      const params = new URLSearchParams(query);
      const params_ = params.toString() ? `?${params.toString()}` : "";
      return `${routes.steps.stock.replace(":stock", stock)}${params_}`;
    },
    loading: ({ query }: { query: Query["steps.stock"] }) => {
      const params = new URLSearchParams(query);
      return `${routes.steps.loading}?${params.toString()}`;
    },
    result: ({ query }: { query: Query["steps.result"] }) => {
      const params = new URLSearchParams(query);
      return `${routes.steps.result}?${params.toString()}`;
    },
  },
};

export const routes = {
  index: "/",
  steps: {
    start: "/steps/start",
    stock: "/steps/stocks/:stock",
    loading: "/steps/loading",
    result: "/steps/result",
  },
};

export const search = {
  steps: {
    stock: {
      serialize: ({
        top,
        previous,
      }: { top: StockName; previous: Record<StockName, StockAnswer> }) => {
        return {
          top,
          ...(Object.fromEntries(
            Object.entries(previous)
              .filter(([key, _]) => isValidStockName(key))
              .map(([key, value]) => [`previous.${key}`, value]),
          ) as Query["steps.stock"]),
        };
      },
      deserialize: (query: Record<string, string>) => {
        const parse = (key: string) => key.match(/^previous\.(.*)$/)?.[1];

        const top = query["top"] as StockName;
        const previous = Object.fromEntries(
          Object.entries(query as Query["steps.stock"])
            .filter(([key, _]) => isValidStockName(parse(key)))
            .map(([key, value]) => [parse(key), value]),
        ) as Record<StockName, StockAnswer>;

        return { top, previous };
      },
    },
    result: {
      serialize: ({
        top,
        previous,
      }: { top: StockName; previous: Record<StockName, StockAnswer> }) => {
        const state = btoa(JSON.stringify({ top, previous }));
        return { state };
      },
      deserialize: (query: { state: string }) => {
        const parsed = JSON.parse(atob(query.state));
        return parsed;
      },
    },
  },
};
