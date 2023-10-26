export const getDateOnlyFromISOString = (date: string | Date) => {
  let dateString = typeof date !== "string" ? date.toISOString() : date;
  return dateString.split("T")[0];
};

export const getDateTime = (dateString: any) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = formatter.format(date);
  return formattedTime;
};
