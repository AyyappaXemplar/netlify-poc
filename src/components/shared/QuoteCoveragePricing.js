import React from 'react';
import { withTranslation } from 'react-i18next';

const BAR_FILLS = {
  1: ['var(--accent)', 'currentColor', 'currentColor'],
  2: ['var(--accent)', 'var(--accent)', "currentColor"],
  3: ['var(--accent)', 'var(--accent)', 'var(--accent)']
}
class QuoteCoverageStrength extends React.Component {
  render() {
    const { strength } = this.props
    const barFills = BAR_FILLS[strength]

    return (
      <div className="mb-3">
        <svg width="26px" height="26px" viewBox="0 0 26 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
        {/*   <g id="Styleguide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" font-family="CamphorPro-Heavy" font-size="12" font-weight="600"> */}
        {/*     <g transform="translate(-354.000000, -4353.000000)" id="Components"> */}
        {/*       <g transform="translate(80.000000, 2634.000000)"> */}
        {/*         <g id="Cards" transform="translate(1.000000, 618.000000)"> */}
        {/*           <g id="Vehicle-Rate-Card" transform="translate(0.000000, 780.000000)"> */}
        {/*             <g id="BMW" transform="translate(0.000000, 48.000000)"> */}
        {/*               <g id="Pricing-Overview" transform="translate(30.000000, 207.000000)"> */}
        {/*                 <g id="price" transform="translate(243.000000, 60.000000)"> */}
                  <g id="Icons-/-Value-/-Moderate">
                             <text id="$" fill={barFills[0]}>
                               <tspan x="0.122" y="13">$</tspan>
                             </text>
                             <text id="$" fill={barFills[0]}>
                               <tspan x="9.122" y="13">$</tspan>
                             </text>
                             <text id="$" fill={barFills[0]}>
                               <tspan x="19.122" y="13">$</tspan>
                             </text>
                           </g>
        {/*                 </g> */}
        {/*               </g> */}
        {/*             </g> */}
        {/*           </g> */}
        {/*         </g> */}
        {/*       </g> */}
        {/*     </g> */}
        {/*   </g> */}
        </svg>
        {/* <span>$</span> */}
        {/* <span>$</span> */}
        {/* <span>$</span> */}
        {/* <span className="ml-1">Basic Coverage</span> */}
      </div>
    )
  }

}

export default withTranslation(['quotes'])(QuoteCoverageStrength)
