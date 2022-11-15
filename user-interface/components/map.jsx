import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import RoomIcon from '@mui/icons-material/Room';
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

const myIcon = new divIcon({
    html: renderToStaticMarkup(<RoomIcon size="small" variant="extended"/>),
    iconSize: [0, 0]
   })

const Map = () => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]} icon={myIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
