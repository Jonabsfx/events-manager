import Event from "../../models/Event.js";
import User from "../../models/User.js";
import { dateToString } from "../../helpers/date.js";

const events = async eventsIDs => {
    try {
        const events = await Event.find({ _id: { $in: eventIDs } });
        return events.map(event => {
            return transformEvent(event);
        });
     } catch(err){
         throw err;
     }
};

const singleEvent = async eventID => {
    try{
        const event = await Event.findById(eventID);
        return transformEvent(event);
    } catch(err){
        throw err;
    }
};

const user = async userID => {
    try {
      const user = await User.findById(userID);
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (err) {
      throw err;
    }
};

export const transformEvent = event => {
    return {
      ...event._doc,
      _id: event.id,
      date: dateToString(event._doc.date),
      creator: user.bind(this, event.creator)
    };
};

export const transformBooking = booking => {
    return {
      ...booking._doc,
      _id: booking.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt)
    };
};
