import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeTask } from '../actions/tasks';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const TasksLog = ({ list, removeTask }) => {
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
          {list.map(({ id, name, start, end }, index) => (
            <TableRow key={`row${index}`}>
              <TableCell>{id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{start}</TableCell>
              <TableCell>{end}</TableCell>
              <TableCell>{start - end}</TableCell>
              <TableCell>
                <Button href={`/tasks/${id}`}>Info</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => removeTask({ id })}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksLog);
