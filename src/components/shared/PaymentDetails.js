import React                               from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { getAmount, getDeposit, getInstallmentFee } from '../../services/rate-payment-details';
import { withTranslation } from 'react-i18next';

function PaymentDetails({ option, t }) {
  if (option.plan_type === 'pay_in_full') {
    return <span className="d-block price-fees text-medium-dark">That's all you'll pay!</span>
  }

  let amount = getAmount(option)
  let deposit = getDeposit(option)
  let installment_fee = getInstallmentFee(option)

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{t("accidentsAndViolations.popover.title")}</Popover.Title>
      <Popover.Content>
        <h5>{t("accidentsAndViolations.popover.contentTitle")}</h5>
        <ul className='pl-3 mb-2'>
          <li className="font-weight-bolder">${deposit} deposit (deposit amount)</li>
          <li className="font-weight-bolder">{option.number_of_payments} payments of ${amount} (includes a ${installment_fee} fee)</li>
        </ul>
        <span className="font-weight-bolder text-dark py-0 my-0">{t("accidentsAndViolations.popover.body")}</span>
      </Popover.Content>
    </Popover>
  );

  return (
    <span className="d-block price-fees leading-none">
      <OverlayTrigger trigger={['focus', 'hover']} placement="top-start" overlay={popover} rootClose={true}>
        <Button variant="link" className="text-medium-dark p-0 border-0 text-decoration-none">View payment breakdown</Button>
      </OverlayTrigger>
    </span>
  );
}

export default withTranslation(['common'])(PaymentDetails);