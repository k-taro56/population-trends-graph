import type { SeriesOptionsType } from 'highcharts';

import type { PopulationComposition, Prefecture } from '@/types';

export const getChartOptions = ({
  populationCompositions,
  selectedPrefectures,
  label,
}: {
  populationCompositions: PopulationComposition[] | undefined;
  selectedPrefectures: Prefecture[];
  label: string;
}) => {
  const series =
    populationCompositions?.map((populationComposition, index) => {
      const selectedPrefecture = selectedPrefectures[index];
      return {
        type: 'line',
        name: selectedPrefecture.prefName,
        data: populationComposition.data
          .find((populationTrends) => populationTrends.label === label)
          ?.data.map((item) => [item.year, item.value]),
        zoneAxis: 'x',
        zones: [
          {
            value: populationComposition.boundaryYear,
          },
          {
            dashStyle: 'Dot',
          },
        ],
      } satisfies SeriesOptionsType;
    }) || [];

  return {
    title: { text: `都道府県別の${label}推移` },
    subtitle: {
      text: '破線は推計値',
    },
    xAxis: { title: { text: '年度' } },
    yAxis: { title: { text: '人口数' } },
    series,
  };
};
