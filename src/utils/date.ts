export const datestrAscCompareFn = (a: string, b: string) => {
  return new Date(a).getTime() - new Date(b).getTime();
};

function spliting(fullDateStr: string) {
  const [datestr, hourstr] = fullDateStr.split(" ");
  const [year, month, date] = datestr.split("-").map((n) => parseInt(n));
  const [hour] = hourstr.split(":").map((n) => parseInt(n));
  return { year, month, date, hour };
}

export const dbDatestrAscCompareFn = (a: string, b: string) => {
  const dateA = spliting(a);
  const dateB = spliting(b);
  if (dateA.year !== dateB.year) return dateA.year - dateB.year;
  if (dateA.month !== dateB.month) return dateA.month - dateB.month;
  if (dateA.date !== dateB.date) return dateA.date - dateB.date;
  return dateA.hour - dateB.hour;
};
