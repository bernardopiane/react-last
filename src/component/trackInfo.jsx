import React, { Component } from "react";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Grid, Button } from "@material-ui/core";
import SimilarTrack from "./similarTrack";

export class TrackInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props.match.params);
    this.state = {
      artist: props.match.params.artist,
      name: props.match.params.name
    };
  }

  getInfo = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=" +
          this.state.artist +
          "&track=" +
          this.state.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&autocorrect=1"
      )
      .then(response => {
        console.log(response.data.track);
        this.setState({ trackInfo: response.data.track });
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  componentDidMount(props) {
    this.getInfo();
  }

  changeState = (artist, name) => {
    return new Promise((resolve, reject) => {
      this.setState({
        artist: artist,
        name: name
      });
      resolve();
    });
  };

  componentWillReceiveProps(props) {
    // this check makes sure that the getDashboardStats action is not getting called for other prop changes
    // if(this.props.parkInfo !== nextProps.parkInfo){
    //      this.props.getDashboardStats()
    // }
    console.log(this.state.name);

    this.changeState(props.match.params.artist, props.match.params.name).then(
      () => {
        this.getInfo();
      }
    );
  }

  getSimilar = () => {
    return (
      <SimilarTrack
        trackInfo={this.state.trackInfo}
        artist={this.state.trackInfo.artist.name}
        name={this.state.trackInfo.name}
      />
    );
  };

  goBack = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Grid container justify="center" style={{ textAlign: "center" }}>
          {this.state.trackInfo ? (
            <Grid item xs={12} md={8} style={{ margin: "1em" }}>
              <Paper elevation={1} className="p-2">
                <Typography
                  variant="headline"
                  component="h3"
                  className="menu-text"
                >
                  Track Info
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <img
                      xs={12}
                      sm={4}
                      className="p-5"
                      alt={this.state.trackInfo.name}
                      src={
                        this.state.trackInfo.album === undefined
                          ? ImgNotFound
                          : this.state.trackInfo.album.image[0]["#text"] !== ""
                            ? this.state.trackInfo.album.image[3]["#text"]
                            : ImgNotFound
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={7} md={8}>
                    {this.state.trackInfo.name && (
                      <p>Song: {this.state.trackInfo.name}</p>
                    )}
                    {this.state.trackInfo.artist && (
                      <p>Artist: {this.state.trackInfo.artist.name}</p>
                    )}
                    {this.state.trackInfo.album && (
                      <p>Artist: {this.state.trackInfo.album.title}</p>
                    )}
                  </Grid>
                </Grid>
              </Paper>
              {this.getSimilar()}
            </Grid>
          ) : (
            <div>
              <Grid container className="w-100" justify="center">
                <Grid
                  item
                  xs={12}
                  style={{ margin: "1em", textAlign: "center" }}
                >
                  Track Not Found
                </Grid>
              </Grid>
            </div>
          )}
          <Grid item xs={12}>
            <Button
              type="submit"
              value="Submit"
              variant="outlined"
              onClick={this.goBack}
            >
              Go Back
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
