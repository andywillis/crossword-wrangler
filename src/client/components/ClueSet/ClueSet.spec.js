import React from 'react';
import { shallow } from 'enzyme';

import ClueSet from './index';

describe('ClueSet component', () => {

  const type = 'across';
  const clues = [];

  const wrapper = shallow(<ClueSet type={type} clues={clues} />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
