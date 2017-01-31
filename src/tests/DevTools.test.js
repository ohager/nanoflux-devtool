import React from 'react';
import Renderer from 'react-test-renderer';
import DevTools from '../DevTools'
import FusionAdapter from '../FusionAdapter'

it('Renders initial DevTools', () => {
  const tree = Renderer.create(<DevTools storeAdapter={new FusionAdapter()}/>).toJSON();
  expect(tree).toMatchSnapshot();
});
