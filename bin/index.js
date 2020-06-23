#!/usr/bin/env node

const fs = require('fs');
const parseFilters = require('../utils/parse-filters');
const formatBytes = require('../utils/format-bytes');

const args = process.argv.length <= 2 ? [] : process.argv.slice(2);
const filters = parseFilters(args);

if (args.includes('--show-filters')) {
  console.log('\n');
  console.log('filters used : ');
  console.log('(empty filters will return all date and filetypes)\n')
  console.log(filters === null ? 'no filters' : filters);
  console.log('\n');
}




const dir = process.cwd();

const listfiles = (dir, filters) => {
  
  const files = fs.readdirSync(dir);
  let printfiles = [];
  let printfolders = [];
  
  
  files.forEach(file => {
    
    const filename = file.length > 30 ? file.substring(0,20) + ' ... '  + file.substring(file.lastIndexOf('.'), file.length) : file;
    const date = fs.statSync(file).birthtime;
    const datestring = date.toLocaleString();
    const size = formatBytes(fs.statSync(file).size);
    let filetype = fs.statSync(file)

    if (filetype.isDirectory()) filetype = 'folder';
    else if (filetype.isFIFO()) filetype = 'fifo';
    else if (filetype.isSocket()) filetype = 'socket';
    else if (filetype.isSymbolicLink()) filetype = 'symlink';
    else if (filetype.isFile()) filetype = 'file';

    
    if (filters.filetypes.length > 0  &&    !filters.filetypes.includes(filetype)) return;
    if (filters.days.length > 0       &&    !filters.days.includes(date.getDate())) return;
    if (filters.weekdays.length > 0   &&    !filters.weekdays.includes(date.getDay() + 1)) return;
    if (filters.months.length > 0     &&    !filters.months.includes(date.getMonth() + 1)) return;
    if (filters.years.length > 0      &&    !filters.years.includes(date.getFullYear())) return;


    if (filetype === 'folder') {
      printfolders.push({
        'file name': filename, 
        'file type': filetype, 
        'creation date': datestring, 
        size
      });
    } else {
      printfiles.push({
        'file name': filename, 
        'file type': filetype, 
        'creation date': datestring, 
        size
      });
    }

  });

  // sort the folders and files in separate arrays first then combine them after
  printfolders.sort((a,b) => (a['file name'] > b['file name']) ? 1 : -1 );
  printfiles.sort((a,b) => (a['file name'] > b['file name']) ? 1 : -1 );

  
  const combined = printfolders.concat(printfiles);

  console.table(combined);


}



listfiles(dir, filters);

