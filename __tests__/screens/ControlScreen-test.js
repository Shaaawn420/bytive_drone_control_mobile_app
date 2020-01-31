import React from 'react';
import renderer from 'react-test-renderer';

import ControlScreen from '../../screens/ControlScreen';

describe('ControlScreen', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ControlScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});