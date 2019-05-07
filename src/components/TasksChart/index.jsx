import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { generateTasks } from '../../redux/modules/tasks';
import buildChartData from '../../utilities/buildChartData';
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

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlayMode: false,
      generateOneByOne: false,
      data: [],
      bars: [],
    };
  }

  componentDidMount() {
    const { tasks } = this.props;
    this.rebuildData(tasks);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      this.rebuildData(nextProps.tasks);
    }
  }

  toggleOverlayMode() {
    const { overlayMode } = this.state;
    const { tasks } = this.props;
    this.setState({ overlayMode: !overlayMode }, () => this.rebuildData(tasks));
  }

  rebuildData(tasks) {
    const { overlayMode } = this.state;
    const { data, bars } = buildChartData(tasks, overlayMode);
    this.setState({
      data,
      bars,
    });
  }

  render() {
    const { overlayMode, data, bars, generateOneByOne } = this.state;
    const { generateTasks } = this.props;

    return (
      <div ref={this.rootEl}>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 60]} />
            <Tooltip />
            <Legend legendType="circle" />
            {bars.map(({ id, stackId, fill }) => (
              <Bar key={id} dataKey={id} stackId={stackId} fill={fill} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        <div>
          <div style={{ float: 'right' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={generateOneByOne}
                  onChange={() =>
                    this.setState({ generateOneByOne: !generateOneByOne })
                  }
                />
              }
              label={'generateOneByOne'}
            />
            <Button onClick={() => generateTasks(generateOneByOne)}>
              GENERATE
            </Button>
          </div>

          <FormControlLabel
            control={
              <Checkbox
                checked={overlayMode}
                onChange={() => this.toggleOverlayMode()}
              />
            }
            label={'OVERLAY mode'}
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
  tasks: state.tasks,
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
