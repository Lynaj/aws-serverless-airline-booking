<template>
  
  <q-modal ref="modal" content-classes="booking__modal">
    
    <q-toolbar color="primary">
      <q-btn flat round dense v-close-overlay icon="close" />
      <q-toolbar-title class="booking__modal--title self-center">
        <div class="row q-pt-md">
          <p
            class="no-margin booking__departure--code"
            data-test="booking-departure-code"
          >
            
            {{ id }}
            {{ make }}
            {{ model }}
            {{ version }}
            {{ year }}
            {{ mileage }}
            {{ fuel_type }}
            {{ engine_capacity }}
            {{ engine_power }}
            {{ gearbox }}
            {{ transmission }}
            {{ co2_emissions }}
            {{ particle_filter }}
            {{ damaged }}
            {{ body_type }}
            {{ door_count }}
            {{ color }}
            {{ metallic }}
            {{ pearl }}
            {{ matt }}
            {{ acrylic }}
            {{ nr_seats }}
            {{ rhd }}
            {{ price }}
            {{ vat_discount }}
            {{ vat }}
            {{ financial_option }}
            {{ leasing_concession }}
            {{ country_origin }}
            {{ date_registration }}
            {{ vin }}
            {{ registered }}
            {{ original_owner }}
            {{ no_accident }}
            {{ service_record }}
            {{ historical_vehicle }}
            {{ tuning }}
            {{ approval_for_goods }}

          </p>
        </div>
      </q-toolbar-title>
    </q-toolbar>

    <div
    class="booking__modal--ctas booking__modal--highlighted row inline full-width q-pl-lg"
    >
        <div class="col-6">
            <q-btn
            class="full-width cta__button-check-in"
            flat
            color="primary"
            label="Check-in"
            data-test="booking-check-in"
            @click="close"
            />
        </div>
    </div>

  </q-modal>
</template>

<style lang="stylus">
@import '~variables'

.booking__modal
  &--title
    margin 0 auto

  &--highlighted
    background $grey-1

  .q-timeline-content
    padding 0

  .q-item
    min-height none

  h6
    margin 0
    padding 0
</style>
<script>
import { date } from "quasar";

export default {
  /**
   *
   * Booking Card component represents booking details
   * It uses data from both Flight and Booking for rendering
   */
  name: "CarCard",
  props: {/**
        * @param {ID} id - ID of the car 
        * @param {String} make - Cars' make
        * @param {String} model - Cars' model
        * @param {Int} version - Cars' version
        * @param {Int} year - Cars' year
        * @param {Int} mileage - Cars' milleage
        * @param {String} fuel_type - Cars' fuel type ( petrol )
        * @param {Int} engine_capacity - Cars' enginecapacity
        * @param {Int} engine_power - Cars' engine power
        * @param {String} gearbox - Cars' gearbox
        * @param {String} transmission - Cars' transmission
        * @param {Int} co2_emissions - Cars' co2 emissions
        * @param {Int} particle_filter - Cars' particle ilter
        * @param {Int} damaged - Cars' damaged
        * @param {String} body_type - Cars' body type
        * @param {Int} door_count - Cars' door_count
        * @param {String} color - Cars' color
        * @param {Int} metallic - Cars' metallic
        * @param {Int} pearl - Cars' pearl
        * @param {Int} matt - Cars' matt
        * @param {Int} acrylic - Cars' acrylic
        * @param {Int} nr_seats - Cars' number of seats
        * @param {Int} rhd - Cars' rhd
        * @param {Int} price - Cars' price
        * @param {Int} vat_discount - Cars' price without the VAT
        * @param {Int} vat - Cars' vat
        * @param {Int} financial_option - Cars' financial option
        * @param {Int} leasing_concession - is Cars' leasing concession available
        * @param {String} country_origin - what is the cars origin country Cars
        * @param {String} date_registration - what is the Cars' registration date
        * @param {Strin} vin - Cars' vin
        * @param {Int} registered - is Car registered
        * @param {Int} original_owner - is the seller Cars' original owner
        * @param {Int} no_accident - is Car accident free
        * @param {Int} service_record - 
        * @param {Int} historical_vehicle - is Cars' history available
        * @param {Int} tuning - determines if the car has been modified 
        * @param {Int} approval_for_goods - determines if the seller wants to trade the car for goods
     */
    id: Number,
    make: String,
    model: String,
    version: Number,
    year: Number,
    mileage: Number,
    fuel_type: String,
    engine_capacity: Number,
    engine_power: Number,
    gearbox: String,
    transmission: String,
    co2_emissions: Number,
    particle_filter: Number,
    damaged: Number,
    body_type: String,
    door_count: Number,
    color: String,
    metallic: Number,
    pearl: Number,
    matt: Number,
    acrylic: Number,
    nr_seats: Number,
    rhd: Number,
    price: Number,
    vat_discount: {
        type: String,
        validator: function(value) {
            return value.length == 1;
        }
    },
    vat: {
        type: String,
        validator: function(value) {
            return value.length == 1;
        }
    },
    financial_option: Number,
    leasing_concession: Number,
    country_origin: String,
    date_registration: String,
    vin: String,
    registered: Number,
    original_owner: Number,
    no_accident: Number,
    service_record: Number,
    historical_vehicle: Number,
    tuning: Number,
    approval_for_goods: Number,
    reference: String,
    name: String
  },
  methods: {
    /**
     * Display modal
     *
     * @see BookingFlight
     */
    showCard: function() {
      // @ts-ignore
      this.$refs["modal"].show();
    },
    /**
     * Hides modal
     *
     * @see BookingFlight
     */
    hideCard: function() {
      // @ts-ignore
      this.$refs["modal"].hide();
    },
    clean() {
        this.$q.notify("Not implemented yet");
    },
    checkIn() {
      this.$q.notify("Not implemented");
    },
    cancelBooking() {
      this.$q.notify("Not implemented");
    }
  },
  /**
   *
   * At mount lifecycle hook, it formats departure/arrival dates to be displayed
   *
   */
  mounted() {
    // this.departureDisplayDate = date.formatDate(
    //   // @ts-ignore
    //   this.departureDate,
    //   "ddd, DD MMM YYYY"
    // );
  },
  data() {
    return {
    };
  }
};
</script>
