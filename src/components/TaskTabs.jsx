import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TasksLog from './TasksLog';
import TasksChart from './TasksChart';

class TaskTabs extends React.Component {
  handleChangeTab(event, value) {
    this.props.history.push(value);
  }

  render() {
    const {
      history: {
        location: { pathname, hash },
      },
    } = this.props;

    // define available tab routes
    const tabRoutes = {
      log: '/',
      chart: '/#chart',
    };

    // Catch invalid tab routes
    const currentTab =
      pathname + hash === tabRoutes.chart ? tabRoutes.chart : tabRoutes.log;

    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={currentTab}
            onChange={(event, value) => this.handleChangeTab(event, value)}
          >
            <Tab label="Tasks Log" value={tabRoutes.log} />
            <Tab label="Tasks chart" value={tabRoutes.chart} />
          </Tabs>
          {currentTab === tabRoutes.log && <TasksLog />}
          {currentTab === tabRoutes.chart && <TasksChart />}
        </AppBar>
      </div>
    );
  }
}

export default withRouter(TaskTabs);
