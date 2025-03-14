import { useSearchParams } from "wouter";
import { search } from "#/shared/route";

export const useSearchStepsStock = () => {
  const [searchParams, _] = useSearchParams();
  const query = Object.fromEntries(searchParams);

  return query.state
    ? search.steps.result.deserialize(query as { state: string })
    : search.steps.stock.deserialize(query);
};
