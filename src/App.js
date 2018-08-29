import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Home } from "./component/home";
import "typeface-roboto";
import { TrackInfo } from "./component/trackInfo";

// import { Divider } from "@material-ui/core";

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <Router>
        <div className="w-100">
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer("left", false)}
            onOpen={this.toggleDrawer("left", true)}
          >
            <div
              className="Drawer"
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("left", false)}
              onKeyDown={this.toggleDrawer("left", false)}
            >
              <List component="nav">
                <Link to="/">
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </Link>
                <Link to="/about">
                  <ListItem button>
                    <ListItemText primary="Spam" />
                  </ListItem>
                </Link>
              </List>
            </div>
          </SwipeableDrawer>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer("left", true)} />
              </IconButton>
              <Typography variant="title" color="inherit">
                Home
              </Typography>
              <Button color="inherit" className="appbar-right" onClick={Logout}>
                {localStorage.getItem("user") ? "Logout" : "Login"}
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={24} justify="center" className="w-100">
            <Grid item xs={12} className="w-100">
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/track/:artist/:name" component={TrackInfo} />
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

function Logout() {
  localStorage.clear("user");
  localStorage.clear("name");
  window.location.href = "/";
}

export default App;
