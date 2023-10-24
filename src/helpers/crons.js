const CronJob = require("cron").CronJob;
const { start } = require("repl");
const config = require("../config/config");
const { emailService } = require("../services");

/** It's running on when clock time is 7:45 of 24 hours */
new CronJob(
  "45 7 * * *",
  function () {
    console.log("It's running on when clock time is 7:45");
  },
  null,
  false,
  //   "America/Sao_Paulo"
  "Asia/Kolkata"
).start();

/** Send email */
new CronJob(
  "00 10 * * *",
  function () {
    console.log("It's running on when clock time is 7:45");
    emailService.sendMail(
      "deepsavaliya972@gmail.com",
      "Morning message",
      "hello, this is deep! Good morning! Have a nice day :)"
    );
  },
  null,
  false,
  "Asia/Kolkata"
).start();