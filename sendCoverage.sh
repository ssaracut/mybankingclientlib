#!/bin/sh

#on a release build circle does not populate the CIRCLE_SHA1 and CIRCLE_BRANCH
#environment variables so we want to skip sending to coveralls as the command
#defaults to the local clone for source code matching

if [ ! -z "${CIRCLE_SHA1}" ] && [ ! -z "${CIRCLE_BRANCH}" ]; then
  echo Sending coverage report to Coveralls.
  cat $CIRCLE_TEST_REPORTS/coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
else
  echo Environment variables CIRCLE_SHA1 and CIRCLE_BRANCH are not defined. Must be a release build.
  echo Will skip sending coverage report to Coveralls.
fi