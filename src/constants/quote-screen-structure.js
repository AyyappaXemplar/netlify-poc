import { ProgressBarStatus } from './progress-bar-percentages';

const quoteScreenStructure = {
  vehicles: {
    saveUrl: '/drivers/new',
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  ['discounts'],
    progressBarStatus: ProgressBarStatus.VEHICLES
  },
  drivers: {
    saveUrl: '/quote/discounts',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles', 'discounts'],
    progressBarStatus: ProgressBarStatus.DRIVERS
  },
  discounts: {
    saveUrl: '/quote/complete',
    itemsBeforeButton: ['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers'],
    progressBarStatus: ProgressBarStatus.DISCOUNTS
  },
  complete: {
    saveUrl: '/quote/submit',
    itemsBeforeButton: ['vehicles', 'drivers', 'discounts'],
    itemsAfterButton:  [],
    progressBarStatus: ProgressBarStatus.DISCOUNTS,
    showWarnings: true
  }
}

export default quoteScreenStructure
