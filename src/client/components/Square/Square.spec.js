import React from 'react';
import { shallow } from 'enzyme';

import Square from './index';

describe('Square component', () => {

  const square = {};

  const wrapper = shallow(<Square square={square} />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
