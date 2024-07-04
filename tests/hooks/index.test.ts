import { renderHook, waitFor } from '@testing-library/react';

import { usePrefectures, usePopulationCompositions } from '@/hooks';
import { fetcher } from '@/utils/fetcher';

jest.mock('../../src/utils/fetcher');

describe('Hooks', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('usePrefectures', () => {
    it('should fetch prefectures data', async () => {
      const mockPrefectures = [{ prefCode: 1, prefName: 'Tokyo' }];
      (fetcher as jest.Mock).mockResolvedValue(mockPrefectures);

      const { result } = renderHook(() => usePrefectures());

      await waitFor(() => expect(result.current.data).toEqual(mockPrefectures));
      expect(fetcher).toHaveBeenCalledWith(
        'https://opendata.resas-portal.go.jp/api/v1/prefectures',
      );
    });
  });

  describe('usePopulationCompositions', () => {
    it('should fetch population compositions for selected prefectures', async () => {
      const mockPopulationComposition = {
        data: { label: 'Population', data: [] },
      };
      (fetcher as jest.Mock).mockResolvedValue(mockPopulationComposition);

      const selectedPrefectures = [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ];
      const { result } = renderHook(() =>
        usePopulationCompositions(selectedPrefectures),
      );

      await waitFor(() => expect(result.current.data).toHaveLength(2));
      expect(fetcher).toHaveBeenCalledTimes(2);
    });

    it('should not fetch data when no prefectures are selected', async () => {
      const { result } = renderHook(() => usePopulationCompositions([]));

      await waitFor(() => expect(result.current.data).toBeUndefined());
      expect(fetcher).not.toHaveBeenCalled();
    });
  });
});
