import TrackedCities from '../tracked-cities';

const { shallow } = enzyme;

describe('current-weather.js', () => {
  describe('<CurrentWeather />', () => {
    let wrapper;
    const testData = [
      {
        location: 'test',
        weather: {
          temp: 20,
          currentConditions: {
            text: 'good',
            icon: '/weather-good',
          },
        },
      },
      {
        location: 'another place',
        weather: {
          temp: 12,
          currentConditions: {
            text: 'bad',
            icon: '/weather-bad',
          },
        },
      },
    ];

    beforeEach(() => {
      wrapper = shallow(<TrackedCities cities={testData} />);
    });

    it('renders weather data grouped by location', () => {
      testData.forEach((location, idx) => {
        expect(wrapper.find('h2').at(idx).text()).toEqual(location.location);
      });
    });

    it('renders specific weather data through its child component', () => {
      expect(wrapper.find('CurrentWeather')).toHaveLength(2);

      testData.forEach((location, idx) => {
        expect(wrapper.find('CurrentWeather').at(idx).props().weather).toEqual(testData[idx].weather);
      });
    });

    it('supports a click handler and provides the name of the selected city', () => {
      const handleRemoveSpy = jest.fn();
      wrapper = shallow(<TrackedCities cities={testData} onRemove={handleRemoveSpy} />);
      wrapper.find('button').at(0).simulate('click');
      expect(handleRemoveSpy).toHaveBeenCalledWith(testData[0].location);
    });
  });
});
