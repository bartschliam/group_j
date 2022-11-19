import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import RoomIcon from '@mui/icons-material/Room';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const myIcon = new divIcon({
    html: renderToStaticMarkup(<RoomIcon size="small" variant="extended"/>),
    className: "divIcon",
    iconSize: [25, 25]
   })

const Map = ({data, labelKeys}) => {
  return (
    <MapContainer center={[53.4494762, -7.5029786]} zoom={6} scrollWheelZoom={true} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((marker, index) => 
          <Marker position={[marker.lat.value, marker.long.value]} icon={myIcon} key={index}>
            <Popup>
              {labelKeys.map((labelKey, index) => 
                <div>
                  {marker[labelKey]?.value}
                  <br />
                </div>)}
              
              {"(" + marker.lat.value + ", " + marker.long.value + ")"}
            </Popup>
          </Marker>
      )}
    </MapContainer>
  )
}

export default Map
