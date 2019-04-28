import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Task from '../../classes/Task';
import { removeTask } from '../../actions/tasks';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: '10px',
  },
});

const Index = ({ list, removeTask, classes }) => {
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Time start</TableCell>
            <TableCell>Time end</TableCell>
            <TableCell>Time spend</TableCell>
            <TableCell>Info</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {list.map((item, index) => {
            const { id, name, timeStart, timeEnd, timeSpent } = new Task(item);
            return (
              <TableRow key={`row${index}`}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{timeStart}</TableCell>
                <TableCell>{timeEnd}</TableCell>
                <TableCell>{timeSpent}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/tasks/${id}`}>
                    Info
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className={classes.button}
                    onClick={() => removeTask({ id })}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = state => ({
  list: state.tasks.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeTask }, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
