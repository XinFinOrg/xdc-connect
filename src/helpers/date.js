export const DateStringFormat = (date) => {
  date = new Date(date);
  if (_.isDate(date))
    return `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return date;
};

export const TIMER_FORMAT = "DD:HH:MM::SS";

export const GetTimerData = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);
  const sec = Math.floor(((seconds % 86400) % 3600) % 60);
  return { days, hours, minutes, seconds: sec };
};

export const FormatSeconds = (seconds) => {
  const { days, hours, minutes, seconds: sec } = GetTimerData(seconds);
  return (
    <span className="timer">
      <span className="days">{days}</span>:
      <span className="hours">{hours}</span>:
      <span className="minutes">{minutes}</span>::
      <span className="seconds">{sec}</span>
    </span>
  );
};

export const FormatSecondsTwo = (seconds) => {
  const { days, hours, minutes, seconds: sec } = GetTimerData(seconds);
  return (
    <span className="timer">
      <span className="days">D:&nbsp;{days}</span>&nbsp;&nbsp;
      <span className="hours">{ToDoubleDigit(hours)}</span>:
      <span className="minutes">{ToDoubleDigit(minutes)}</span>:
      <span className="seconds">{ToDoubleDigit(sec)}</span>
    </span>
  );
};
