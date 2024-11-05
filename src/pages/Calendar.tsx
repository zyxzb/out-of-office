import CalendarComponent from '../features/calendar/FullCalendar';
import Heading from '../ui/Heading';
import SmallText from '../ui/SmallText';

const Calendar = () => {
  return (
    <>
      <Heading as='h1'>
        Calendar <SmallText>(accepted requests)</SmallText>
      </Heading>
      <CalendarComponent />
    </>
  );
};

export default Calendar;
