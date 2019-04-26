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

const GOLDEN_RATIO = 1.61;

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
    this.rootEl = React.createRef();
    this.rootElWidth = 800;
  }

  componentDidMount() {
    // try to setup root width
    this.rootElWidth = this.rootEl.current.offsetWidth;
  }

  getChartHeight() {
    // according to the Golden Ration rule (height = 100%, width = 161%)
    return this.rootElWidth / GOLDEN_RATIO;
  }

  render() {
    const { tasks } = this.props;
    const data = new DataItems(tasks).data;
    return (
      <div ref={this.rootEl}>
        <ResponsiveContainer width="100%" height={this.getChartHeight()}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <XAxis dataKey="tasks" />
            <YAxis />
            <Tooltip />
            <Legend legendType="circle" />
            {tasks.map(task => (
              <Bar
                key={task.id}
                dataKey={task.name}
                stackId="all"
                fill={generateColor()}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.list,
});
export default connect(mapStateToProps)(TasksChart);
