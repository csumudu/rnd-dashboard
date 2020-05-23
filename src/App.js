import React, { useState } from "react";
import clsx from "clsx";
import appStyles from "./AppStyles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Badge,
  Typography,
  Drawer,
  Divider,
  List,
  CssBaseline,
  Container,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { MainMenu } from "./common/components/MainMenu/MainMenu";
import DashboardPage from "./dashboard/containers/DashboardPage";
import CategoriesPage from "./categories/containers/CategoriesPage";
import PatternsPage from "./patterns/containers/PatternsPage";
import DataVizPage from "./dataVisualization/containers/DataVizPage";

function App() {
  const classes = appStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainMenu />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/categories">
              <CategoriesPage />
            </Route>
            <Route path="/patterns">
              <PatternsPage />
            </Route>
            <Route path="/data-viz">
              <DataVizPage />
            </Route>
            <Route path="/">
              <DashboardPage />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
}

export default App;
