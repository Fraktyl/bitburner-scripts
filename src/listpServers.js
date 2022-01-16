/** @param {NS} ns **/
export async function main(ns) {
    var existingServers = ns.getPurchasedServers()
 
    existingServers.sort(function(a,b){
       a = a.split('-')[1]
       b = b.split('-')[1]
       return a-b
       })
    
    for (var i = 0; i < existingServers.length; i++) {
       ns.tprint(`Server: ${i+1}: ${existingServers[i]}`)
    }
 }