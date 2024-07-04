import type { Prefecture } from '@/types';
import { updateSelectedPrefectures } from '@/utils/update-selected-prefectures';

describe('updateSelectedPrefectures', () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
    { prefCode: 3, prefName: '岩手県' },
  ];

  it('should add a prefecture when isSelected is true', () => {
    const newPrefecture: Prefecture = { prefCode: 4, prefName: '宮城県' };
    const result = updateSelectedPrefectures(
      newPrefecture,
      true,
      mockPrefectures,
    );
    expect(result).toHaveLength(4);
    expect(result).toContainEqual(newPrefecture);
  });

  it('should remove a prefecture when isSelected is false', () => {
    const prefectureToRemove = mockPrefectures[1];
    const result = updateSelectedPrefectures(
      prefectureToRemove,
      false,
      mockPrefectures,
    );
    expect(result).toHaveLength(2);
    expect(result).not.toContainEqual(prefectureToRemove);
  });

  it('should not modify the array if the prefecture is not present and isSelected is false', () => {
    const nonExistentPrefecture: Prefecture = {
      prefCode: 5,
      prefName: '栃木県',
    };
    const result = updateSelectedPrefectures(
      nonExistentPrefecture,
      false,
      mockPrefectures,
    );
    expect(result).toEqual(mockPrefectures);
  });
});
