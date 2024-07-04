import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

import Home from '@/app/page';
import type { PopulationComposition, Prefecture } from '@/types';
import { usePrefectures, usePopulationCompositions } from '@/hooks';

jest.mock('../../src/hooks', () => ({
  usePrefectures: jest.fn(),
  usePopulationCompositions: jest.fn(),
}));

jest.mock('../../src/utils/chart', () => ({
  getChartOptions: jest.fn(),
}));

describe('Home component', () => {
  const hokkaido: Prefecture = { prefCode: 1, prefName: '北海道' };
  const aomori: Prefecture = { prefCode: 2, prefName: '青森県' };
  const mockPrefectures = [hokkaido, aomori];

  beforeEach(() => {
    (usePrefectures as jest.Mock).mockReset();
    (usePopulationCompositions as jest.Mock).mockReset();
  });

  it('renders Loading component when prefectures are not loaded', () => {
    (usePrefectures as jest.Mock).mockReturnValue({ data: null });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Loading component when population compositions are loading', () => {
    (usePrefectures as jest.Mock).mockReturnValue({ data: [] });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<Home />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders prefecture list when prefectures are loaded', async () => {
    (usePrefectures as jest.Mock).mockReturnValue({ data: mockPrefectures });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('北海道')).toBeInTheDocument();
    });
  });

  it('displays message when no prefecture is selected', async () => {
    (usePrefectures as jest.Mock).mockReturnValue({ data: mockPrefectures });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);
    await waitFor(() => {
      expect(
        screen.getByText('都道府県を選択してください。'),
      ).toBeInTheDocument();
    });
  });

  it('sets the label from the first population composition data', async () => {
    const mockPopulationCompositions: PopulationComposition[] = [
      {
        boundaryYear: 2020,
        data: [{ label: 'test', data: [{ year: 2020, value: 100 }] }],
      },
    ];

    (usePrefectures as jest.Mock).mockReturnValue({ data: null });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: mockPopulationCompositions,
      isLoading: false,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  it('should update selected prefectures when a prefecture is selected', () => {
    (usePrefectures as jest.Mock).mockReturnValue({ data: mockPrefectures });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);

    const hokkaidoCheckbox = screen.getByLabelText('北海道');
    fireEvent.click(hokkaidoCheckbox);

    expect(usePopulationCompositions).toHaveBeenCalledWith([
      { prefCode: 1, prefName: '北海道' },
    ]);

    const aomoriCheckbox = screen.getByLabelText('青森県');
    fireEvent.click(aomoriCheckbox);

    expect(usePopulationCompositions).toHaveBeenCalledWith([
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
    ]);

    fireEvent.click(hokkaidoCheckbox);

    expect(usePopulationCompositions).toHaveBeenCalledWith([
      { prefCode: 2, prefName: '青森県' },
    ]);
  });
});
