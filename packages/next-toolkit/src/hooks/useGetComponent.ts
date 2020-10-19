import { useEffect, useState } from "react";

interface useGetComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadComponent: (filePath: string) => any;
  filePath: string;
}
export const useGetComponent = ({
  loadComponent,
  filePath,
}: useGetComponentProps) => {
  const [loading, setLoading] = useState(true);
  const [Component, setComponent] = useState(undefined as any);
  useEffect(() => {
    const callLoadComponent = async () => {
      setLoading(true);
      const c = await loadComponent(filePath);
      if (c.default) {
        setComponent(c);
      }
      setLoading(false);
    };
    callLoadComponent();
  }, [filePath]);

  return { loading, Component };
};
