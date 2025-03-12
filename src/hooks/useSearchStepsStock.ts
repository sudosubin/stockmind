import { useRoute } from "preact-iso";
import { search } from "#/shared/route";

export const useSearchStepsStock = () => {
  const { query } = useRoute();
  return search.steps.stock.deserialize(query);
};
