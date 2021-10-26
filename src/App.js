
import Dashboard from './dashboard';
import {Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore,combineReducers } from "redux";
import userReducer from '../src/redux/reducers/users';

const rootReducer=combineReducers({
  users:userReducer
});

const store= createStore(rootReducer,{});
 
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard}/>
    </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
