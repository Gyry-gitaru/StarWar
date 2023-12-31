import React from 'react';
import { Provider } from "react-redux";
import { store } from "./store/store";
import PeopleList from './components/PeopleList/PeopleList';

function App() {
  return (

  <Provider store={store}>
    < PeopleList / >
  </Provider>

  );
}

export default App;
