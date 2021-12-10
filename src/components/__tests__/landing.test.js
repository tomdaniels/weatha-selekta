import App from '../../components/landing';

let wrapper;
const { shallow } = enzyme;

describe('landing', () => {
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders the app', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
