import React from 'react';
import { shallow } from 'enzyme';

import Selector from './index';

describe('Selector component', () => {

  const squares = [];

  const wrapper = shallow(<Selector />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
