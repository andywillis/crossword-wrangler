import React from 'react';
import { shallow } from 'enzyme';

import Crossword from './index';

describe('Crossword component', () => {

  const wrapper = shallow(<Crossword />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
