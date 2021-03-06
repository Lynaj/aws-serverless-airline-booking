// @ts-nocheck
/**
 *
 * Catalog [Vuex Module Mutation](https://vuex.vuejs.org/guide/mutations.html) - SET_FLIGHT mutates Catalog state with an array of Flights as payload.
 * @param {object} state - Vuex Catalog Module State
 * @param {Flight[]} flights - Array of Flights as payload
 * @see {@link fetchFlights} for more info on action that calls SET_FLIGHTS
 * @see {@link fetchByFlightNumber} for more info on action that calls SET_FLIGHTS
 */
export const SET_FLIGHTS = async (state, flights) => {
  if (state.flights.length === 0) {
    state.flights = flights;
  } else {
    // flatten array of flights and remove possible duplicates due to network issues
    let newFlights = [...flights, state.flights].flat(5);
    state.flights = [...new Set(newFlights)];
  }
};

/**
 *
 * Catalog [Vuex Module Mutation](https://vuex.vuejs.org/guide/mutations.html) - SET_CARS mutates Catalog state with an array of Cars as payload.
 * @param {object} state - Vuex Catalog Module State
 * @param {Flight[]} cars - Array of cars as payload
 */
 export const SET_CARS = async (state, cars) => {
  if (state.cars.length === 0) {
    state.cars = cars;
  } else {
    let newcars = [...cars, state.cars].flat(5);
    state.cars = [...new Set(newcars)];
  }
};

/**
 *
 * Catalog [Vuex Module Mutation](https://vuex.vuejs.org/guide/mutations.html) - SET_LOADER mutates Catalog state to control content loader when necessary.
 * @param {object} state - Vuex Catalog Module State
 * @param {boolean} isLoading - Boolean that controls whether content loader should be running
 * @see {@link fetchFlights} for more info on action that calls SET_LOADER
 * @see {@link fetchCars} for more info on action that calls SET_LOADER
 * @see {@link fetchByFlightNumber} for more info on action that calls SET_LOADER
 */
export const SET_LOADER = (state, isLoading) => {
  state.loading = isLoading;
};

export const SET_FLIGHT_PAGINATION = (state, paginationToken) => {
  state.paginationToken = paginationToken;
};

export const SET_CARS_PAGINATION = (state, paginationToken) => {
  state.carsPaginationToken = paginationToken;
};