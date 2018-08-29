import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
// import TrackInfo from "./trackInfo";
import { Link } from "react-router-dom";
import axios from "axios";

export class TopTracks extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { user: props.user };
  }

  gettopTracks = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" +
          this.state.user.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&period=1month&limit=6"
      )
      .then(response => {
        console.log(response.data.toptracks.track);
        this.setState({ topTracks: response.data.toptracks.track });
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  componentDidMount(props) {
    console.log(props);
    // this.setState({ user: props.user });
    this.gettopTracks();
  }

  render() {
    return (
      <div>
        <List>
          {this.state.topTracks &&
            this.state.topTracks.map(item => (
              <Link
                key={item.name + item.artist["#text"]}
                to={`/track/${item.artist["name"]}/${item.name}/${item.mbid}`}
              >
                <ListItem dense button>
                  <img
                    alt={item.name}
                    src={
                      item.image[0]["#text"] !== ""
                        ? item.image[3]["#text"]
                        : ImgNotFound
                    }
                    style={{ height: "5rem" }}
                  />
                  <ListItemText
                    primary={item.name}
                    secondary={item.artist["name"]}
                  />
                </ListItem>
              </Link>
            ))}
        </List>
      </div>
    );
  }
}
