import rawCoverages from '../data/coverages'

function getAllCoverages() {
  const allCoverages = rawCoverages.map(item => item.type)
  const coveragesSet = new Set(allCoverages);
  return [...coveragesSet]
}

export const groupedCoverages = rawCoverages.reduce((groupedCoverages, item) => {
  if (groupedCoverages[item.package]) {
    groupedCoverages[item.package].push(item)
  } else {
    groupedCoverages[item.package] = [item]
  }
  return groupedCoverages
}, {})


export const allCoverages = getAllCoverages()
