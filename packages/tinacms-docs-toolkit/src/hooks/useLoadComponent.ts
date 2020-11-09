import { useEffect, useState } from "react";

export const useLoadComponent = (loadComponent: () => Promise<any>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [Component, setComponent] = useState(undefined as any);

  useEffect(() => {
    const callLoadComponent = async () => {
      try {
        setLoading(true);

        const c = await loadComponent();

        if (c.default) {
          setComponent(c);
          setLoading(false);
        } else if (typeof c === "function") {
          setComponent(c);
          setLoading(false);
        }

        throw Error("Not a valid component");
      } catch (error) {
        setError(error);
      }
    };

    callLoadComponent().catch((error) => setError(error));
  }, [loadComponent]);

  return { Component, loading, error };
};
