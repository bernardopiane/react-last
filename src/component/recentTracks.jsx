import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
import axios from "axios";

export class RecentTracks extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { user: props.user };
  }

  //   state = {
  //     user: null,
  //     recentTracks: null
  //   };

  getRecentTracks = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
          this.state.user.name +
          "&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&extended=1&limit=5"
      )
      .then(response => {
        console.log(response.data.recenttracks.track);
        this.setState({ recentTracks: response.data.recenttracks.track });
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  componentDidMount(props) {
    console.log(props);
    // this.setState({ user: props.user });

    this.getRecentTracks();
  }

  render() {
    return (
      <div>
        <List>
          {this.state.recentTracks &&
            this.state.recentTracks.map(item => (
              <ListItem key={item.name + item.artist["#text"]} dense button>
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
                  secondary={item.album["#text"]}
                />
              </ListItem>
            ))}
        </List>
      </div>
    );
  }
}
