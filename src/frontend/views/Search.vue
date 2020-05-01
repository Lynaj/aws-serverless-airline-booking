<template>
  <q-page class="container">
    <div class="wrapper">
      <div class="heading">
        <div class="q-display-1 search__headline" data-test="search-headline">
          Input car details
        </div>
      </div>
    </div>
    <div class="search__options q-pa-sm">
      <!-- Make -->
       <q-field
        class="search__options--input search__departure"
        :label-width="8"
      >
        <q-input
          class="search__departure"
          v-model="carMake"
          stack-label="Car Make"
          data-test="search-departure"
        >
          <q-autocomplete
            class="search__departure--suggestion text-bold"
            :min-characters="1"
            :static-data="{ field: 'make', list: carMakeSuggestionList }"
            :filter="fuzzySearchFilter"
          />
        </q-input>
      </q-field>
      
      <!-- Model -->
      <q-field
        class="search__options--input search__departure"
        :label-width="8"
      >
        <q-input
          class="search__departure"
          v-model="carModel"
          stack-label="Car Model"
          data-test="search-departure"
        >
          <q-autocomplete
            class="search__departure--suggestion text-bold"
            :min-characters="3"
            :static-data="{ field: 'value', list: carModelSuggestionList }"
            :filter="fuzzySearchFilter"
          />
        </q-input>
      </q-field>

      <!-- Spare parts -->
       <q-field
        class="search__options--input search__departure"
        :label-width="8"
      >
        <q-input
          class="search__departure"
          v-model="carSparePartName"
          stack-label="Spare Part Name"
          data-test="search-departure"
        >
          <q-autocomplete
            class="search__departure--suggestion text-bold"
            :min-characters="0"
            :static-data="{ field: 'value', list: carSparePartsList }"
            :filter="fuzzySearchFilter"
          />
        </q-input>
      </q-field>


    </div>
    <div class="wrapper">
      <q-btn
        @click="search"
        class="cta__button"
        color="secondary"
        label="Search Cars"
        :disable="
          $v.carMake.isAirport ||
            $v.carModel.isAirport
        "
      >
        <q-icon
          class="cta__button--direction"
          name="keyboard_arrow_right"
          size="2.6rem"
        />
      </q-btn>
    </div>
  </q-page>
</template>

<script>
// @ts-nocheck
import airports from "../store/catalog/airports.json";
import cars from "../store/catalog/cars.json";
import car_models from "../store/catalog/car_models.json";
import car_spare_parts from "../store/catalog/car_spare_parts.json"

import Fuse from "fuse.js";
import { date } from "quasar";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

/**
 * parse list of airports provided from Catalog module
 *
 * @return {object} - list of airports following auto-suggestion Quasar component contract
 */
const parseAirports = () => {
  return airports.map(country => {
    return {
      city: country.city,
      label: country.name,
      sublabel: country.code
    };
  });
};

const parseCarMake = () => {
  return cars.map(carMake => {
    return {
      value: carMake,
      label: carMake.brand,
      sublabel: carMake.brand,
      make: carMake.brand,
      models: carMake.models
    };
  });
};

const parseCarModel = () => {
  return car_models.map(carMake => {
    return {
      value: carMake.model,
      label: carMake.model,
      sublabel: carMake.model
    };
  });
};

const parseSpareParts = () => {
   return car_spare_parts.map(sparePart => {
    return {
      value: sparePart.name,
      label: sparePart.name,
      sublabel: sparePart.name
    };
  });
}

/**
 * Validate given input against list of valid IATA airports
 * @param {string} value - Given airport input by customer
 * @param {object} vm - Vue scope so outer functions can access store/Vue data
 * @return {boolean} - Boolean whether given airport is a valid IATA airport from airport list
 */
const isAirport = (value, vm) => {
  return true;
};

/**
 * Validate given input against list of valid car makes airport
 * @param {string} value - Given car input by customer
 * @param {object} vm - Vue scope so outer functions can access store/Vue data
 * @return {boolean} - Boolean whether given car is a valid IATA car from car list
 */
const isCarMake = (value, vm) => {
  return true;
  // return vm.carMakeSuggestionList.some(make => make.make === value); 
};

export default {
  /**
   *
   * Search view displays options for searching a flight given a departure, arrival and a date.
   */
  name: "Search",
  mixins: [validationMixin],
  validations: {
    carMake: {
      required,
      minLength: minLength(3)
    },
    carModel: {
      required,
      minLength: minLength(3)
    }
  },
  data() {
    return {
      /**
       * @param {object} carSparePartName - Car spare part name defined by the customer. Later on it should be a list
       * @param {object} carModel - Car model chosen by the customer
       * @param {object} carYear - Car year chosen by the customer
       * @param {object} departureDate - Departure date chosen by the customer
       * @param {object} suggestionList - Parsed list of airports offered as auto-suggestion
       * @param {object} carModelSuggestionList - Parsed list of models offered as auto-suggestion
       * @param {object} carMakeSuggestionList - Parsed list of makes offered as auto-suggestion
       * @param {object} spareParts - List of spare parts chosen by the customer
       */
      carModel: "",
      carMake: "",
      carSparePartName: "",
      carYear: 0,
      spareParts: [],
      departureDate: new Date(),
      suggestionList: parseAirports(),
      carMakeSuggestionList: parseCarMake(),
      carModelSuggestionList: parseCarModel(),
      carSparePartsList: parseSpareParts()
    };
  },

  methods: {
    /**
     * search method collects form data, create queryStrings, and redirects to Search Results view
     */
    search() {
      this.$router.push({
        name: "searchResults",
        query: {
          carMake: this.carMake,
          carModel: this.carModel,
          spareParts: this.spareParts
        }
      });
    },
    /**
     * fuzzySearchFilter method uses Fuse library to easily find airports whether that is city, IATA, initials, etc.
     */
    fuzzySearchFilter(terms, { field, list }) {
      const token = terms.toLowerCase();
      
      var options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 10,
        minMatchCharLength: 3,
        keys: [field, "value"]
      };
      
      let fuse = new Fuse(list, options);
      let result = fuse.search(token);
      
      console.log(result);

      return result;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables'

.search__options--input
  padding 0.3rem 1.5rem
  max-width 30rem
  margin auto

.checkbox_spare_parts
  display block
  margin auto
</style>
