# goal
check duration difference between linux and mac on `npm install` w/ or w/o
`--no-progress`.

## linux
in secs
w/:  31, 28, 28, 26, 33, 27, 31, 29
w/o: 29, 28, 25, 26, 25, 27, 28, 27

## mac
in mins
w/:  1.27, 1.26, 1.25
w/o: 1.19, 1.25, 1.30

## result
slightly faster w/ `--no-progress`, but not enough to cause a great stir.
again, mac about three times slower, although machine is newer.
