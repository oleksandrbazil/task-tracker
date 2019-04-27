import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Task from '../classes/Task';

const initialState = {
  end: '',
};

const styles = theme => ({
  root: {
    height: '200px',
    width: '200px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary['900'],
    margin: 20,
    fontSize: 30,
    boxShadow:
      '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  },
});

class TaskTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.timer = null;
  }

  componentDidMount() {
    if (this.props.start) {
      this.setTimer();
    }
  }

  componentWillUnmount() {
    this.unsetTimer();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.start) {
      this.setTimer();
    } else {
      this.unsetTimer();
    }
  }

  setTimer() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.setState({ end: new Date().getTime() });
      }, 1000);
    }
  }

  unsetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.setState(initialState);
  }

  render() {
    // We better to update just component state instead of updating each second Redux Store
    // That's why we get 'start' when 'end' from state
    const { classes, start } = this.props;
    const { end } = this.state;
    const taskItem = new Task({ start, end });
    return (
      <div className={classes.root}>
        <div>{taskItem.timeSpent}</div>
      </div>
    );
  }
}

export default withStyles(styles)(TaskTimer);
