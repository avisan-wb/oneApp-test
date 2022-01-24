import React from 'react';
import { shallow } from 'enzyme';
import HomeView from '../../src/components/HomeView';

describe('HomeView should render as expected', () => {
  it('module should render correct JSX', () => {
    const renderedModule = shallow(<HomeView />);
    expect(renderedModule.find('div')).toMatchSnapshot();
  });
});
