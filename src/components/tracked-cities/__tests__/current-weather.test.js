import CurrentWeather from '../current-weather';

const { shallow } = enzyme;

describe('current-weather.js', () => {
  describe('<CurrentWeather />', () => {
    const testData = {
      temp: 20,
      currentConditions: {
        text: 'good',
        icon: '/weather-good',
      },
    };

    it('renders basic weather information', () => {
      const wrapper = shallow(<CurrentWeather weather={testData} />);
      expect(wrapper.find('img').props().alt).toEqual(testData.currentConditions.icon);
      expect(wrapper.find('p').text()).toContain(testData.currentConditions.text);
      expect(wrapper.find('p').text()).toContain(testData.temp);
    });
  });
});
