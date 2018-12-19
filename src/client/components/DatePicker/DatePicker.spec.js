import React from 'react';
import { shallow } from 'enzyme';

import DatePicker from './index';

describe('DatePicker component', () => {

  const wrapper = shallow(<DatePicker />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
