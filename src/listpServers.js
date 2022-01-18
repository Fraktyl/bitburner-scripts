import { padString } from 'helpers.js'

/** @param {NS} ns **/
export async function main(ns) {
    var existingServers = ns.getPurchasedServers()
 
    existingServers.sort(function(a,b){
       a = a.split('-')[1]
       b = b.split('-')[1]
       return a-b
       })
    
    for (var i = 0; i < existingServers.length; i++) {
       ns.tprint(`Server: ${padString(i+1,2,'0')}: ${existingServers[i]}`)
    }
 }

 