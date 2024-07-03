import { fetcher } from '@/utils/fetcher';

describe('fetcher', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockResponse = { result: { data: 'test data' } };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as unknown as Response);

    const result = await fetcher<{ data: string }>('https://api.example.com');

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com', {
      headers: { 'X-API-KEY': process.env.RESAS_API_KEY },
    });
    expect(result).toEqual({ data: 'test data' });
  });

  it('should handle errors appropriately', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Network error'));

    await expect(fetcher('https://api.example.com')).rejects.toThrow(
      'Network error',
    );
  });
});
