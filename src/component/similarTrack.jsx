import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";

export class SimilarTrack extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      artist: props.trackInfo.artist.name,
      name: props.trackInfo.name
    };
  }

  getInfo = () => {
    console.log(this.props);
    this.setState({ artist: this.props.trackInfo.artist.name });
    this.setState({ name: this.props.trackInfo.artist.name });
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" +
          this.props.trackInfo.artist.name +
          "&track=" +
          this.props.trackInfo.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&autocorrect=1"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ SimilarTrack: response.data.similartracks.track });
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
    console.log(props);

    this.changeState(props.trackInfo.artist.name, props.trackInfo.name).then(
      () => {
        this.getInfo();
      }
    );
  }

  goBack = () => {
    console.log(this.props);
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <Grid container justify="center" style={{ textAlign: "center" }}>
          {this.state.SimilarTrack ? (
            <Grid item xs={12} style={{ marginTop: "1em" }}>
              <Paper elevation={1} className="p-2">
                <Typography
                  variant="headline"
                  component="h3"
                  className="menu-text"
                >
                  Similar Songs
                </Typography>
                <Grid container alignItems="center">
                  <List>
                    <Carousel showThumbs={false} showIndicators={false}>
                      {this.state.SimilarTrack ? (
                        this.state.SimilarTrack.map(item => (
                          <Link
                            key={item.name + item.artist.name}
                            artist={item.artist.name}
                            name={item.name}
                            to={`/track/${item.artist.name}/${item.name}`}
                          >
                            <img
                              alt={item.name}
                              src={
                                item.image[0]["#text"] !== ""
                                  ? item.image[3]["#text"]
                                  : ImgNotFound
                              }
                              //   style={{ height: "5rem" }}
                            />
                            <p className="legend">{item.name}</p>
                          </Link>
                          // <Link
                          //   key={item.name + item.artist.name}
                          //   artist={item.artist.name}
                          //   name={item.name}
                          //   to={`/track/${item.artist.name}/${item.name}`}
                          // >
                          //   <ListItem dense button>
                          //     <img
                          //       alt={item.name}
                          //       src={
                          //         item.image[0]["#text"] !== ""
                          //           ? item.image[3]["#text"]
                          //           : ImgNotFound
                          //       }
                          //       style={{ height: "5rem" }}
                          //     />
                          //     <ListItemText
                          //       primary={item.name}
                          //       secondary={item.artist["name"]}
                          //     />
                          //   </ListItem>
                          // </Link>
                        ))
                      ) : (
                        <h4 style={{ textAlign: "center" }}>
                          Failed to retrieve
                        </h4>
                      )}
                    </Carousel>
                  </List>
                </Grid>
              </Paper>
            </Grid>
          ) : (
            <div>
              <Grid container className="w-100" justify="center">
                <Grid
                  item
                  xs={12}
                  style={{ margin: "1em", textAlign: "center" }}
                >
                  Similar songs not found
                </Grid>
              </Grid>
            </div>
          )}
        </Grid>
      </div>
    );
  }
}

export default SimilarTrack;
