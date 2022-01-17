export const settings = {
  homeRamReserved: 20,
  homeRamReservedBase: 20,
  homeRamExtraRamReserved: 64,
  homeRamBigMode: 64,    
  minSecurityLevelOffset: 2,
  maxMoneyMultiplayer: 0.9,
  minSecurityWeight: 100,
  mapRefreshInterval: 24 * 60 * 60 * 1000,
  maxWeakenTime: 30 * 60 * 1000,

}

export const changes = {
  hack: 0.002,
  grow: 0.004,
  weaken: 0.05,  
}
export const lskeys = {
  SERVERMAP : 'bb_server_map',
  RESERVE: 'bb_reserve',
  PLAYER: 'bb_player',
  CRIMES: 'bb_crimes',
  CRIMESTEP: 'bb_crimes_stop',
}

export const hackPrograms = [
  { name: "BruteSSH.exe", cost: 500000, },
  { name: "FTPCrack.exe", cost: 1500000, },
  { name: "relaySMTP.exe", cost: 5000000, },
  { name: "HTTPWorm.exe", cost: 30000000, },
  { name: "SQLInject.exe", cost: 250000000, },
]

export const purchaseables = hackPrograms.concat([
  { name: "ServerProfiler.exe", cost: 500000, },
  { name: "DeepscanV1.exe", cost: 500000, },
  { name: "DeepscanV2.exe", cost: 500000, },
  { name: "AutoLink.exe", cost: 500000, },
  { name: "Forumulas.exe", cost: 500000, },
])


