import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Marker, InfoWindow } from "@react-google-maps/api";
import Log from "./Log";
import Texts from "../Constants/Texts";

const divStyle = {
  background: `white`,
  padding: 5,
};

const fetchGeoLocation = (location) => {
  let encodedLocation = encodeURI(location);

  return fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodedLocation}&apiKey=${process.env.REACT_APP_OSM_GEOCODER_API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      const properties = res.features[0].properties;
      return { lat: properties.lat, lng: properties.lon };
    })
    .catch((error) => {
      Log.error(error);
      return [];
    });
};

const MarkerItem = (props) => {
  const { name, description, position, type, id, language } = props;
  const texts = Texts[language].markerItem;

  const [show, setShow] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleLink = (type) => {
    const { match } = props;
    const { groupId } = match.params;

    switch (type) {
      case "activity":
        return `/groups/${groupId}/activities/${id}`;
      case "offer":
        return `/groups/${groupId}/materials/offers/${id}/info`;
      case "request":
        return `/groups/${groupId}/materials/requests/${id}`;
      default:
        return "";
    }
  };

  useEffect(() => {
    async function fetchLocation() {
      const location = await fetchGeoLocation(position);
      setCurrentLocation(location);
    }
    fetchLocation();
    setFetchedData(true);
  }, [position]);

  const destination = handleLink(type);

  return fetchedData ? (
    <Marker
      title={name}
      position={currentLocation}
      onClick={() => setShow(!show)}
    >
      {show && (
        <InfoWindow position={currentLocation}>
          <div style={divStyle}>
            <h1>{name}</h1>
            <p>{description}</p>
            <p>
              <Link to={destination}>{texts.info}</Link>
            </p>
          </div>
        </InfoWindow>
      )}
    </Marker>
  ) : (
    <div></div>
  );
};

export default MarkerItem;
