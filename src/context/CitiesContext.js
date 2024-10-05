import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';
const Base_URL = `http://localhost:9000`;
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'cities/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case 'cities/rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error('unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${Base_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch {
        dispatch({
          type: 'cities/rejected',
          payload: `there was an error loading the cities`,
        });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback( async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${Base_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch {
      dispatch({
        type: 'cities/rejected',
        payload: `there was an error loading the city`,
      });
    }
  },[currentCity.id])

  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${Base_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      dispatch({ type: 'cities/created', payload: data });
    } catch {
      dispatch({
        type: 'cities/rejected',
        payload: `there was an creating the city`,
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${Base_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/deleted', payload: id });
    } catch {
      dispatch({
        type: 'cities/rejected',
        payload: `there was an error deleting the city`,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(`cities context was used outside the service provider`);
  return context;
}

export { CitiesProvider, useCities };
