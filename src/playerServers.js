import { getCurrentMoney, localeHHMMSS, createUUID } from 'helpers.js'
import { getItem, setItem } from 'common.js'

const settings = {
  maxPlayerServers: 25,
  gbRamCost: 55000,
  maxGbRam: 1048576,
  maxExponent: 20,
  minPurchasedServerRam: 8,
  totalMoneyAllocation: 0.9,
  buyServers: true,
  keys: {
    serverMap: 'BB_SERVER_MAP',
  },
}

export async function main(ns) {
  ns.disableLog('getServerMaxRam')
  ns.disableLog('getServerMoneyAvailable')
  
  while (settings.buyServers) {
    buyBestServerPossible(ns)
    if (allServersMaxed(ns)) {
      settings.buyServers = false
    }
    await ns.sleep(30000)
  }
}

function buyBestServerPossible(ns) {
  const serverMap = getItem(keys.serverMap)
  var availableMoney = getCurrentMoney(ns) * settings.totalMoneyAllocation
  var currentRamExponent = 1
  var existingServers = ns.getPurchasedServers()

  while (ns.getPurchasedServerCost(Math.pow(2, currentRamExponent + 1)) <= availableMoney && currentRamExponent < settings.maxExponent) {
    currentRamExponent++
  }

  var maxRamCanBuy = Math.pow(2, currentRamExponent)

  if (maxRamCanBuy < settings.minPurchasedServerRam && maxRamCanBuy < Math.pow(2, settings.maxExponent)) {
    return 0;
  }

  if (existingServers.length < settings.maxPlayerServers) {
    let hostname = `pserv-${maxRamCanBuy}-${createUUID()}`
    if (getCurrentMoney(ns) >= maxRamCanBuy * settings.gbRamCost * settings.totalMoneyAllocation) {
      var server = ns.purchaseServer(hostname, maxRamCanBuy)
      if (server) {
        updateServerMap(ns, serverMap, server)
        ns.tprint(`[${localeHHMMSS()}] Buying: ${hostname}`)
      }
    } else {
      ns.print(`[${localeHHMMSS()}] Cannot afford.  Need: ${maxRamCanBuy * setItem.gbRamCost * settings.totalMoneyAllocation} - Have: ${getCurrentMoney(ns)}`)
    }
  } else {
    var worstServer = findWorstServer(ns, existingServers)
    var worstServerRam = ns.getServerMaxRam(worstServer)

    if (maxRamCanBuy <= worstServerRam) {
      return
    }
    
    if (worstServer !== null && settings.maxGbRam > worstServerRam) {
      sellPurchasedServer(ns, worstServer)
    }

    if (getCurrentMoney(ns) >= maxRamCanBuy * settings.gbRamCost * settings.totalMoneyAllocation) {
      let hostname = `pserv-${maxRamCanBuy}-${createUUID()}`
      var server = ns.purchaseServer(hostname, maxRamCanBuy)
      if (server) {
        updateServerMap(ns, serverMap, server)
        ns.tprint(`[${localeHHMMSS()}] Buying: ${hostname}`)
      }
    }  else {
      ns.print(`[${localeHHMMSS()}] Cannot afford.  Need: ${maxRamCanBuy * setItem.gbRamCost * settings.totalMoneyAllocation} - Have: ${getCurrentMoney(ns)}`)
    }
  }
}

function findWorstServer(ns, existingServers) {
  var worstServer = null
  var worstRam = settings.maxGbRam

  for (var i = 0; i < existingServers.length; i++) {
    var maxRam = ns.getServerMaxRam(existingServers[i])
    if (maxRam < worstRam) {
      worstServer = existingServers[i]
      worstRam = maxRam
    }
  }
  return worstServer
}

function sellPurchasedServer(ns, serverName) {
  ns.print(`[${localeHHMMSS()}] Selling: ${serverName}`)
  ns.killall(serverName);
  ns.deleteServer(serverName);
}

function allServersMaxed(ns) {
  var maxed = false;
  var existingServers = ns.getPurchasedServers()

  if (existingServers.length == settings.maxPlayerServers) {
    for (var i = 0; i < existingServers.length; i++) {
      if (ns.getServerMaxRam(existingServers[i]) < settings.maxGbRam) {
        return false;
      }
    }
    maxed = true;
  }
  return maxed;
}

function updateServerMap(ns, serverMap, host) {
  serverMap.servers[host] = {
    host,
    ports: ns.getServerNumPortsRequired(host),
    hackingLevel: ns.getServerRequiredHackingLevel(host),
    maxMoney: ns.getServerMaxMoney(host),
    growth: ns.getServerGrowth(host),
    minSecurityLevel: ns.getServerMinSecurityLevel(host),
    baseSecurityLevel: ns.getServerBaseSecurityLevel(host),
    ram: ns.getServerRam(host)[0],
    connections: ['home'],
    parent: 'home',
    children: [],
  }

  Object.keys(serverMap.servers).map((hostname) => {
    if (!ns.serverExists(hostname)) {
      delete serverMap.servers[hostname]
    }
  })

  setItem(keys.serverMap, serverMap)
}