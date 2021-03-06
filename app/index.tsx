import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './app.global.css'
import { IPCProxy } from "./ipc/render"
import { replace, push } from 'react-router-redux'
import { startUp } from "./actions/app"
const mainProxy = new IPCProxy()
mainProxy.active()
const store = configureStore.configureStore()
store.dispatch(startUp())
require("./shortcut")
import { LocalShortCut } from "./ipc/local-shortcut"

render(
  <AppContainer>
    <Root store={store} history={configureStore.history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
