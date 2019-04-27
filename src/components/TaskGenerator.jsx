import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateTasks } from '../actions/tasks';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    float: 'right',
  },
});

class TaskGenerator extends React.Component {
  generateTasks() {
    this.props.generateTasks();
  }
  render() {
    const { classes } = this.props;
    return (
      <Button className={classes.button} onClick={() => this.generateTasks()}>
        GENERATE
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      generateTasks,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(TaskGenerator)
);
