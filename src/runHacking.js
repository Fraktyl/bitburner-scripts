import { localeHHMMSS } from 'helpers.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting runHacking.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const homeRam = ns.getServerRam('home').shift()

  if (homeRam >= 32) {
    ns.tprint(`[${localeHHMMSS()}] Spawning spider.js`)
    await ns.run('spider.js', 1, 'mainHack.js')
    await ns.sleep(3000)
    ns.tprint(`[${localeHHMMSS()}] Spawning cron.js`)
    ns.spawn('cron.js', 1)
  } else {
    ns.tprint(`[${localeHHMMSS()}] Spawning spider.js`)
    ns.spawn('spider.js', 1, 'mainHack.js')
  }
}
