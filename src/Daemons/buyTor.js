import { getLSItem, setLSItem} from 'helpers.js'

export async function main(ns) {
    const player = getLSItem('player')

    if (player.tor || player.money < 2e5)
        return

    ns.tprint(`Buying TOR router`)
    ns.purchaseTor()
   
}