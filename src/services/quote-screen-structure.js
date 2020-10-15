const quoteScreenStructure = {
  vehicles: {
    saveUrl: (quote) => (quote.drivers.length ? '/quotes/discounts' : '/drivers/new'),
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  ['discounts']
  },
  drivers: {
    saveUrl: () => '/quotes/discounts',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles', 'discounts']
  },
  discounts: {
    saveUrl: () => '/quotes/review',
    itemsBeforeButton: ['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers']
  },
  review: {
    saveUrl: () => '/quotes/submit',
    itemsBeforeButton: ['vehicles', 'drivers', 'discounts'],
    itemsAfterButton:  [],
    showWarnings: true
  }
}

export default quoteScreenStructure
