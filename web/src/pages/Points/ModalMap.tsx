import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Point } from '../../types/Point';
import pointMapIcon from '../../components/MapIcon/pointMapIcon';
import 'leaflet/dist/leaflet.css';

interface ModalMapProps {
  modal: boolean;
  toggleModalMap: Function;
  point?: Point;
}

const ModalMap: React.FC<ModalMapProps> = ({ modal, toggleModalMap, point }) => {
  function closeModalMap(): void {
    toggleModalMap(false);
  }

  return (
    <Modal isOpen={modal} toggle={closeModalMap} size="lg">
      <ModalHeader toggle={closeModalMap}>{point?.name}</ModalHeader>
      <ModalBody>
        <Map center={[point?.latitude as number, point?.longitude as number]} zoom={15} className="mapHeight">
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <Marker position={[point?.latitude as number, point?.longitude as number]} icon={pointMapIcon}>
            <Popup>{point?.name}</Popup>
          </Marker>
        </Map>
      </ModalBody>
      <ModalFooter className="justify-content-between">
        <a
          className="btn btn-primary"
          href={`https://www.google.com/maps/search/${point?.latitude},${point?.longitude}`}
          title="Google Maps"
          rel="noopener noreferrer"
          target="_blank"
        >
          Open on Google Maps
        </a>
        <Button color="secondary" onClick={closeModalMap}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalMap;
