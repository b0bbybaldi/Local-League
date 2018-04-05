import React from "react";
import axios from "axios";
import "./style.css";

const google = window.google;
const _ = require("lodash");
const {
  compose,
  withProps,
  withStateHandlers,
  lifecycle
} = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
  // InfoWindow,
} = require("react-google-maps");

const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXNp2OJ5Hclna9gUqUX2O7vlh4Zyk-_6k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div className="mapdesign" style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      axios.get("/user/account").then(result => {
        this.setState({
          center: {
            lat: result.data.location.latitude,
            lng: result.data.location.longitude
          }
        });

        console.log("state***", this.state);
      });
      this.setState({
        bounds: null,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
          console.log("t", ref);
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter()
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
          console.log("b", ref);
        },
        onPlacesChanged: () => {
          console.log("places", refs.searchBox);
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();
          console.log("a", places);
          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            name: place.name,
            id: place.id,
            address: place.formatted_address,
            icon: "/img/marker.png"
          }));
          const nextCenter = _.get(
            nextMarkers,
            "0.position",
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers
          });
          // refs.map.fitBounds(bounds);
        },
        onMarkerClick: id => {
          console.log(id.index);
          console.log(this.state.markers[id.index]);
          this.props.onMarkerClick(this.state.markers[id.index]);
        }
      });
    }
  }),
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <div className="container">
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={11}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        placeholder="soccer field"
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Find a Soccer field"
          value="soccer field"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) => (
        <Marker
          key={index}
          ourKey={index}
          position={marker.position}
          name={marker.name}
          id={marker.id}
          icon={marker.icon}
          onClick={() => props.onMarkerClick({ index })}
        >
          {/*props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        Hello
        </InfoWindow>*/}
        </Marker>
      ))}
    </GoogleMap>
  </div>
));

export default MapWithASearchBox;
