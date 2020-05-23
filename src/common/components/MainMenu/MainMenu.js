import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { mainMenu } from "../../libs/MenuProvider";
import Icon from "@material-ui/core/Icon";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";
import IconLoader from "../AsyncIcon/AsyncIconLoader";
import { Link } from "react-router-dom";

export class MainMenu extends Component {
  state = {
    menu: [],
  };

  componentDidMount() {
    const adapted =
      mainMenu &&
      mainMenu.map((m) => {
        return {
          id: m.id,
          name: m.name,
          icon: m.icon,
          path: m.path,
        };
      });

    this.setState({ menu: adapted });
  }

  render() {
    return (
      <div>
        {this.state.menu.map((m) => {
          return (
            <Link
              className="nav-lnk"
              to={m.path}
              key={m.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <IconLoader icon={m.icon} />
                </ListItemIcon>

                <ListItemText primary={m.name} />
              </ListItem>
            </Link>
          );
        })}
      </div>
    );
  }
}
