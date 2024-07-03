import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { Prefecture, PopulationComposition } from '@/types';

const origin = 'https://opendata.resas-portal.go.jp/api/v1';

export const usePrefectures = () => {
  return useSWR(`${origin}/prefectures`, fetcher<Prefecture[]>);
};

export const usePopulationCompositions = (selectedPrefectures: number[]) => {
  return useSWR(
    0 < selectedPrefectures.length
      ? selectedPrefectures.map(
          (prefCode) =>
            `${origin}/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
        )
      : [],
    (urls: string[]) => Promise.all(urls.map(fetcher<PopulationComposition>)),
  );
};
