import React, { useState } from "react";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Card, CardContent } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useSearchPeople } from "../../hooks/useSearchPeople";

import {
  selectPerson,
  fetchVehiclesAsync,
  fetchStarshipsAsync,
} from "../../store/slicer/selectedPersonSlice";

import TransportList from "../TransportsList/TransportsList";

const PeopleList = () => {
  const { PeopleCards, loading, search, handleSearchChange } =
    useSearchPeople();

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "10px",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search for a hero"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
      />
      {loading === "loading" ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {PeopleCards.map((person, index) => (
            <Card key={index} variant="outlined">
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
