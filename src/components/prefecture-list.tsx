import type { Prefecture } from '@/types';
import styles from './styles/prefecture-list.module.css';

interface PrefectureListProps {
  prefectures: Prefecture[];
  onPrefectureChange: (prefecture: Prefecture, checked: boolean) => void;
}

const PrefectureList = ({
  prefectures,
  onPrefectureChange,
}: PrefectureListProps) => {
  return (
    <div className={styles.prefectureList}>
      {prefectures.map((prefecture) => (
        <div key={prefecture.prefCode} className={styles.prefectureItem}>
          <label>
            <input
              type='checkbox'
              value={prefecture.prefCode}
              onChange={(e) => onPrefectureChange(prefecture, e.target.checked)}
            />
            {prefecture.prefName}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PrefectureList;
