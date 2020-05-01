// @ts-nocheck
import { date } from "quasar";
import Flight from "../../shared/models/FlightClass";
/** Class representing a Booking. All permutations of data from Booking, a different date format for instance, should happen here. */
export default class Car {
  /**
   *
   * Creates an instance of Booking.
   * @param {Object} Booking
   * @param {string} [Booking.id] - Booking unique ID
   * @param {string} Booking.createdAt - Effective booking was created
   * @param {string} Booking.bookingReference - Booking reference
   * @param {Flight} Booking.outboundFlight - Outbound flight
   *
   * @todo Move to TS and create a Flight Interface
   * @example

   */
  constructor({ id, createdAt, outboundFlight, bookingReference }) {
    this.id = id;
    this.createdAt = new Date(createdAt);
    this.outboundFlight = new Flight(outboundFlight);
    this.bookingReference = bookingReference;
  }
  /**
   * Get the effective booking date
   * @type {string}
   * @readonly
   * @return {string} Formatted booking date (e.g 16 JAN 2019)
   */
  get bookingDate() {
    return date.formatDate(this.createdAt, "DD MMM YYYY");
  }
}
