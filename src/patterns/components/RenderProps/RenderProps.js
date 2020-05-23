import React, { Component } from "react";
import SwitchComp from "./SwitchComp";
import { Button, Paper, CardContent, Card } from "@material-ui/core";
import SwithCompWithComponentInjectction from "./SwithCompWithComponentInjectction";
import InjectComp from "./InjectComp";
import InjectFunctionComp from "./InjectFunctionComp";

class RenderProps extends Component {
  state = {
    toggle: "",
  };

  onToggleHandler = (e) => {
    this.setState({ toggle: e });
  };
  render() {
    return (
      <Paper style={{ padding: 30 }}>
        <div>
          <h2>Render Props</h2>
          <p>
            Render props allow component to expose it's state to outside and
            provide morer flexibility for component users
          </p>
          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <h3>Render Props inject as children</h3>
                <div>
                  <SwitchComp onToggle={this.onToggleHandler}>
                    {({ checked, toggle }) => (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={toggle}
                      >
                        {checked ? "OFF" : "ON"}
                      </Button>
                    )}
                  </SwitchComp>
                </div>
                <div>Toggle is {this.state.toggle ? "ON" : "OFF"}</div>
              </CardContent>
            </Card>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <h3>
                  Render Props inject as Component Injection - Class component
                </h3>
                <div>
                  <SwithCompWithComponentInjectction
                    onToggle={this.onToggleHandler}
                  >
                    <InjectComp />
                  </SwithCompWithComponentInjectction>
                </div>
                <div>Toggle is {this.state.toggle ? "ON" : "OFF"}</div>
              </CardContent>
            </Card>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <h3>
                  Render Props inject component with explicit props passing
                </h3>
                <div>
                  <SwitchComp onToggle={this.onToggleHandler}>
                    {(props) => <InjectComp {...props} />}
                  </SwitchComp>
                </div>
                <div>Toggle is {this.state.toggle ? "ON" : "OFF"}</div>
              </CardContent>
            </Card>
          </div>
          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <h3>
                  Render Props inject as Component Injection - Function
                  component
                </h3>
                <div>
                  <SwitchComp onToggle={this.onToggleHandler}>
                    {/*  <InjectFunctionComp /> 
                   this doesnt work
                   if we want to pass like this we hv to use React.cloneElement
                   */}
                    {InjectFunctionComp}
                  </SwitchComp>
                </div>
                <div>Toggle is {this.state.toggle ? "ON" : "OFF"}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Paper>
    );
  }
}

export default RenderProps;
