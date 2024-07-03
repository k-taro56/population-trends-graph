'use server';

export const fetcher = async <T>(url: string) => {
  const response = await fetch(url, {
    headers: { 'X-API-KEY': process.env.RESAS_API_KEY as string },
  });
  const data = await response.json();
  return data.result as T;
};
