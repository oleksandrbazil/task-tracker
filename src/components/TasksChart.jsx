import React from 'react';
import { connect } from 'react-redux';
import {
  BarChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import DataItems from '../classes/DataItems';
import TaskGenerator from './TaskGenerator';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const generateColor = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .substr(-6)
  );
};

class TasksChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simultaneous: false,
    };
  }

  render() {
    const { simultaneous } = this.state;
    const { tasks } = this.props;
    const dataItems = new DataItems(tasks);
    const data = simultaneous
      ? dataItems.getSimultaneousData
      : dataItems.getData;

    return (
      <div ref={this.rootEl}>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" domain={[0, 60]} />
            <YAxis />
            <Tooltip />
            <Legend legendType="circle" />
            {tasks.map(task => (
              <Bar
                key={task.id}
                dataKey={task.name}
                stackId={!simultaneous ? `taskOneByOne` : null}
                fill={generateColor()}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div>
          <TaskGenerator />
          <FormControlLabel
            control={
              <Checkbox
                checked={simultaneous}
                onChange={() => {
                  this.setState({ simultaneous: !simultaneous });
                }}
              />
            }
            label={'Simultaneous tasks'}
          />
          <div style={{ maxWidth: '700px' }}>
            <p>
              Трекер разработан на основе предпосылки что в определенный момент
              времени может выполняться только 1 задача. По этому, в построенном
              графике не может быть более 60 минут в 1 часе.
            </p>
            <p>
              В тоже время, генератор случайных задач не учитывает временные
              наложения задач между собой при построении массива. Это может
              создать ситуацию при которой 2 задачи выполняються одновременно.
            </p>
            <p>
              В этом случае необходимо включить "simultaneous" мод, он поможет
              увидеть наложения задач.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.list,
});
export default connect(mapStateToProps)(TasksChart);
