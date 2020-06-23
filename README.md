# List Files

A simple npm package that leverages the power of javascript's `console.table()` to print out files in the current directory. This package is best used as a command-line program, similar to `ls`. 

## Installation
To install this package, run the following command in your terminal: 

```node
npm install listfiles --global
```

## Arguments
Since `listfiles` is intended to be used as a command line program, it will read any arguments that are passed along with its execution. Currently `listfiles` has the following flags: 

* `--filter-`: filter the files that are display in the current directory
  * `day-{number, between 1 and 31 inclusive}`
  * `month-{month name or number, between 1 and 12 inclusive}`
  * `year-{four digit year}`
  * `weekday-{weekday, number or first three letters of weekday}`
  * `filetype-{file, folder, fifo, socket, symlink}`
* `--show-filter`: this displays the filters that were successfully parsed

## Examples

The below command will display only files and directories that fall on November: 

```zsh
# the below are all equivalent, notice how it is not case sensitive
lsjs --filter-month-12
lsjs --filter-month-November
lsjs --filter-month-nov
```

With z-shell, you can easily add multiple filters at once!

```zsh
lsjs --filter-{month-6,year-2019}          # files from June 2019
lsjs --filter-{year-2020,month-{6..12}}    # files from June-December 2019
lsjs --filter-weekday-{mon,fri}            # show files that fall on monday or friday
```

## Notes 
If you find this program useful, I would install it globally via `npm install -g`. By default the program lists directories in alpha order first, then all other files in alpha order. 
