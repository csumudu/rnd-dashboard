import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import loadData from "./MockApi";

class ProductsRenderProps extends Component {
  state = {
    error: false,
    isLoading: false,
    data: [],
  };

  static ERROR = ({ error, children }) =>
    error ? <div>{children}</div> : null;

  static LOADING = ({ isLoading, children }) =>
    isLoading ? <div>{children}</div> : null;

  static BUTTON = ({ isLoading, onLoaddata }) => (
    <Button variant="contained" color="primary" onClick={onLoaddata}>
      {isLoading ? "Loading..." : "Load Data"}
    </Button>
  );

  static RESULTS = ({ data }) => (
    <div>
      <List>
        {data.map((d, k) => (
          <ListItem key={k}>
            <ListItemText primary={d.name} secondary="Jan 9, 2014" />
          </ListItem>
        ))}
      </List>
    </div>
  );

  onLoaddata = () => {
    this.setState({ isLoading: true, data: [] });
    loadData()
      .then((d) => {
        this.setState({ data: d, isLoading: false });
      })
      .catch((e) => {
        this.setState({ error: true,isLoading:false });
      });
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        {React.Children.map(children, (childElement) => {
          return React.cloneElement(childElement, {
            error: this.state.error,
            isLoading: this.state.isLoading,
            onLoaddata: this.onLoaddata,
            data: this.state.data,
          });
        })}
      </div>
    );
  }
}

export default ProductsRenderProps;
