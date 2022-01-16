import { localeHHMMSS } from 'helpers.js'

export async function main(ns) {
  ns.tprint(`[${localeHHMMSS()}] Starting karmaReducer.js`)

  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  const crimeToCommit = 'homicide';
  let numKills = 30;

  while (numKills > 0) {
    if (ns.getCrimeChance(crimeToCommit) == 1) {
      ns.commitCrime(crimeToCommit);
      numKills--;
      }

    while (ns.isBusy()) {
      await ns.sleep(100)
    }
  }

  ns.tprint(`[${localeHHMMSS()}] Karma Reduced`)
}
