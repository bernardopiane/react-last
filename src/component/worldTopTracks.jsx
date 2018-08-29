import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImgNotFound from "../img/notfound_placeholder.svg";
// import TrackInfo from "./trackInfo";
import { Link } from "react-router-dom";
import axios from "axios";

export class WorldTopTracks extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = { user: props.user };
  }

  getWorldTracks = () => {
    axios
      .get(
        "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
          process.env.REACT_APP_API +
          "&format=json&limit=5"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ WorldTracks: response.data.tracks.track });
      })
      .catch(error => {
        // console.log(error);
        console.log("Error Catched");
      });
  };

  componentDidMount(props) {
    this.getWorldTracks();
  }

  render() {
    return (
      <div>
        <List>
          {this.state.WorldTracks ? (
            this.state.WorldTracks.map(item => (
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
            ))
          ) : (
            <h4 style={{ textAlign: "center" }}>Failed to retrieve</h4>
          )}
        </List>
      </div>
    );
  }
}
