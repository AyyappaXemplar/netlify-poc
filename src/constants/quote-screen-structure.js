const quoteScreenStructure = {
  vehicles: {
    saveUrl: '/drivers/new',
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  ['discounts']
  },
  drivers: {
    saveUrl: '/quote/discounts',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles', 'discounts']
  },
  discounts: {
    saveUrl: '/quote/complete',
    itemsBeforeButton: ['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers']
  },
  complete: {
    saveUrl: '/quote',
    itemsBeforeButton: ['vehicles', 'drivers', 'discounts'],
    itemsAfterButton:  []
  }
}

export default quoteScreenStructure
