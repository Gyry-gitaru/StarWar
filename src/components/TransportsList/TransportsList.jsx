import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button, Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";

import { boxStyles, buttonStyles, textStyles, cardStyles } from "./style";

import { LOAD_STATE } from "../../constants";

const TransportsList = ({ person, close, open }) => {
  const vehicles = useSelector((state) => state.selectedPerson.vehicles);
  const starships = useSelector((state) => state.selectedPerson.starships);
  const status = useSelector((state) => state.selectedPerson.status);

  const handleClose = useCallback(() => { close(); }, [close]);

  const vehicleElements = useMemo(
    () =>
      vehicles.map(({ name, model, manufacturer, vehicle_class }) => (
        <CardContent key={model}>
          <h3>{name}</h3>
          <p>Model: {model}</p>
          <p>Manufacturer: {manufacturer}</p>
          <p>Vehicle Class: {vehicle_class}</p>
        </CardContent>
      )),
    [vehicles]
  );

  const starshipElements = useMemo(
    () =>
      starships.map(({ name, model, manufacturer, starship_class }) => (
        <CardContent key={model}>
          <h3>{name}</h3>
          <p>Model: {model}</p>
          <p>Manufacturer: {manufacturer}</p>
          <p>Starship Class: {starship_class}</p>
        </CardContent>
      )),
    [starships]
  );

  return (
    <Modal open={open !== null} onClose={close}>
      <Box style={boxStyles}>
        <Button onClick={() => handleClose()} style={buttonStyles}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        {status === LOAD_STATE.LOADING && <CircularProgress />}
        {status === LOAD_STATE.SUCCESS && (
          <>
            {vehicleElements.length === 0 ? (
              <p>{person.name} has no Vehicles</p>
            ) : (
              <Card style={cardStyles} variant="outlined">
                <h2 style={textStyles}>Vehicles:</h2>
                {vehicleElements}
              </Card>
            )}

            {starshipElements.length === 0 ? (
              <p>{person.name} has no Starships</p>
            ) : (
              <Card style={cardStyles} variant="outlined">
                <h2 style={textStyles}>Starships:</h2>
                {starshipElements}
              </Card>
            )}
          </>
        )}
        {status === LOAD_STATE.REJECT && <p>Oops, something happened</p>}
      </Box>
    </Modal>
  );
};

export default TransportsList;
