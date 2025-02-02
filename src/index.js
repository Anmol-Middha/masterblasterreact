import React from 'react';
import ReactDOM from 'react-dom';

// importing css and bootstrap css
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Rendering App Component 
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
