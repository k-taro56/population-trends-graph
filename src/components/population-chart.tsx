import Highcharts, { type Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import type { PopulationComposition } from '@/types';
import styles from './styles/population-chart.module.css';

interface PopulationChartProps {
  populationCompositions: PopulationComposition[];
  label: string;
  onLabelChange: (label: string) => void;
  highchartsOptions: Options;
}

const PopulationChart = ({
  populationCompositions,
  label,
  onLabelChange,
  highchartsOptions: options,
}: PopulationChartProps) => {
  return (
    <div className={styles.chartContainer}>
      <select
        className={styles.select}
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
      >
        {populationCompositions[0].data.map((data) => (
          <option key={data.label} value={data.label}>
            {data.label}
          </option>
        ))}
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationChart;
