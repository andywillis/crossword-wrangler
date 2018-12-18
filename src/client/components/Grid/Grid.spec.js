import React from 'react';
import { shallow } from 'enzyme';

import Grid from './index';

describe('Grid component', () => {

  const squares = [];

  const wrapper = shallow(<Grid squares={squares} />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
