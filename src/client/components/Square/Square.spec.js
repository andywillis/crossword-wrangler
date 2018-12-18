import React from 'react';
import { shallow } from 'enzyme';

import Square from './index';

describe('Square component', () => {

  const wrapper = shallow(<Square />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
