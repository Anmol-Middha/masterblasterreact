import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import ComparisonPage from '../Comparison';

import * as ROUTES from '../../constants/routes';

export default class index extends Component {
    render() {
        return (
            <Router>
                <Navigation/>
                <br />
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route exact path={ROUTES.COMPARISON} component = {ComparisonPage} />
            </Router>
        )
    }
}