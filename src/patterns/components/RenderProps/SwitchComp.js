import React, { Component } from "react";
import { Switch } from "@material-ui/core";

class SwitchComp extends Component {
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
        {this.props.children({
          checked: this.state.checked,
          toggle: this.toggle,
        })}
      </div>
    );
  }
}

export default SwitchComp;
