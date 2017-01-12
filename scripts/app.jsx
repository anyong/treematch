const React = require('react');
const ReactDOM = require('react-dom');
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;
const Provider = require('react-redux').Provider;
const thunkMiddleware = require('redux-thunk').default;

const gameReducer = require('./redux/reducers');
const Game = require('./components/Game');

const store = createStore(
    gameReducer,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <Game/>
    </Provider>,
    document.getElementById('namegame')
);
