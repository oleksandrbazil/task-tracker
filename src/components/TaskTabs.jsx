import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TasksLog from './TasksLog';
import TasksChart from './TasksChart';

class TaskTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tab: 0 };
  }

  handleChangeTab(event, tab) {
    this.setState({ tab });
  }

  render() {
    const { tab } = this.state;
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={tab}
            onChange={(event, tab) => this.handleChangeTab(event, tab)}
          >
            <Tab label="Tasks Log" />
            <Tab label="Tasks chart" />
          </Tabs>
          {tab === 0 && <TasksLog />}
          {tab === 1 && <TasksChart />}
        </AppBar>
      </div>
    );
  }
}

export default TaskTabs;
