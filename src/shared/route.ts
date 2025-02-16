import type { StockName } from "#/shared/stock";

export const route = {
  steps: {
    stock: ({
      stock,
      query = {},
    }: { stock: StockName; query?: Record<string, string> }) => {
      const params = new URLSearchParams(query);
      const params_ = params.toString() ? `?${params.toString()}` : "";
      return `${routes.steps.stock.replace(":stock", stock)}${params_}`;
    },
  },
};

export const routes = {
  index: "/",
  steps: {
    start: "/steps/start",
    stock: "/steps/stocks/:stock",
    result: "/steps/result",
  },
};
