"use strict"

const path = require("path")
const AutoLoad = require("@fastify/autoload")

module.exports = function (fastify, opts, next) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "services"),
    options: Object.assign({}, opts),
  })

  // Make sure to call next when done
  next()
}

var chokidar = require("chokidar")

console.log("Watching current directory for changes...")

var watcher = chokidar.watch("pcap", {
  // ignored: /^\./,
  persistent: false,
  awaitWriteFinish: true,
  ignoreInitial: true,
})

watcher
  .on("add", function (path) {
    console.log("File", path, "has been added")
    console.log("Sending message to all clients")
    console.log(wss.clients)
    wss.clients.forEach(function each(client) {
      console.log("Client readyState", client.readyState)
      // if (client.readyState === WebSocket.OPEN) {
      client.send("File " + path + " has been added")
      // }
    })
  })
  .on("change", function (path) {
    console.log("File", path, "has been changed")
  })
  .on("unlink", function (path) {
    console.log("File", path, "has been removed")
  })
  .on("error", function (error) {
    console.error("Error happened", error)
  })

const { WebSocketServer } = require("ws")

const wss = new WebSocketServer({ port: 4545 })

wss.on("connection", function connection(ws) {
  ws.on("error", console.error)

  ws.on("message", function message(data) {
    console.log("received: %s", data)
  })

  ws.send("something")
})
