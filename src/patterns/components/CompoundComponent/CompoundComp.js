import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import ProductsRenderProps from "./ProductsRenderProps";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ProductsWithContextApi from "./ProductsWithContextApi";
import ProductsWithHooks from "./ProductsWithHooks";

class CompoundComp extends Component {
  render() {
    return (
      <div>
        <Paper style={{ padding: 30 }}>
          <h3>Compound component Pattern</h3>
          <p>
            Implecitly share internal state to user and allow them to have more
            control over rendering and abstracting internal state information
          </p>
          <div>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Class Component with Render Prrops
                </Typography>
                <ProductsRenderProps>
                  <ProductsRenderProps.BUTTON></ProductsRenderProps.BUTTON>
                  <ProductsRenderProps.ERROR>
                    Error Occured
                  </ProductsRenderProps.ERROR>
                  <ProductsRenderProps.LOADING>
                    Please wait...
                  </ProductsRenderProps.LOADING>
                  <ProductsRenderProps.RESULTS></ProductsRenderProps.RESULTS>
                </ProductsRenderProps>
              </CardContent>
            </Card>
          </div>

          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Class Component with context api
                </Typography>
                <p>
                  By using context api inside the component we can give extra
                  fecibility to allow user to nest static component props
                </p>
                <ProductsWithContextApi>
                  {/* 
                    Nesting is possible since component use context api
                    */}
                  <div style={{ padding: "10px", border: "solid 1px gray" }}>
                    <ProductsWithContextApi.BUTTON></ProductsWithContextApi.BUTTON>
                  </div>
                  <ProductsWithContextApi.ERROR>
                    Error Occured
                  </ProductsWithContextApi.ERROR>
                  <ProductsWithContextApi.LOADING>
                    Please wait...
                  </ProductsWithContextApi.LOADING>
                  <ProductsWithContextApi.RESULTS></ProductsWithContextApi.RESULTS>
                </ProductsWithContextApi>
              </CardContent>
            </Card>
          </div>

          <div style={{ paddingTop: 10 }}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Functional Component
                </Typography>

                <ProductsWithHooks>
                  <ProductsWithHooks.BUTTON></ProductsWithHooks.BUTTON>
                  <ProductsWithHooks.ERROR>
                    Error Occured
                  </ProductsWithHooks.ERROR>
                  <ProductsWithHooks.LOADING>
                    Please wait...
                  </ProductsWithHooks.LOADING>
                  <ProductsWithHooks.RESULTS></ProductsWithHooks.RESULTS>
                </ProductsWithHooks>
              </CardContent>
            </Card>
          </div>
        </Paper>
      </div>
    );
  }
}

export default CompoundComp;
