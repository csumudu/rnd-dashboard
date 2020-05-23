import React, { useState, Component, createContext, useContext } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import loadData from "./MockApi";

const ProductContext = createContext();

const ProductsWithHooks = ({ children }) => {
  const onLoaddata = () => {
    setStateObj((s) => ({ ...s, isLoading: true, data: [] }));
    loadData()
      .then((d) => {
        setStateObj((s) => ({ ...s, data: d, isLoading: false }));
      })
      .catch((e) => {
        setStateObj((s) => ({ ...s, error: true, isLoading: false }));
      });
  };

  const [stateObj, setStateObj] = useState({
    error: false,
    isLoading: false,
    data: [],
    onLoaddata,
  });

  return (
    <div>
      <ProductContext.Provider value={stateObj}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

const ERROR = ({ children }) => {
  const ctx = useContext(ProductContext);
  return ctx.error ? <div>{children}</div> : null;
};

const LOADING = ({ children }) => {
  const ctx = useContext(ProductContext);
  return ctx.isLoading ? <div>{children}</div> : null;
};

const BUTTON = () => {
  const ctx = useContext(ProductContext);
  return (
    <Button variant="contained" color="primary" onClick={ctx.onLoaddata}>
      {ctx.isLoading ? "Loading..." : "Load Data"}
    </Button>
  );
};

const RESULTS = () => {
  const ctx = useContext(ProductContext);
  return (
    <div>
      <List>
        {ctx.data.map((d, k) => (
          <ListItem key={k}>
            <ListItemText primary={d.name} secondary="Jan 9, 2014" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

ProductsWithHooks.ERROR = ERROR;
ProductsWithHooks.LOADING = LOADING;
ProductsWithHooks.BUTTON = BUTTON;
ProductsWithHooks.RESULTS = RESULTS;

export default ProductsWithHooks;
