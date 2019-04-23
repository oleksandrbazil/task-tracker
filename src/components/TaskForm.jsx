import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCurrentTask, addTask } from '../actions/tasks';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const initialState = {
  name: '',
  start: '',
};

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    // We would like to restore current task from LocalStore after user returns
    // const { current: { name, start } } = this.props;
    // if (name || start) {
    //   this.setState({ name, start });
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { start } = this.state;
    if (start) {
      this.finishTask();
    } else {
      this.startTask();
    }
  }

  startTask() {
    // 1. Prepare task data
    // start - we want to handle date format as numbers, so use "+"
    const start = +new Date();
    const { name } = this.state;

    // 2. Update Redux Store
    this.props.setCurrentTask({ start });

    // 3. Update component state
    this.setState({ start, name });
  }

  finishTask() {
    // 1. Prepare task data
    const end = +new Date();
    const { name, start } = this.state;

    // 2. Update Redux Store
    this.props.addTask({
      name,
      start,
      end,
    });

    // 3. Reset component state
    this.setState(initialState);
  }

  handleOnChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const { name, start } = this.state;

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <Input
              type="text"
              name="name"
              id="name"
              value={name}
              placeholder="Name of your task"
              onChange={e => this.handleOnChange(e)}
            />
          </div>

          <div>
            <Input
              type="text"
              name="time"
              id="time"
              value={start}
              placeholder={'00:00:00'}
              disabled
            />
          </div>

          <Button type="submit"> {start ? 'stop' : 'start'}</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  current: state.tasks.current,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentTask,
      addTask,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskForm);
