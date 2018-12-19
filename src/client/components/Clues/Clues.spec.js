import React from 'react';
import { shallow } from 'enzyme';

import Clues from './index';

describe('Clues component', () => {

  const clues = { across: {}, down: {} };

  const wrapper = shallow(<Clues clues={clues} />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
