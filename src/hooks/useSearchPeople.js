import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPeople, setSearch } from "../store/slicer/peopleSlice";

export const useSearchPeople = () => {
  const dispatch = useDispatch();
  const {
    people,
    search,
    status
  } = useSelector((state) => state.people);

  useEffect(() => {
    dispatch(fetchPeople(search));
  }, [dispatch, search]);

  const handleSearchChange = useCallback((e) => {
    dispatch(setSearch(e.target.value));
  }, [dispatch]);

  const PeopleCards = useMemo(() => people.map((person, index) => ({
    name: person.name,
    height: person.height,
    mass: person.mass,
    gender: person.gender,
    edited: person.edited,
    starships: person.starships,
    vehicles: person.vehicles,
  })), [people]);

  return {
    PeopleCards,
    status,
    search,
    handleSearchChange
  }
};
