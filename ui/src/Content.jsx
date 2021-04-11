import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';

const NotFound = () => <h4>404: Page Not Found</h4>

const Content = () => {
    return (
        <>
            <Switch>
                <Redirect exact from="/" to="/issues" />
                <Route path="/issues" component={IssueList} />
                <Route path="/edit/:id" component={IssueEdit} />
                <Route path="/report" component={IssueReport} />
                <Route component={NotFound} />
            </Switch>
        </>
    )
}

export default Content;
