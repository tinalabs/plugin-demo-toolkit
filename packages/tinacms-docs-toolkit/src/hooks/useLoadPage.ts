import { useEffect, useState } from "react";
import { DemoPage } from "../components";

export const useLoadPage = (
  loadPage: Promise<DemoPage>
): [DemoPage | undefined, boolean, Error | undefined] => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [Page, setPage] = useState<DemoPage>();

  useEffect(() => {
    const callLoadComponent = async () => {
      try {
        setLoading(true);

        const c = await loadPage;
        if (typeof c.default !== "undefined") {
          setPage(c);
          setLoading(false);
        } else {
          throw Error("Not a valid component");
        }
      } catch (error) {
        setError(error);
      }
    };

    callLoadComponent().catch((error) => setError(error));
  }, [loadPage]);

  return [Page, loading, error];
};
