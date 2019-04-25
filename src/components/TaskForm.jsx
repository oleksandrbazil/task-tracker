import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startTask, renameTask, finishTask } from '../actions/tasks';
import { withStyles } from '@material-ui/core/es/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

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
  circle: {
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

class TaskForm extends React.Component {
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
      finishTask();
    } else {
      startTask();
    }
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
    this.props.renameTask({ name });
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

          <FormControl className={classes.circle}>
            <div>{start || '00:00:00'}</div>
            <Input type="hidden" name="time" id="time" value={start} disabled />
          </FormControl>

          <Button type="submit">{start ? 'Stop' : 'Start'}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.tasks.current.name,
  start: state.tasks.current.start,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startTask,
      renameTask,
      finishTask,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TaskForm)
);
