import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarAppointments = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/appointments/${user.patientId}`)
      .then((res) => {
        const formatted = res.data.map((appt) => ({
          title: `${appt.doctor} - ${appt.hospital}`,
          start: new Date(`${appt.date}T${appt.time}`),
          end: new Date(`${appt.date}T${appt.time}`),
        }));

        setEvents(formatted);
      });
  }, [user.patientId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold mb-4">Appointments Calendar</h1>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
};

export default CalendarAppointments;
