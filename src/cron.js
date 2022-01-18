import { disableLogs, tryRun } from 'helpers.js'

const sec = 1000
const min = 60 * sec

const timers = [
  { file: '/Daemons/monitorPlayer.js',     freq: 20,       last: 0},
  { file: '/Daemons/stats.js',             freq: 1 * sec,  last: 0},
  { file: '/Daemons/buyPrograms.js',       freq: 5 * sec,  last: 0},
  { file: '/Daemons/buyPlayerServers.js',  freq: min,      last: 0},
]

/**
 * @param {NS} ns
 **/
 export async function main(ns) {
    disableLogs(ns, ['sleep'])
    let first = true, proc
  
    while(true) {
      for ( const timer of timers) {
        proc = ns.ps('home').find(p => p.filename == timer.file)
        if (!proc && Date.now() > timer.last + timer.freq ) {
          await tryRun(() => ns.run(timer.file, 1))
          timer.last = Date.now()
        }
        // spread out inits so player has time to propigate
        if ( first ) { await ns.sleep(50); first = false }
      }
      await ns.sleep(5)
    }
  }