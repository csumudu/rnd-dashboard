import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import BasicMain from "../components/Basic/BasicMain";
import WithAxis from "../components/WithAxis/WithAxis";
import WithColor from "../components/WithColor/WithColor";
import LineChartBasic from "../components/LineChartBasic/LineChartBasic";
import RadialChart from "../components/RadialChart/RadialChart";
import PiChart from "../components/PiChart/PiChart";
import SkillsMapWithCircles from "../components/SkillsMapWithCircles/SkillsMapWithCircles";
import Grid from "@material-ui/core/Grid";

const btnCol = [
  {
    name: "Basic",
    path: "/data-viz/basic",
    component: BasicMain,
  },
  {
    name: "Barchart With Axis",
    path: "/data-viz/with-axis",
    component: WithAxis,
  },
  {
    name: "Barchart With Color",
    path: "/data-viz/with-color",
    component: WithColor,
  },
  {
    name: "Line Chart",
    path: "/data-viz/line-chart",
    component: LineChartBasic,
  },
  {
    name: "PI Chart",
    path: "/data-viz/pi-chart",
    component: PiChart,
  },
  {
    name: "Radial Chart",
    path: "/data-viz/radial-chart",
    component: RadialChart,
  },
  {
    name: "Skill Map",
    path: "/data-viz/skill-map",
    component: SkillsMapWithCircles,
  },
];

class DataVizPage extends Component {
  state = {
    selected: "/data-viz/basic",
  };

  static getDerivedStateFromProps(props, state) {
    console.log(props.history);
    return {
      selected:
        props.history.location.pathname === "/data-viz"
          ? "/data-viz/basic"
          : props.history.location.pathname,
    };
  }

  clickHaandler = (path) => {
    this.setState({ selected: path });
    this.props.history.push(path);
  };

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          {btnCol.map(({ name, path }, k) => (
            <Grid key={k} item xs={12} lg={2}>
              <Button
                style={{ width: "100%" }}
                variant="contained"
                color={this.state.selected === path ? "primary" : "default"}
                onClick={(e) => this.clickHaandler(path)}
              >
                {name}
              </Button>
            </Grid>
          ))}
        </Grid>

        <div style={{ padding: "20px 0px" }}>
          {btnCol.map(({ path, component: Comp }, k) => (
            <Route key={k} path={path} render={() => <Comp />} />
          ))}
          <Route exact path="/data-viz">
            {btnCol
              .filter((f, i) => i === 0)
              .map(({ path, component: Comp }, k) => (
                <Comp key={k} />
              ))}
          </Route>
        </div>
      </div>
    );
  }
}

export default withRouter(DataVizPage);
