import React, { Component } from "react";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Grid } from "@material-ui/core";

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
          "&format=json"
      )
      .then(response => {
        console.log(response.data);
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

  render() {
    return (
      <div>
        Track Info
        {this.state.trackInfo && (
          <Grid container>
            <Grid item xs={12} style={{ margin: "1em" }}>
              <Paper elevation={1}>
                <Typography variant="headline" component="h3">
                  This is a sheet of paper.
                </Typography>
                {this.state.trackInfo.name}
                <img
                  alt={this.state.trackInfo.name}
                  src={
                    this.state.trackInfo.album.image[0]["#text"] !== ""
                      ? this.state.trackInfo.album.image[3]["#text"]
                      : ImgNotFound
                  }
                  style={{ height: "5rem" }}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
