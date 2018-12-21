import React from 'react';
import { shallow } from 'enzyme';

import Button from './index';

describe('Button component', () => {

  const wrapper = shallow(<Button />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
