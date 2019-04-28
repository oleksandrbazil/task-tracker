import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TaskNotFound from '../TaskNotFound';
import Task from '../../classes/Task';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'block',
    width: 200,
  },
});

export const Index = ({
  classes,
  tasks,
  match: {
    params: { taskId },
  },
}) => {
  const task = tasks.find(t => t.id === parseInt(taskId));
  if (!task) {
    return <TaskNotFound />;
  }
  const { id, name, timeEnd, timeStart, timeSpent } = new Task(task);

  return (
    <div>
      <Typography variant="h4">Task Info</Typography>
      <form className={classes.container}>
        <TextField
          id="id"
          label="ID"
          type="text"
          value={id}
          className={classes.textField}
          disabled
        />
        <TextField
          id="name"
          label="Name"
          type="text"
          value={name}
          className={classes.textField}
        />
        <TextField
          id="start"
          label="TimeStart"
          type="text"
          value={timeStart}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="end"
          label="TimeEnd"
          type="text"
          value={timeEnd}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="spent"
          label="TimeSpent"
          type="text"
          value={timeSpent}
          className={classes.textField}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  tasks: state.tasks.list,
});
export default withStyles(styles)(connect(mapStateToProps)(Index));
