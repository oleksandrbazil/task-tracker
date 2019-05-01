import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateTasks } from '../../actions/tasks';
import { buildData } from '../../utilities/buildData';
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const generateColor = () => {
  return (
    '#' +
    Math.random()
      .toString(16)
      .substr(-6)
  );
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayMode: false,
    };
  }

  render() {
    const { overlayMode } = this.state;
    const { tasks, generateTasks } = this.props;
    const data = buildData(tasks, overlayMode);

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
                dataKey={task.id}
                stackId={!overlayMode ? `taskOneByOne` : null}
                fill={generateColor()}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div>
          <Button style={{ float: 'right' }} onClick={() => generateTasks()}>
            GENERATE
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={overlayMode}
                onChange={() => {
                  this.setState({ overlayMode: !overlayMode });
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
              В этом случае задача которая накладываеться на другую задачу не
              будет показана на графике, для того что бы увидеть такую задачу
              нужно переключиться в "overlayMode" мод.
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      generateTasks,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
