import { getLSItem, setLSItem} from 'helper.js'

const settings = {
  keys: {
    equipmentList: 'BB_EQUIPMENT_LIST',
    augumentationList: 'BB_AUGUMENTATION_LIST',
  },
}

export async function main(ns) {
  ns.disableLog('ALL')
  const equpiments = ns.gang.getEquipmentNames().map((equipmentName) => {
    return {
      name: equipmentName,
      type: ns.gang.getEquipmentType(equipmentName),
      cost: ns.gang.getEquipmentCost(equipmentName),
      ...ns.gang.getEquipmentStats(equipmentName),
    }
  })
  equpiments.sort((a, b) => a.cost - b.cost)

  setLSItem(
    settings.keys.equipmentList,
    equpiments.filter((eq) => eq.type !== 'Augmentation')
  )
  setLSItem(
    settings.keys.augumentationList,
    equpiments.filter((eq) => eq.type === 'Augmentation')
  )

  ns.tprint('Done')
}
