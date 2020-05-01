import Vue from "vue";
import Router from "vue-router";
import DefaultLayout from "./layouts/Default.vue";
import SearchFlights from "./views/Search.vue";
import Profile from "./views/Profile.vue";
import CarResults from "./views/CarResults.vue";
import FlightSelection from "./views/FlightSelection.vue";
import Bookings from "./views/Bookings.vue";
import Authentication from "./views/Authentication.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        
        
        {
          path: "",
          name: "home",
          component: SearchFlights,
          alias: "/search",
          meta: { requiresAuth: false }
        },




        // Extras
        {
          name: "chooseLocation",
          path: "/choose/location/",
          component: FlightSelection,
          props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
          meta: { requiresAuth: false }
        },




        {
          name: "selectedLocation",
          path: "/location/",
          component: FlightSelection,
          props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
          meta: { requiresAuth: false }
        },


        

        // Extras
        {
          name: "selectedFlight",
          path: "/search/results/review",
          component: FlightSelection,
          props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
          meta: { requiresAuth: false }
        },


        {
          name: "searchResults",
          path: "/search/results",
          component: CarResults,
          props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
          meta: { requiresAuth: false }
        },
        {
          name: "selectedFlight",
          path: "/search/results/review",
          component: FlightSelection,
          props: route => ({ ...route.params, ...route.query }), // converts query strings and params to props
          meta: { requiresAuth: false }
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          meta: { requiresAuth: false }
        },
        {
          path: "/profile/bookings",
          name: "bookings",
          component: Bookings,
          meta: { requiresAuth: false }
        },
        {
          path: "/auth",
          name: "auth",
          component: Authentication,
          props: route => ({ ...route.params, ...route.query }) // converts query strings and params to props
        }
      ]
    }
  ]
});

/**
 * Authentication Guard for routes with requiresAuth metadata
 *
 * @param {Object} to - Intended route navigation
 * @param {Object} from - Previous route navigation
 * @param {Object} next - Next route navigation
 * @returns {Object} next - Next route
 */
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters["profile/isAuthenticated"]) {
      try {
        await store.dispatch("profile/getSession");
        next();
      } catch (err) {
        next({ name: "auth", query: { redirectTo: to.name } });
      }
    }
  }
  next();
});

export default router;
