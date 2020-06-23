function parseMonth(month) {
  const validMonths = [...Array(12).keys()].map(key => ++key);
  const namedMonths = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ].map(month => month.toLowerCase());
  const namedMonthsAbb = namedMonths.map(month => month.substring(0,3).toLowerCase());

  const tryMonths = namedMonths.indexOf(month.toLowerCase()) + 1;
  const tryMonthsAbb = namedMonthsAbb.indexOf(month.toLowerCase()) + 1;
  const tryIndex = validMonths.indexOf(+month) + 1;

  const results = [tryMonths, tryMonthsAbb, tryIndex];
  const output = results.reduce((a,b) => a === 0 ? b : a);
  return output;
}

function parseYear(year) {
  let parsedYear = +year;
  return parsedYear;
}


function parseDay(day) {
  let parseedDay = +day;
  return parseedDay;
}

function parseWeekDay(day) {
  let parsedDay = +day;
  const validDays = [...Array(7).keys()].map(d => ++d);
  const namedDays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ].map(d => d.toLowerCase());

  if (isNaN(parsedDay)) return namedDays.indexOf(day.toLowerCase()) + 1;
  return parsedDay;

}


module.exports = {
  parseMonth,
  parseYear,
  parseDay,
  parseWeekDay
};