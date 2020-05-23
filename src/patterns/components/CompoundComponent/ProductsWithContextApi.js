import React, { Component, createContext } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import loadData from "./MockApi";

const ProductContext = createContext();

class ProductsWithContextApi extends Component {
  constructor(props) {
    super(props);
    this.onLoaddata = this.onLoaddata.bind(this);
    
    this.state = {
      error: false,
      isLoading: false,
      data: [],
      onLoaddata: this.onLoaddata, //Add onLoad function to state to make it possible to pass state to provider
    };

  }

  static ERROR = ({ children }) => (
    <ProductContext.Consumer>
      {({ error }) => (error ? <div>{children}</div> : null)}
    </ProductContext.Consumer>
  );

  static LOADING = ({ children }) => (
    <ProductContext.Consumer>
      {({ isLoading }) => (isLoading ? <div>{children}</div> : null)}
    </ProductContext.Consumer>
  );

  static BUTTON = () => (
    <ProductContext.Consumer>
      {({ onLoaddata, isLoading }) => (
        <Button variant="contained" color="primary" onClick={onLoaddata}>
          {isLoading ? "Loading..." : "Load Data"}
        </Button>
      )}
    </ProductContext.Consumer>
  );

  static RESULTS = ({ data }) => (
    <ProductContext.Consumer>
      {({ data }) => (
        <div>
          <List>
            {data.map((d, k) => (
              <ListItem key={k}>
                <ListItemText primary={d.name} secondary="Jan 9, 2014" />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </ProductContext.Consumer>
  );

  onLoaddata() {
    this.setState({ isLoading: true, data: [] });
    loadData()
      .then((d) => {
        this.setState({ data: d, isLoading: false });
      })
      .catch((e) => {
        this.setState({ error: true, isLoading: false });
      });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {/*  <ProductContext.Provider
          value={{
            error: this.state.error,
            isLoading: this.state.isLoading,
            onLoaddata: this.onLoaddata,
            data: this.state.data,
          }}

          If we pass Value as object above, every render will trigger rerender in child so to avoid it we pass scope
        > */}
        <ProductContext.Provider value={this.state}>
          {children}
        </ProductContext.Provider>
      </div>
    );
  }
}

export default ProductsWithContextApi;
