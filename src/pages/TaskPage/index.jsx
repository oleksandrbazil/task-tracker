import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Task from '../../components/TaskInfo';
import TaskNotFound from '../../components/TaskNotFound';

export default ({ match }) => {
  return (
    <div>
      <Button component={Link} to="/" color="secondary">
        Homepage
      </Button>
      <Switch>
        <Route exact path={`${match.url}/:taskId`} component={Task} />
        <Route component={TaskNotFound} />
      </Switch>
    </div>
  );
};
