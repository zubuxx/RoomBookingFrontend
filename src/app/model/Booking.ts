import {Layout, Room} from "./Room";
import {User} from "./User";

export class Booking {
  id: number;
  room: Room;
  user: User;
  layout: Layout;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;


  getDateAsDate() {
    return new Date(this.date);
  }

  static fromHttp(booking: Booking) {
    const newBooking = new Booking();
    newBooking.id = booking.id;
    newBooking.room = Room.fromHttp(booking.room);
    newBooking.user = User.fromhttp(booking.user);
    newBooking.layout = Layout[booking.layout];
    newBooking.title = booking.title;
    newBooking.date = booking.date;
    newBooking.startTime = booking.startTime;
    newBooking.endTime = booking.endTime;
    newBooking.participants  = booking.participants;
    return newBooking;
  }

  static toHttp(booking: Booking) {
    if (booking.startTime.length < 8) {
      booking.startTime = booking.startTime + ':00';
    }

    if (booking.endTime.length < 8) {
      booking.endTime = booking.endTime + ':00';
    }
  const obj = {
    id: booking.id,
    room: Room.toHttp(booking.room),
    user: booking.user,
    layout: Object.keys(Layout).find(lc => Layout[lc] === booking.layout),
    title: booking.title,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    participants: booking.participants,
  }
  return obj;


  }
}
