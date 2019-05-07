import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  startTask,
  updateTask,
  finishTask,
} from '../../redux/modules/currentTask';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TaskTimer from '../TaskTimer';

const initialState = {
  name: '',
};

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    textAlign: 'center',
    margin: 20,
  },
});

class Index extends React.Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      ...initialState,
      name,
    };
  }

  handleOnSubmit(e) {
    e.preventDefault();
    const { start, startTask, finishTask } = this.props;

    // try to save task name anyway
    this.renameTask();

    // select required action
    if (start) {
      finishTask({ callback: () => this.resetForm() });
    } else {
      startTask();
    }
  }
  resetForm() {
    this.setState(initialState);
  }

  handleOnChange(e) {
    // We could update right now currentTask in Redux Store,
    // but this will lead to running LocalStorage.saveState() method with JSON.stringify.
    // It's not a good idea because stringify is resource-intensive method
    this.setState({ name: e.target.value });
  }

  handleOnBlur() {
    this.renameTask();
  }

  renameTask() {
    const { name } = this.state;
    const { updateTask } = this.props;
    updateTask({ name });
  }

  render() {
    const { name } = this.state;
    const { start, classes } = this.props;

    return (
      <div className={classes.root}>
        <form onSubmit={e => this.handleOnSubmit(e)} className={classes.form}>
          <FormControl>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Name of your task"
              onChange={e => this.handleOnChange(e)}
              onBlur={() => this.handleOnBlur()}
            />
          </FormControl>

          <TaskTimer start={start} />

          <Button type="submit">{start ? 'Stop' : 'Start'}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.currentTask.name,
  start: state.currentTask.start,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startTask,
      finishTask,
      updateTask,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
