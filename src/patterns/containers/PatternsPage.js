import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
import CompoundComp from "../components/CompoundComponent/CompoundComp";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import RenderProps from "../components/RenderProps/RenderProps";
import ControlledComponent from "../components/ControlledComponent/ControlledComponent";

const btnCol = [
  {
    name: "Compound Component",
    path: "/patterns/compound",
    component: CompoundComp,
  },
  {
    name: "Render Props",
    path: "/patterns/render-props",
    component: RenderProps,
  },
  {
    name: "Controlled Components",
    path: "/patterns/controlled-components",
    component: ControlledComponent,
  },
];

class PatternsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/patterns/compound",
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props.history);
    return {
      selected:
        props.history.location.pathname === "/patterns"
          ? "/patterns/compound"
          : props.history.location.pathname,
    };
  }

  handleMenuItemClick = (path) => {
    this.setState({ selected: path });
    const { history } = this.props;
    history.push(path);
  };

  render() {
    return (
      <div>
        <div>
          <Grid container spacing={1}>
            {btnCol.map(({ name, path }, k) => (
              <Grid key={k} item xs={12} lg={3}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color={this.state.selected === path ? "primary" : "default"}
                  onClick={(e) => this.handleMenuItemClick(path)}
                >
                  {name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </div>
        <div style={{ padding: "20px 0px" }}>
          {btnCol.map(({ path, component: Comp }, k) => (
            <Route key={k} path={path} render={() => <Comp />} />
          ))}
          <Route exact path="/patterns">
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

export default withRouter(PatternsPage);
