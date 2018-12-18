import React from 'react';
import { shallow } from 'enzyme';

import App from './index';

describe('App component', () => {

  const wrapper = shallow(<App />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
