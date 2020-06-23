const parseTime = require('./parse-date-filter');

function parseFilters(args) {
  let filters = { days: [], months: [], years: [], filetypes: [], weekdays: [] };
  const cleanargs = args.filter(arg => arg.includes('--filter'))

  cleanargs.forEach(argument => {
    
    let filterKey = argument.replace('--filter-', '').split('-')[0]
    let filterValue = argument.replace('--filter-', '').split('-')[1];

    const validFiletypes = ['file', 'folder', 'fifo', 'socket', 'symlink'];
    const validFilters = ['filetype', 'month', 'year', 'day', 'weekday'];

    if (!validFilters.includes(filterKey)) throw Error('filter key must be either filetype, month or year')
    if (filterKey === 'filetype' && !validFiletypes.includes(filterValue)) throw Error('could not parse filetype filter, must be either file, folder, fifo, socket, or symlink');

    if (filterKey === 'day') {
      filterValue = parseTime.parseDay(filterValue);
      if (filterValue > 31) throw Error('day filter not valid, must be integer in range [1,31]');
      filters.days.push(filterValue);
    } else if (filterKey === 'month') {
      filterValue = parseTime.parseMonth(filterValue);
      if (isNaN(filterValue)) throw Error('could not parse month filter, must be integer in range [1,12]');
      filters.months.push(filterValue);
    } else if (filterKey === 'year') {
      filterValue = parseTime.parseYear(filterValue);
      filters.years.push(filterValue);
    } else if (filterKey === 'weekday') {
      filterValue = parseTime.parseWeekDay(filterValue);
      if (filterValue === 0 || filterValue > 7) throw Error('could not parse weekday filter, must enter valid weekday (ex. mon, tue, etc.)');
      filters.weekdays.push(filterValue);
    } else if (filterKey === 'filetype') {
      filters.filetypes.push(filterValue);
    }

  });


  return filters;
}

module.exports = parseFilters;