import React from 'react';
import { shallow } from 'enzyme';

import Clues from './index';

describe('Clues component', () => {

  const wrapper = shallow(<Clues />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
