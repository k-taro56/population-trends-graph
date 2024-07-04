import { getChartOptions } from '@/utils/chart';
import type { Prefecture, PopulationComposition } from '@/types';

describe('getChartOptions', () => {
  const hokkaido: Prefecture = { prefCode: 1, prefName: '北海道' };
  const aomori: Prefecture = { prefCode: 2, prefName: '青森県' };

  const selectedPrefectures = [hokkaido, aomori];

  const mockPopulationCompositions: PopulationComposition[] = [
    {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 5381733 },
            { year: 2020, value: 5224614 },
          ],
        },
      ],
    },
    {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 1308265 },
            { year: 2020, value: 1237984 },
          ],
        },
      ],
    },
  ];

  it('should return correct chart options', () => {
    const label = '総人口';

    const result = getChartOptions({
      populationCompositions: mockPopulationCompositions,
      selectedPrefectures,
      label,
    });

    expect(result).toEqual({
      title: { text: '都道府県別の総人口推移' },
      xAxis: { title: { text: '年度' } },
      yAxis: { title: { text: '人口数' } },
      series: [
        {
          type: 'line',
          name: '北海道',
          data: [
            [2015, 5381733],
            [2020, 5224614],
          ],
        },
        {
          type: 'line',
          name: '青森県',
          data: [
            [2015, 1308265],
            [2020, 1237984],
          ],
        },
      ],
    });
  });

  it('should return empty series when populationCompositions is undefined', () => {
    const result = getChartOptions({
      populationCompositions: undefined,
      selectedPrefectures,
      label: '総人口',
    });
    expect(result.series).toEqual([]);
  });
});
