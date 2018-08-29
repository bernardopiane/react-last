import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { RecentTracks } from "./recentTracks";

import axios from "axios";
import Button from "@material-ui/core/Button";
import { TopTracks } from "./topTracks";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user")),
      name: localStorage.getItem("name"),
      recentTracks: null,
      bgImage: null,
      notFound: false
    };
  }

  getProfile = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=" +
          this.state.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json"
      )
      .then(response => {
        // console.log(response);
        this.setState({ user: response.data.user });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("name", JSON.stringify(response.data.user.name));
        window.location.href = "/";
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  componentDidMount() {
    if (this.state.user) {
      this.getLatestAlbum();
    }
  }

  handleSubmit = event => {
    // alert("A name was submitted: " + this.state.name);
    this.setState({ user: null, recentTracks: null });
    this.getProfile();
    event.preventDefault();
  };

  handleChange = name => event => {
    this.setState({
      name: event.target.value
    });
  };

  getLatestAlbum = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" +
          this.state.user.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&limit=1&period=6month"
      )
      .then(response => {
        console.log(response.data);
        if (response.data.toptracks.track[0]["image"][3]["#text"]) {
          this.setState({
            bgImage:
              "url('" +
              response.data.toptracks.track[0]["image"][3]["#text"] +
              "')"
          });
        }
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  render() {
    return (
      <div>
        {this.state.user ? (
          <div
            style={{
              paddingTop: "5em",
              paddingBottom: "5em",
              backgroundImage: this.state.bgImage,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ padding: "1em" }}
            >
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3}>
                  <Grid
                    container
                    alignItems="center"
                    style={{ padding: "1em" }}
                  >
                    <Grid item xs={6} md={3}>
                      <Avatar
                        alt={this.state.user.realname}
                        src={this.state.user.image[3]["#text"]}
                        style={{ height: "8rem", width: "8rem" }}
                      />
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      <Typography variant="title" gutterBottom>
                        {this.state.user.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid container justify="center" className="p-2">
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    id="name"
                    label="Username"
                    margin="normal"
                    value={this.state.value}
                    onChange={this.handleChange("name")}
                    className="w-100"
                  />
                </Grid>
              </Grid>
              <Grid container justify="center" className="p-2">
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  style={{ textAlign: "center" }}
                >
                  <Button type="submit" value="Submit" variant="outlined">
                    Default
                  </Button>
                </Grid>
                {this.state.user === null && (
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <p>User Not Found</p>
                  </Grid>
                )}
              </Grid>
            </form>
          </div>
        )}
        {this.state.user && (
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={1} style={{ margin: "1em" }}>
                <Typography
                  variant="headline"
                  component="h3"
                  className="menu-text"
                >
                  Recent Tracks
                </Typography>
                <RecentTracks user={this.state.user} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={1} style={{ margin: "1em" }}>
                <Typography
                  variant="headline"
                  component="h3"
                  className="menu-text"
                >
                  Weekly Top Tracks
                </Typography>
                <TopTracks user={this.state.user} />
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
