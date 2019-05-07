import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeTask } from '../../redux/modules/tasks';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { prettyTime, prettyTimeDiff } from '../../utilities/prettyTime';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ConfirmDialog from '../ConfirmDialog';

const styles = theme => ({
  button: {
    margin: '10px',
  },
});

const Index = ({ tasks, removeTask, classes }) => {
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
        <TableBody>
          {tasks.map((item, index) => {
            const { id, name, start, end } = item;
            return (
              <TableRow key={`row${index}`}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{prettyTime(start)}</TableCell>
                <TableCell>{prettyTime(end)}</TableCell>
                <TableCell>{prettyTimeDiff(start, end)}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/tasks/${id}`}>
                    Info
                  </Button>
                </TableCell>
                <TableCell>
                  <ConfirmDialog
                    className={classes.button}
                    btnText="Delete"
                    onAgree={() => removeTask({ id })}
                  />
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
  tasks: state.tasks,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeTask }, dispatch);

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Index)
);
