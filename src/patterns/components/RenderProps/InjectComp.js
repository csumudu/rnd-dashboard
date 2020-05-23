import React, { Component } from "react";
import { Button } from "@material-ui/core";

class InjectComp extends Component {
  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.props.toggle}>
          {this.props.checked ? "OFF" : "ON"}
        </Button>
      </div>
    );
  }
}

export default InjectComp;
