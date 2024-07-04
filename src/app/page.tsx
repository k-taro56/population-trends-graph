'use client';

import { useEffect, useState } from 'react';

import { usePrefectures, usePopulationCompositions } from '@/hooks';
import { getChartOptions } from '@/utils/chart';
import type { Prefecture } from '@/types';
import Header from '@/components/header';
import Loading from '@/components/loading';
import PrefectureList from '@/components/prefecture-list';
import PopulationChart from '@/components/population-chart';
import Footer from '@/components/footer';
import styles from './styles/page.module.css';

export default function Home() {
  const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>(
    [],
  );
  const [label, setLabel] = useState<string>('');

  const { data: prefectures } = usePrefectures();
  const { data: populationCompositions, isLoading } =
    usePopulationCompositions(selectedPrefectures);

  const handlePrefectureChange = (prefecture: Prefecture, checked: boolean) => {
    setSelectedPrefectures((prev) =>
      checked
        ? [...prev, prefecture]
        : prev.filter((p) => p.prefCode !== prefecture.prefCode),
    );
  };

  const chartOptions = getChartOptions(
    populationCompositions,
    selectedPrefectures,
    label,
  );

  useEffect(() => {
    if (populationCompositions?.[0] && !label) {
      setLabel(populationCompositions[0].data[0].label);
    }
  }, [populationCompositions, label]);

  return (
    <div className={styles.container}>
      <Header />
      <main>
        {prefectures ? (
          <PrefectureList
            prefectures={prefectures}
            onPrefectureChange={handlePrefectureChange}
          />
        ) : (
          <Loading />
        )}
        {populationCompositions ? (
          <PopulationChart
            populationCompositions={populationCompositions}
            label={label}
            onLabelChange={setLabel}
            highchartsOptions={chartOptions}
          />
        ) : isLoading ? (
          <Loading />
        ) : (
          prefectures && (
            <p className={styles.selectPrefectureMessage}>
              都道府県を選択してください。
            </p>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
