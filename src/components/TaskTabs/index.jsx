import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TasksLog from '../TasksLog';
import TasksChart from '../TasksChart';
import tabs from './tabs';

const components = {
  default: TasksLog,
  TasksLog: TasksLog,
  TasksChart: TasksChart,
};

class Index extends React.Component {
  handleChangeTab(event, value) {
    event.preventDefault();
    const {
      history = {},
      location: { pathname },
    } = this.props;
    if (pathname !== value) {
      history.push(value);
    }
  }

  render() {
    const {
      location: { pathname },
    } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={pathname}
            onChange={(event, value) => {
              this.handleChangeTab(event, value);
            }}
            variant="fullWidth"
          >
            {tabs.map((item, index) => (
              <Tab
                key={`label_${index}`}
                label={item.label}
                value={item.path}
                fullWidth
              />
            ))}
          </Tabs>
        </AppBar>
        <Switch>
          {tabs.map((item, index) => (
            <Route
              key={`component_${index}`}
              path={item.path}
              exact
              component={components[item.component] || components.default}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Index);
