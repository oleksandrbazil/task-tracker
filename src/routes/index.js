import { Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from './HomePage';
import TaskPage from './TaskPage';

export default () => (
  <div>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/tasks" component={TaskPage} />
      <Route render={() => <div>Page Not Found</div>} />
    </Switch>
  </div>
);
