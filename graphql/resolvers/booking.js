import Event from "../../models/Event.js";
import Booking from "../../models/Booking.js";
import {transformBooking, transformEvent} from "./merge.js";

export default {
    bookings: async () => {
        try {
          const bookings = await Booking.find();
          return bookings.map(booking => {
            return transformBooking(booking);
          });
        } catch (err) {
          throw err;
        }
      },
      bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });
        const booking = new Booking({
          user: '5c0fbd06c816781c518e4f3e',
          event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
      },
      cancelBooking: async args => {
        try {
          const booking = await Booking.findById(args.bookingId).populate('event');
          const event = transformEvent(booking.event);
          await Booking.deleteOne({ _id: args.bookingId });
          return event;
        } catch (err) {
          throw err;
        }
    }
};