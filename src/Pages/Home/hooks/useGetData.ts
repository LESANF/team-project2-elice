import axios from 'axios';
import { useState, useEffect } from 'react';

function wrapPromise(promise: any) {
  let status = 'pending';
  let result: any;
  const suspender = promise.then(
    (r: any) => {
      status = 'success';
      result = r;
    },
    (e: any) => {
      status = 'error';
      result = e;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
      return undefined;
    },
  };
}
const fetcher = async (url: string, num: number) => {
  const promiseList: any = [];
  for (let i = 0; i < num; i += 1) {
    promiseList.push(
      fetch(url)
        .then((res) => res.blob())
        .then(URL.createObjectURL),
    );
  }
  const res = await Promise.all(promiseList);
  return res;
};
const fetcher2 = async (url: string) => {
  const res = await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  });
  return res.data.data;
};
export const useGetData = (url: string, num: number) => {
  const [resource, setResource] = useState<any>(null);
  useEffect(() => {
    const res = wrapPromise(fetcher(url, num));
    setResource(res);
  }, [url]);
  return resource?.read();
};

export const useFetchData = (url: string) => {
  const [resource, setResource] = useState<any>(null);
  useEffect(() => {
    const res = wrapPromise(fetcher2(url));
    setResource(res);
  }, [url]);
  return resource?.read();
};
