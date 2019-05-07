import React from 'react';
import { connect } from 'react-redux';
import { prettyTime, prettyTimeDiff } from '../../utilities/prettyTime';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import TaskNotFound from '../TaskNotFound';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    display: 'block',
    width: 200,
  },
});

export const Index = ({ classes, task }) => {
  if (!task) {
    return <TaskNotFound />;
  }
  const { id, name, start, end } = task;

  return (
    <div>
      <Typography variant="h4">Task Info</Typography>
      <form className={classes.container}>
        <FormControl className={classes.formControl}>
          <TextField id="id" label="ID" type="text" value={id} disabled />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel>Name</FormLabel>
          <TextField id="name" label="Name" type="text" value={name} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel>
            <span>Started At: </span>
            {prettyTime(start)}
          </FormLabel>
          <TextField
            id="start"
            label="TimeStart"
            type="text"
            value={task.start}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel>
            <span>Finished At: </span>
            {prettyTime(end)}
          </FormLabel>
          <TextField
            id="end"
            label="TimeEnd"
            type="text"
            value={task.end}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <FormLabel>
            <span>Spent: </span>
            {prettyTimeDiff(start, end)}
          </FormLabel>
        </FormControl>
      </form>
    </div>
  );
};

const mapStateToProps = (
  state,
  {
    match: {
      params: { taskId },
    },
  }
) => {
  return {
    task: state.tasks.find(task => task.id === parseInt(taskId)),
  };
};
export default withStyles(styles)(connect(mapStateToProps)(Index));
