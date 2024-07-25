import { watch } from 'fs'
import { Glob } from 'bun'
import { logger } from './logger'
import Config from '../gumpy.config'
import { build } from './build'

export const dev = async () => {
  if (Config.watch.files.length < 1) {
    throw new Error(
      'Aborting dev script. No files to be watched. Check grumpy.config.js'
    )
  }

  const HTTP_PORT = Config.watch.port || 3000
  const FILES = Config.watch.files.map((files) => new Glob(files))
  let liveReloadClient = Bun.file(import.meta.dir + '/live-reload.js')
  let connections = []

  FILES.forEach(async (files) => {
    for await (let file of files.scan('.')) {
      watch(file, (event, filename) => {
        connections.forEach(async (ws) => {
          logger.change(filename)
          await build({ silent: true })
          ws.send(
            JSON.stringify({
              event,
              filename,
              ext: filename.split('.')[1],
            })
          )
        })
      })
    }
  })

  Bun.serve({
    port: 3001,
    fetch(req, server) {
      if (server.upgrade(req)) return
      return new Response('Upgrade failed', { status: 500 })
    },
    websocket: {
      open(ws) {
        logger.connected()
        connections.push(ws)
      },
      close(ws) {
        logger.disconnected()
        connections = connections.filter((connection) => connection !== ws)
      },
      message(ws, message) {
        logger.messaged(message)
      },
    },
  })

  Bun.serve({
    port: Config.watch.port,
    fetch(req) {
      if (req.url.includes(`:${HTTP_PORT}/live-reload.js`)) {
        return new Response(liveReloadClient, {
          headers: { 'Content-Type': 'application/javascript' },
        })
      }

      return new Response('404: File not found', { status: 404 })
    },
  })
}
