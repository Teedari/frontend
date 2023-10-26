export default class DateCalendar {
  days: { date: Date; day: string; formattedDate: string }[] = [];
  DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  numOfDays: number;
  lastDate: Date;
  constructor(numOfDays = 7) {
    this.numOfDays = numOfDays;
    this.lastDate = this.getMonday();
  }

  getMonday = () => {
    const date = new Date();
    if (date.getDay() !== 1 && date.getDay() > 1) {
      const remainder = date.getDay() - 1;
      return new Date(date.setDate(date.getDate() - remainder));
    }

    return date;
    // console.log(date.getDay() === 1);
  };

  generate = () => {
    const date = new Date(this.lastDate.toISOString());
    const days = Array(this.numOfDays)
      .fill("")
      .map((day, index) => {
        const dateFormat = new Intl.DateTimeFormat("en", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          // dateStyle: "full",
        });
        const _newDate = new Date(
          date.setDate(date.getDate() + (index === 0 ? 0 : 1))
        );
        return {
          date: _newDate,
          day: this.DAYS[_newDate.getDay()],
          formattedDate: dateFormat.format(_newDate),
        };
      });
    this.days = days;
  };

  prevDates = () => {
    const date = this.lastDate;
    this.lastDate = new Date(date.setDate(date.getDate() - this.numOfDays));
    this.generate();
  };
  nextDates = () => {
    const date = new Date(this.lastDate.toISOString());
    this.lastDate = new Date(date.setDate(date.getDate() + this.numOfDays));
    this.generate();
  };

}
