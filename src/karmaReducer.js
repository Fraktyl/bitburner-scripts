import { localeHHMMSS } from 'helpers.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting karmaReducer.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimeToCommit = 'homicide'
  let numKills = 29

  while (numkills > 0) {
    if ns.getCrimeChange(crimeToCommit) = 1 {
      ns.commitCrime(crimeToCommit)
      numkills--
      }

    while (nsIsBusy()) {
      await ns.sleep(100)
    }
  }

  ns.tprint(`[${localeHHMMSS()}] Karma Reduced`)
}