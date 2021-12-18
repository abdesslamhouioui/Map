import React, { useState, useEffect } from "react";
import { Marker, MapContainer, GeoJSON, Tooltip } from "react-leaflet";
import mapData from "../data/countries.json";
import countriesList from "../data/countriesList.json";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./styles.css";

const MyMap = ({ countyTarget, BuildingName }) => {
  console.log(countyTarget);
  const [countryTarget, setcountryTarget] = useState({});
  useEffect(() => {
    const countyTargetInfo = countriesList.filter(
      (el) => el.name === countyTarget
    );
    setcountryTarget({
      name: countyTargetInfo[0].name,
      position: countyTargetInfo[0].position,
    });
  }, [countyTarget]);

  const onEachCountry = (country, layer) => {
    let countryId = country.properties.name;
    console.log(countyTarget);
    if (countryId === countyTarget) {
      layer.setStyle({
        fillColor: "#dfadad",
        fillOpacity: 1,
      });
    }
  };

  const myIcon = new L.icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconSize: [20, 30],
  });
  return (
    <div>
      <MapContainer className="map" zoom={2} center={[20, 100]}>
        <GeoJSON
          key={countyTarget}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
        <Marker icon={myIcon} position={countryTarget.position}>
          <Tooltip permanent direction="top">
            {BuildingName} is located in {countryTarget.name}
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default MyMap;