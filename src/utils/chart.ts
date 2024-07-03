import type { SeriesOptionsType } from 'highcharts';

import type { PopulationComposition, Prefecture } from '@/types';

export const getChartOptions = (
  prefectures: Prefecture[] | undefined,
  populationCompositions: PopulationComposition[] | undefined,
  selectedPrefectures: number[],
  label: string,
) => {
  const series: SeriesOptionsType[] =
    (prefectures &&
      populationCompositions?.map((populationComposition, index) => {
        const selectedPrefectureCode = selectedPrefectures[index];
        return {
          type: 'line',
          name:
            prefectures.find(
              (prefecture) => prefecture.prefCode === selectedPrefectureCode,
            )?.prefName ?? `Prefecture ${selectedPrefectureCode}`,
          data: populationComposition.data
            .find((populationTrends) => populationTrends.label === label)
            ?.data.map((item) => [item.year, item.value]),
        };
      })) ||
    [];

  return {
    title: { text: `都道府県別の${label}推移` },
    xAxis: { title: { text: '年度' } },
    yAxis: { title: { text: '人口数' } },
    series,
  };
};
