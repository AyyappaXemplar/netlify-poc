import React from 'react';
import { withTranslation } from 'react-i18next';

function CoverageStrength({ strength }) {
  const BAR_FILLS = {
    LIABILITY: ['var(--accent)', 'currentColor', 'currentColor'],
    GOOD: ['var(--accent)', 'var(--accent)', "currentColor"],
    BETTER: ['var(--accent)', 'var(--accent)', 'var(--accent)']
  }

  const PACKAGE = {
    LIABILITY: "Basic",
    GOOD:      "Good",
    BETTER:    "Comprehensive"
  }

  const barFills = BAR_FILLS[strength]

  return (
    <div>
      <svg width="1rem" height="1rem"
           viewBox="0 1.5 27 16" version="1.1"
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
      <span>{PACKAGE[strength]} Coverage</span>
    </div>
  )
}

export default withTranslation(['quotes'])(CoverageStrength)
