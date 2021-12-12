import LocationTypeahead from '../location-typeahead';

const { shallow } = enzyme;

const testOptions = ['one', 'two', 'three'];
const dummyEvent = value => ({ target: { value } });

describe('location-typeahead.js', () => {
  describe('<LocationTypeahead />', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<LocationTypeahead />);
    });

    it('renders an input form on empty state', () => {
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('input').exists()).toBe(true);
    });

    it('provides dropwdown optons for an incoming list of suggestions', () => {
      wrapper = shallow(<LocationTypeahead suggestions={testOptions} />);

      expect(wrapper.find('option')).toHaveLength(4);
      testOptions.forEach((opt, idx) => {
        expect(wrapper.find('option').at(0).text()).toContain('Please select');
        expect(wrapper.find('option').at(idx + 1).text()).toEqual(opt);
      });
    });

    it('fires a handleChange method when user types on the input field', () => {
      const handlerSpy = jest.fn();
      wrapper = shallow(<LocationTypeahead handleChange={handlerSpy} />);

      const event = dummyEvent('some-text');
      wrapper.find('input').simulate('change', event);

      expect(handlerSpy).toHaveBeenCalled();
      expect(handlerSpy).toHaveBeenCalledWith(event);
    });

    it('fires an onSubmit handler with option label that was selected', () => {
      const onSubmitSpy = jest.fn();
      wrapper = shallow(<LocationTypeahead suggestions={testOptions} onSubmit={onSubmitSpy} />);

      const event = dummyEvent(testOptions[0]);
      wrapper.find('select').simulate('change', event);
      expect(onSubmitSpy).toHaveBeenCalled();
      expect(onSubmitSpy).toHaveBeenLastCalledWith(event.target.value);
    });
  });
});
