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

export function getItem(key) {
  let item = localStorage.getItem(key)

  return item ? JSON.parse(item) : undefined
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * @param {NS} ns
 * @param {array} list of loggable functions to disable
 * @cost 0 GB
 */
 export function disableLogs(ns, listOfLogs) {
  ['disableLog'].concat(...listOfLogs).forEach(log => ns.disableLog(log));
}