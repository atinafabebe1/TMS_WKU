import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, SetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch(url);
      const json = await response.json();

      if (response.ok) {
        SetData(json);
        setIsLoading(false);
      }
    };

    fetchdata();
  }, [data, url]);
  return { data, isLoading };
};

export default useFetch;