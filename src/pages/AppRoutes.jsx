import { Route, Switch } from 'react-router-dom';
import React from 'react';
import HomePage from './HomePage';
import TaskPage from './TaskPage';
import PageNotFound from './PageNotFound';
import TaskForm from '../components/TaskForm';
import tabs from '../components/TaskTabs/tabs';

const tabPaths = tabs.map(item => item.path);

export default () => (
  <div>
    <TaskForm />
    <Switch>
      <Route path={tabPaths} exact component={HomePage} />
      <Route path="/tasks" component={TaskPage} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);
