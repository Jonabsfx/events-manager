import authResolver from "./auth.js";
import eventsResolver from "./events.js";
import bookingResolver from "./booking.js";

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

export default rootResolver;
  