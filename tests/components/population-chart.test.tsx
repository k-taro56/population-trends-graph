import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import PopulationChart from '@/components/population-chart';
import type { PopulationComposition } from '@/types';

const mockPopulationCompositions: PopulationComposition[] = [
  {
    boundaryYear: 2020,
    data: [
      { label: 'Tokyo', data: [{ value: 1000, year: 2020 }] },
      { label: 'Osaka', data: [{ value: 800, year: 2020 }] },
    ],
  },
];

const mockOptions = {
  title: {
    text: 'Population Chart',
  },
};

describe('PopulationChart', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <PopulationChart
        populationCompositions={mockPopulationCompositions}
        label='Tokyo'
        onLabelChange={() => {}}
        highchartsOptions={mockOptions}
      />,
    );
    expect(getByText('Tokyo')).toBeInTheDocument();
    expect(getByText('Osaka')).toBeInTheDocument();
  });

  it('calls onLabelChange when a new option is selected', () => {
    const onLabelChangeMock = jest.fn();
    const { getByRole } = render(
      <PopulationChart
        populationCompositions={mockPopulationCompositions}
        label='Tokyo'
        onLabelChange={onLabelChangeMock}
        highchartsOptions={mockOptions}
      />,
    );

    fireEvent.change(getByRole('combobox'), { target: { value: 'Osaka' } });
    expect(onLabelChangeMock).toHaveBeenCalledWith('Osaka');
  });
});
