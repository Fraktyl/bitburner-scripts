import { getLSItem, setLSItem} from 'helpers.js'
import { purchaseables } from 'constants.js'

 /**
 * @param {NS} ns
 **/
export async function main(ns) {
    let player = ns.getPlayer()
    player.busy = ns.isBusy()
    player.karma = ns.heart.break()
  
    if ( isFirstRun() ) {
      player.programs = []
      player.boughtAllPrograms = false
    } else {
      player.programs = ns.ls('home', '.exe')
      player.boughtAllPrograms = didPlayerBuyAllPrograms(player)
    }
  
    setLSItem('PLAYER', player)
  }
  
  function didPlayerBuyAllPrograms(player) {
    if ( !player.tor )
      return false
  
    return purchaseables.every(f => player.programs.includes(f.name))
  }
  
  function isFirstRun() {
    return getLSItem('player') === undefined
  }