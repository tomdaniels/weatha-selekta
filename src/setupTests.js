/* eslint-disable import/no-extraneous-dependencies */
import enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

global.enzyme = enzyme;

enzyme.configure({ adapter: new Adapter() });
