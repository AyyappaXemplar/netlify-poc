const quoteScreenStructure = {
  vehicles: {
    saveUrl: '/drivers/new',
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  []//['discounts']
  },
  drivers: {
    saveUrl: '/quote/discounts',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles']//, 'discounts']
  },
  discounts: {
    saveUrl: '/quote',
    itemsBeforeButton: [],//['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers']
  },
  fullQuote: {
    saveUrl: '/quote',
    itemsBeforeButton: [],
    itemsAfterButton:  ['vehicles', 'drivers']//, 'discounts']
  }
}

export default quoteScreenStructure
