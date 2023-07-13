import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card, CardContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LOAD_STATE } from "../../constants";

import { boxStyles, containerStyles,} from "./style";

import { useSearchPeople } from "../../hooks/useSearchPeople";

import {
  selectPerson,
  fetchVehiclesAsync,
  fetchStarshipsAsync,
} from "../../store/slicer/selectedPersonSlice";

import TransportList from "../TransportsList/TransportsList";

const PeopleList = () => {
  const { PeopleCards, status, search, handleSearchChange } = useSearchPeople();

  const [selectedPerson, setSelectedPerson] = useState(null);

  const dispatch = useDispatch();

  const handleShowVehicles = (person) => {
    setSelectedPerson(person);
    dispatch(selectPerson(person));
    dispatch(fetchVehiclesAsync(person));
    dispatch(fetchStarshipsAsync(person));
  };

  const handleClose = () => {
    setSelectedPerson(null);
  };

  return (
    <Box style={boxStyles}>
      <TextField
        label="Search for a hero"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />
      {status === LOAD_STATE.LOADING && <CircularProgress />}
      {status === LOAD_STATE.SUCCESS && (
        <Box style={containerStyles}>
          {PeopleCards.map((person) => (
            <Card key={person.name} variant="outlined">
              <CardContent>
                <h3>{person.name}</h3>
                <p>Height: {person.height}</p>
                <p>Mass: {person.mass}</p>
                <p>Gender: {person.gender}</p>
                <p>Edited: {person.edited}</p>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleShowVehicles(person)}
                >
                  Show Vehicles
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
      {status === LOAD_STATE.REJECT && <p>Oops, something happened</p>}
      {selectedPerson && (
        <TransportList
          person={selectedPerson}
          close={handleClose}
          open={handleShowVehicles}
        />
      )}
    </Box>
  );
};

export default PeopleList;
