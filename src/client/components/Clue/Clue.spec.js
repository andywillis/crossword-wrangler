import React from 'react';
import { shallow } from 'enzyme';

import Clue from './index';

describe('Clue component', () => {

  const wrapper = shallow(<Clue />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
