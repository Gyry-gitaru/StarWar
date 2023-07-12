import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import style from "./style";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import CircularProgress from "@mui/material/CircularProgress";

const TransportsList = ({ person, close, open }) => {
  const vehicles = useSelector((state) => state.selectedPerson.vehicles);
  const starships = useSelector((state) => state.selectedPerson.starships);
  const status = useSelector((state) => state.selectedPerson.status);

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  const vehicleElements = useMemo(
    () =>
      vehicles.map((vehicle, index) => (
        <CardContent key={index}>
          <h3>{vehicle.name}</h3>
          <p>Model: {vehicle.model}</p>
          <p>Manufacturer: {vehicle.manufacturer}</p>
          <p>Vehicle Class: {vehicle.vehicle_class}</p>
        </CardContent>
      )),
    [vehicles]
  );

  const starshipElements = useMemo(
    () =>
      starships.map((starship, index) => (
        <CardContent key={index}>
          <h3>{starship.name}</h3>
          <p>Model: {starship.model}</p>
          <p>Manufacturer: {starship.manufacturer}</p>
          <p>Starship Class: {starship.starship_class}</p>
        </CardContent>
      )),
    [starships]
  );

  return (
    <Modal open={open !== null} onClose={close}>
      <Box sx={{ ...style }}>
        <Button
          onClick={() => handleClose()}
          style={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>

        {status === "loading" ? (
          <CircularProgress />
        ) : vehicleElements.length === 0 ? (
          <p>{person.name} has no Vehicles</p>
        ) : (
          <Card variant="outlined">
            <h2 style={{ textAlign: "center" }}>Vehicles:</h2>
            {vehicleElements}
          </Card>
        )}

        {status === "loading" ? (
          <CircularProgress />
        ) : starshipElements.length === 0 ? (
          <p>{person.name} has no Starships</p>
        ) : (
          <Card variant="outlined">
            <h2 style={{ textAlign: "center" }}>Starships:</h2>
            {starshipElements}
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default TransportsList;
