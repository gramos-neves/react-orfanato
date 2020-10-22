import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import mapMarkerImg from "../assets/icon.svg";
import { FiPlus,FiArrowRight } from "react-icons/fi";
import "../styles/pages/orphanages-map.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";

import "leaflet/dist/leaflet.css";
import api from "../service/api";

const mapIcon = leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [48, 58],
  iconAnchor: [28, 58],
  popupAnchor:[170,2]
});

interface Orphanage{
  id: number;
  latitude: number;
  longitude: number;
  name:string;

}

function Orpahnages() {
   const [orphanages, setOrphanages] = useState<Orphanage[]>([])

   useEffect (() => {
       api.get('orphanages').then(resp => {
         console.log(resp.data)
           setOrphanages(resp.data)
       })
        
   },[])



  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
        </header>
        <footer>
          <strong>Rio do Sul</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>
      <Map
        center={[-23.5448112, -46.4873986]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      { 
        orphanages.map(orphanage => {
         
         return(   
        
        <Marker  key={orphanage.id}
          icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]}>
          <Popup closeButton={false} className="map-popup"
           minWidth={240} maxWidth={240}>
              {orphanage.name}
           <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />     
           </Link>
           </Popup>
        </Marker>
         )
        })}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default Orpahnages;
