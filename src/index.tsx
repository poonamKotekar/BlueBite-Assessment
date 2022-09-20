import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from "react-router-dom";

const Root = () => (
    <div>
        <Link to="/new-york">New York</Link><br />
        <Link to="/chicago">Chicago</Link><br />
        <Link to="/san-francisco">San Francisco</Link>
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Root />
                </Route>
                <Route path="/:id" >
                    <App />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
