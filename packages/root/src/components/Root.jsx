import React from 'react';
import childRoutes from '../childRoutes';
import { RenderModule, composeModules } from 'holocron';
import { loadLanguagePack, updateLocale } from '@americanexpress/one-app-ducks';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';

import Header from './Header';

import styles from '../styles/main.css'

export function Root({ location, children, switchLanguage, languageData }) {

  const renderContent = () => {
    if (location.pathname === '/') { 
      return <RenderModule 
        moduleName="home-view" 
        props={{ content: languageData.title}} 
      />
    } else { 
      return (<div>
        {children}
      </div>)
    }
  }

  return (
    <div>
      <Header
        handleLanguageChange={switchLanguage}
      />
      <main className={styles.main}>
        {renderContent()} 
      </main>
    </div>)
};

// Read about childRoutes:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/Routing.md#childroutes
Root.childRoutes = childRoutes;

// Read about appConfig:
// https://github.com/americanexpress/one-app/blob/main/docs/api/modules/App-Configuration.md
/* istanbul ignore next */
if (!global.BROWSER) {
  // eslint-disable-next-line global-require
  Root.appConfig = require('../appConfig').default;
  // Root.appConfig = {
  //   corsOrigins: [/\jsonplaceholder.typicode.com/],
  // };
}

export const mapDispatchToProps = (dispatch) => ({
  switchLanguage: async ({ target }) => {
    await dispatch(updateLocale(target.value));
    await dispatch(loadLanguagePack('root', { fallbackLocale: 'en-US' }));
  },
});

export const loadModuleData = ({ store: { dispatch } }) => {
  dispatch(composeModules([{ name: 'home-view' }])); // This does not require hook up to redux
  dispatch(loadLanguagePack('root', { fallbackLocale: 'en-US' })) // This requires the component manual hookup to redux
};

export const mapStateToProps = (state) => {
  const localeName = state.getIn(['intl', 'activeLocale']);
  const languagePack = state.getIn(
    ['intl', 'languagePacks', localeName, 'root'],
    fromJS({})
  ).toJS();

  return {
    languageData: languagePack && languagePack.data ? languagePack.data : {},
    localeName,
  };
};

Root.holocron = {
  name: 'root',
  loadModuleData
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
