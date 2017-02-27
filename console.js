// define a node console using node's built-in REPL

const repl = require("repl");

const models = require("./models/models.js");

const replServer = repl.start({});
replServer.context.models = models;