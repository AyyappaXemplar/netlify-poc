import React                               from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { ReactComponent as CheckIcon }     from '../../images/check-circle-fill.svg';
import { withTranslation } from 'react-i18next';

function AppliedDiscounts({ discounts, t }) {
  if (!discounts.length) return false

  const popover = (discounts) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Applied Discounts</Popover.Title>
      <Popover.Content>
        {discounts.map((discount) => <li key={discount}>{discount}</li>)}
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="coverage-graph-item d-flex align-items">
      <span className="text-success">
        <CheckIcon/>
      </span>
      <span>{discounts.length} {t("DiscountsApplied")}</span>{' '}
      <OverlayTrigger trigger={['click']} placement="right" overlay={popover(discounts)} rootClose={true}>
        <Button variant="link" size="sm" className="text-medium-dark p-0 discount-tooltip text-decoration-none">&nbsp;{t("viewDetails")}</Button>
      </OverlayTrigger>
    </div>
  );
}

export default withTranslation(['quotes'])(AppliedDiscounts);