import React from 'react';

const HomeView = ({content}) => (
  <div>
    {content && <h1>{content}</h1>}
    <p>Some other content</p>
    <p>Test how comitizen works with lerna</p>
  </div>
);

export default HomeView;
