import type { Prefecture } from '@/types';
import styles from './styles/prefecture-list.module.css';

interface PrefectureListProps {
  prefectures: Prefecture[];
  onPrefectureChange: (prefCode: number, checked: boolean) => void;
}

const PrefectureList = ({
  prefectures,
  onPrefectureChange,
}: PrefectureListProps) => {
  return (
    <div className={styles.prefectureList}>
      {prefectures.map((prefecture) => (
        <label key={prefecture.prefCode} className={styles.prefectureItem}>
          <input
            type='checkbox'
            value={prefecture.prefCode}
            onChange={(e) =>
              onPrefectureChange(prefecture.prefCode, e.target.checked)
            }
          />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  );
};

export default PrefectureList;
