import React from 'react';
import { withTranslation } from 'react-i18next';

class QuoteCoverageStrength extends React.Component {
  BAR_FILLS = {
    LIABILITY: ['var(--accent)', 'currentColor', 'currentColor'],
    GOOD: ['var(--accent)', 'var(--accent)', "currentColor"],
    BETTER: ['var(--accent)', 'var(--accent)', 'var(--accent)']
  }

  render() {
    const { strength } = this.props
    const barFills = this.BAR_FILLS[strength]

    return (
      <div>
        <svg width="1rem" height="1rem" viewBox="0 0 16 16"
             fill="currentColor"
             xmlns="http://www.w3.org/2000/svg"
             style={{color: 'var(--gray-200)'}}>
          <rect width="3" height="5" x="1" y="10" fill={barFills[0]}/>
          <rect width="3" height="9" x="6" y="6" fill={barFills[1]}/>
          <rect width="3" height="14" x="11" y="1" fill={barFills[2]} />
        </svg>
        Basic Coverage
      </div>
    )
  }

}

export default withTranslation(['quotes'])(QuoteCoverageStrength)