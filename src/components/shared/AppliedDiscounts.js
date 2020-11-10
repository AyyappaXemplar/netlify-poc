import React                               from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { ReactComponent as CheckIcon }     from '../../images/check-circle-fill.svg';

function AppliedDiscounts({ discounts }) {
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
    <div className="coverage-graph-item">
      <span className="text-success">
        <CheckIcon/>
      </span>
      <span>{discounts.length} Discounts Applied</span>{' '}

      <OverlayTrigger trigger={['click']} placement="right" overlay={popover(discounts)} rootClose={true}>
        <Button variant="link" size="sm" className="text-medium-dark p-0 discount-tooltip">(view details)</Button>
      </OverlayTrigger>
    </div>

  );
}

export default AppliedDiscounts;
