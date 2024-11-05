import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';

import useGetAcceptedApprovalRequests from '../leaveRequests/useGetAcceptedApprovalRequests';

const CalendarComponent = () => {
  const { requests, isLoading, isError, error } =
    useGetAcceptedApprovalRequests();

  console.log(requests);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.message}</p>;

  if (!requests) return <p>No requests to show</p>;

  const events = requests.map((req) => ({
    title: `${req.employee} - ${req.absence_reason}`,
    start: req.start_date,
    end: req.end_date,
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      weekends={true}
      events={events}
      eventContent={renderEventContent}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderEventContent(eventInfo: any) {
  return <i>{eventInfo.event.title}</i>;
}

export default CalendarComponent;
