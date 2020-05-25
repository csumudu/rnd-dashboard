import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Summary from "../components/Summay/Summary";
import { Button } from "@material-ui/core";

const classes = {
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
    textAlign: "center",
  },
};

const url = "http://localhost:3000/api.json"; //"https://api.covid19api.com/summary";

class CovidDashboard extends Component {
  state = {
    summary: [],
    counter: 0,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const t = data.Countries;
        this.setState({ summary: t });
      });
  };

  render() {
    return (
      <div style={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={classes.paper}>
              <Button
                color="primary"
                variant="contained"
                onClick={this.loadData}
              >
                Refresh
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper style={classes.paper}>
              <Summary data={this.state.summary} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper style={classes.paper}>xs=6 sm=3</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default CovidDashboard;
