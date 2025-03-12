import { useRoute } from "preact-iso";
import { search } from "#/shared/route";

export const useSearchStepsStock = () => {
  const { query } = useRoute();

  return query.state
    ? search.steps.result.deserialize(query as { state: string })
    : search.steps.stock.deserialize(query);
};
