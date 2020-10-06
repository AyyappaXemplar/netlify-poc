import rawCoverages from '../server/coverages'

function getAllCoverages() {
  const allCoverages = rawCoverages.map(item => item.coverage)
  const coveragesSet = new Set(allCoverages);
  return [...coveragesSet]
}

export const groupedCoverages = rawCoverages.reduce((groupedCoverages, item) => {
  if (groupedCoverages[item.type]) {
    groupedCoverages[item.type].push(item)
  } else {
    groupedCoverages[item.type] = [item]
  }
  return groupedCoverages
}, {})


export const allCoverages = getAllCoverages()
