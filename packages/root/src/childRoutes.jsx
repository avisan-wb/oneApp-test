import React from 'react';
import { Route } from '@americanexpress/one-app-router';
import ModuleRoute from 'holocron-module-route';

const childRoutes = () => [
  <Route path="/" />,
  <ModuleRoute
    path="child-1"
    moduleName="child-1"
  />,
];

// const childRoutes = (store) => {
//   const state = store.getState();
//   debugger;
//   return [
//     <Route path="/" />,
//     <ModuleRoute
//       path="child-1"
//       moduleName="child-1"
//     />,
//   ];
// } 

export default childRoutes;
