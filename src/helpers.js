import { hackPrograms, purchaseables, lskeys } from 'constants.js'

/** @param {NS} ns **/
export function createUUID() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

export function localeHHMMSS(ms = 0) {
  if (!ms) {
    ms = new Date().getTime()
  }

  return new Date(ms).toLocaleTimeString()
}

export function getCurrentMoney(ns) {
    return ns.getServerMoneyAvailable("home");
}

export function getLSItem(key) {
  let item = localStorage.getItem(lskeys[key.toUpperCase()])

  return item ? JSON.parse(item) : undefined
}

export function setLSItem(key, value) {
  localStorage.setItem(lskeys[key.toUpperCase()], JSON.stringify(value))
}

export function clearLSItem(key) {
  localStorage.removeItem(lskeys[key.toUpperCase()])
}

/**
 * @param {NS} ns
 * @param {array} list of loggable functions to disable
 * @cost 0 GB
 */
 export function disableLogs(ns, listOfLogs) {
  ['disableLog'].concat(...listOfLogs).forEach(log => ns.disableLog(log));
}


/**
 * @param {integer} milliseconds to sleep
 * @cost 0 GB
 */
 export function mySleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms))
}
/**
 * @param {NS} ns
 * @param {function} callback
 * @cost 0 GB
 */
 export async function tryRun(callback) {
  let pid = callback()
  while (pid == 0) {
    await mySleep(5)
    pid = callback()
  }
  return pid
}

/**
 * @return {object} The player data from localStorage
 * @cost 0 GB
 **/
 export function fetchPlayer() {
  return getLSItem('player')
}

