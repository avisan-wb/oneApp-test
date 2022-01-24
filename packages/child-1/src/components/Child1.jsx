import React from 'react';
import { fromJS } from 'immutable';
// import { loadLanguagePack } from '@americanexpress/one-app-ducks';
// import { connect } from 'react-redux';

export const Child1 = ({moduleState}) => {
  const {users = []} = moduleState
  return (
    <div>
      <h2>And the list of users is:</h2> 
      {users.map(u => {
        return <div key={u.name}>
          <div>{u.name}</div>
          <div>{u.email}</div>
          <hr /> 
        </div>
      })}
    </div>
  )
};

const reducer = (state = fromJS({}), action) => {
  switch (action.type) {
    case 'LOADED_API': {
      return state.set('users', action.data);
    };
    case 'FAILED_API': 
      return state.set('users', []);
    default: return state;
  }
};

const loadModuleData = async ({ store, fetchClient, ownProps }) => {
  // store.dispatch(loadLanguagePack('child-1', { fallbackLocale: 'en-US' })) // This requires the component manual hookup to redux

  const {moduleState} = ownProps
  
  if (moduleState?.users?.length) {
    return;
  }

  try {
    const response = await fetchClient('https://jsonplaceholder.typicode.com/users');
    if (response.ok) {
      const data = await response.json();
      store.dispatch({ type: 'LOADED_API', data });
    } else {
      store.dispatch({ type: 'FAILED_API' });
    }
  } catch (e) {
    store.dispatch({ type: 'FAILED_API' });
  }
};

// export const mapStateToProps = (state) => {
//   const localeName = state.getIn(['intl', 'activeLocale']);
//   const languagePack = state.getIn(
//     ['intl', 'languagePacks', localeName, 'child-1'],
//     fromJS({})
//   ).toJS();

//   return {
//     languageData: languagePack && languagePack.data ? languagePack.data : {},
//     localeName,
//   };
// }

Child1.holocron = {
  name: 'child-1',
  loadModuleData,
  reducer,
};

// export default connect(mapStateToProps, null)(Child1);
export default Child1;
