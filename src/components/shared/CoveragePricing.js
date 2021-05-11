import React from 'react';
import { withTranslation } from 'react-i18next';

function CoveragePricing({ strength, t }) {
  const BAR_FILLS = {
    LIABILITY: ['var(--accent)', 'currentColor', 'currentColor'],
    GOOD: ['var(--accent)', 'var(--accent)', "currentColor"],
    BETTER: ['var(--accent)', 'var(--accent)', 'var(--accent)']
  }

  const PACKAGE = {
    LIABILITY: t("pricingLabels.LIAIBLITY"),
    GOOD:      t("pricingLabels.GOOD"),
    BETTER:    t("pricingLabels.BETTER")
  }

  const barFills = BAR_FILLS[strength]

  return (
    <div className="coverage-graph-item coverage-pricing-item">
      <svg width="1rem" height="1rem"
           viewBox="0 0 27 16" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           style={{color: 'var(--gray-200)'}}>
        <g id="Styleguide" stroke="none" fill="none" fontFamily="Lato" fontSize="12" fontWeight="600">
          <text id="$" fill={barFills[0]}>
            <tspan x="0.122" y="13">$</tspan>
          </text>
          <text id="$$" fill={barFills[1]}>
            <tspan x="8.122" y="13">$</tspan>
          </text>
          <text id="$$$" fill={barFills[2]}>
            <tspan x="16.122" y="13">$</tspan>
          </text>
        </g>
      </svg>
      <span>{PACKAGE[strength]}</span>
    </div>
  )
}

export default withTranslation(['quotes'])(CoveragePricing)
