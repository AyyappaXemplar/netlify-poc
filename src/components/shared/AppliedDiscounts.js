import React                       from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { ReactComponent as CheckIcon }  from '../../images/check-circle-fill.svg';

function AppliedDiscounts({ discounts }) {
  if (!discounts.length) return false

  const popover = (discounts) => (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="bg-primary text-white">Applied Discounts</Popover.Title>
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

      <OverlayTrigger trigger={['click', 'hover', 'focus']} placement="right" overlay={popover(discounts)}>
        <span className="text-medium-dark discount-tooltip">(view details)</span>
      </OverlayTrigger>
    </div>

  );
}

export default AppliedDiscounts;
