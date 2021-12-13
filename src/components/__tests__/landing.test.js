import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../../components/landing';
import locationApi from '../../api';

let wrapper;
const { shallow, mount } = enzyme;

describe('landing', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the app', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a locationTypeahead form', () => {
    expect(wrapper.find('LocationTypeahead').exists()).toBe(true);
  });

  it('fetches location suggestions when user interacts with the form', async () => {
    jest.useFakeTimers();
    const component = mount(<App />);
    const setState = jest.fn(() => 'dummy');
    const useStateSpy = jest.spyOn(React, 'useState');

    const dummyLocations = ['location1', 'location2', 'location3'];
    const locationApiSpy = jest.spyOn(locationApi, 'locations');
    const mockLocationResponse = Promise.resolve(dummyLocations);

    useStateSpy.mockImplementation(init => [init, setState]);
    locationApiSpy.mockResolvedValue(mockLocationResponse);
    const dummyEvent = { target: { value: 'dummy' } };

    act(() => {
      component.find('input').simulate('change', dummyEvent);
      jest.advanceTimersByTime(1000);
    });

    setTimeout(() => {
      expect(locationApiSpy).toHaveBeenCalled();
      expect(component.find('TrackedCities').props().cities).toEqual(mockLocationResponse.length);
    }, 0);
    await mockLocationResponse;
  });
});
