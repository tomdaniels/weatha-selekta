import * as fetch from '../fetch';
import locationApi from '../index';

describe('api/index.js', () => {
  const fetchSpy = jest.spyOn(fetch, 'default');
  describe('locationApi.locations()', () => {
    const dummyResponse = [
      {
        id: 129910,
        name: 'Cronulla Beach, New South Wales, Australia',
        region: 'New South Wales',
        country: 'Australia',
        lat: -34.05,
        lon: 151.15,
        url: 'cronulla-beach-new-south-wales-australia',
      },
      {
        id: 131432,
        name: 'Gunnamatta, New South Wales, Australia',
        region: 'New South Wales',
        country: 'Australia',
        lat: -34.05,
        lon: 151.15,
        url: 'gunnamatta-new-south-wales-australia',
      },
      {
        id: 129911,
        name: 'Cronulla, New South Wales, Australia',
        region: 'New South Wales',
        country: 'Australia',
        lat: -34.05,
        lon: 151.15,
        url: 'cronulla-new-south-wales-australia',
      },
    ];

    it('returns and maps a list of partial match location names for a given string', async () => {
      fetchSpy.mockResolvedValue(dummyResponse);
      const response = await locationApi.locations('cronu');

      expect(fetchSpy).toHaveBeenCalled();
      expect(response).toEqual([
        'Cronulla Beach, New South Wales, Australia',
        'Gunnamatta, New South Wales, Australia',
        'Cronulla, New South Wales, Australia',
      ]);
    });
  });

  describe('locationsApi.getForecast()', () => {
    const dummyResponse = {
      location: {
        name: 'Cronulla Beach',
        region: 'New South Wales',
        country: 'Australia',
        lat: -34.05,
        lon: 151.15,
        tz_id: 'Australia/Sydney',
        localtime_epoch: 1639367591,
        localtime: '2021-12-13 14:53',
      },
      current: {
        last_updated_epoch: 1639367100,
        last_updated: '2021-12-13 14:45',
        temp_c: 21,
        temp_f: 69.8,
        is_day: 1,
        condition: {
          text: 'Partly cloudy',
          icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
          code: 1003,
        },
        wind_mph: 12.5,
        wind_kph: 20.2,
        wind_degree: 150,
        wind_dir: 'SSE',
        pressure_mb: 1014,
        pressure_in: 29.94,
      },
    };
    it('returns and maps weather api response', async () => {
      fetchSpy.mockResolvedValue(dummyResponse);
      const response = await locationApi.getForecast(encodeURIComponent('Cronulla, New South Wales, Australia'));

      expect(fetchSpy).toHaveBeenCalled();
      expect(response).toEqual({
        temp: dummyResponse.current.temp_c,
        currentConditions: dummyResponse.current.condition,
      });
    });
  });
});
