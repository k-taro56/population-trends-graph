import type { Prefecture } from '@/types';

export const updateSelectedPrefectures = (
  prefecture: Prefecture,
  isSelected: boolean,
  currentSelectedPrefectures: Prefecture[],
) => {
  return isSelected
    ? [...currentSelectedPrefectures, prefecture]
    : currentSelectedPrefectures.filter(
        (p) => p.prefCode !== prefecture.prefCode,
      );
};
