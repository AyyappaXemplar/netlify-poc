import { ProgressBarStatus } from './progress-bar-percentages';

const quoteScreenStructure = {
  vehicles: {
    saveUrl: '/drivers/new',
    itemsBeforeButton: ['vehicles'],
    itemsAfterButton:  ['discounts'],
    progressBarStatus: ProgressBarStatus.VEHICLES,
  },
  drivers: {
    saveUrl: '/quotes/discounts',
    itemsBeforeButton: ['drivers'],
    itemsAfterButton:  ['vehicles', 'discounts'],
    progressBarStatus: ProgressBarStatus.DRIVERS
  },
  discounts: {
    saveUrl: '/quotes/complete',
    itemsBeforeButton: ['discounts'],
    itemsAfterButton:  ['vehicles', 'drivers'],
    progressBarStatus: ProgressBarStatus.DISCOUNTS
  },
  complete: {
    saveUrl: '/quotes/submit',
    itemsBeforeButton: ['vehicles', 'drivers', 'discounts'],
    itemsAfterButton:  [],
    progressBarStatus: ProgressBarStatus.DISCOUNTS,
    showWarnings: true
  }
}

export default quoteScreenStructure
