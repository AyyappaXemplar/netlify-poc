const quoteScreenStructure = {
  vehicles: {
    saveUrl: (quote) => (quote.drivers.length ? '/quotes/review' : '/drivers/new'),
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  ['discounts']
  },
  drivers: {
    saveUrl: () => '/quotes/review',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles', 'discounts']
  },
  discounts: {
    saveUrl: () => '/quotes/review',
    itemsBeforeButton: ['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers']
  },
  review: {
    saveUrl: () => '/rates',
    itemsBeforeButton: ['vehicles', 'drivers', 'discounts'],
    itemsAfterButton:  [],
    showWarnings: true
  }
}

export default quoteScreenStructure
