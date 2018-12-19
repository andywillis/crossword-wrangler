import React from 'react';
import { shallow } from 'enzyme';

import ClueSet from './index';

describe('ClueSet component', () => {

  const wrapper = shallow(<ClueSet />);

  it('the component is rendered', () => {
    expect(wrapper).not.toBe(undefined);
  });

});
