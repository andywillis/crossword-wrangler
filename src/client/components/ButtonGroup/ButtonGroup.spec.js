import React from 'react';
import { shallow } from 'enzyme';

import ButtonGroup from './index';

describe('ButtonGroup component', () => {

  const wrapper = shallow(<ButtonGroup />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
