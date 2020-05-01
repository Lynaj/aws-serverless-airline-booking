/**
 * Catalog [Vuex Module](https://vuex.vuejs.org/guide/modules.html) - It holds flights information from Catalog service.
 * @see {@link SET_FLIGHTS} for more info on mutation
 * @see {@link SET_CARS} for more info on mutation
 * @see {@link SET_LOADER} for more info on mutation
 * @see {@link fetchFlights} for more info on amodule ction
 * @see {@link fetchCars} for more info on amodule ction
 * @see {@link fetchByFlightNumber} for more info on module action
 */
export default {
  flights: [],
  cars: [],
  loading: false,
  paginationToken: "",
  carsPaginationToken: ""
};
