import rawCoverages from '../server/coverages'

function getAllCoverages() {
  const allCoverages = rawCoverages.map(item => item.coverage)
  const coveragesSet = new Set(allCoverages);
  return [...coveragesSet]
}

export const allCoverages = getAllCoverages()

