import React, { Component } from "react";
import { Switch } from "@material-ui/core";

class SwithCompWithComponentInjectction extends Component {
  state = {
    checked: false,
  };

  handleChange = () => {
    this.setState((s) => {
      this.props.onToggle && this.props.onToggle(!s.checked);
      return { ...s, checked: !s.checked };
    });
  };

  toggle = () => {
    this.setState(
      (s) => ({ ...s, checked: !s.checked }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.checked);
      }
    );
  };

  render() {
    return (
      <div>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        {React.cloneElement(this.props.children, {
          checked: this.state.checked,
          toggle: this.toggle,
        })}
      </div>
    );
  }
}

export default SwithCompWithComponentInjectction;
