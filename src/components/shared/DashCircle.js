import React from 'react';

export default function DashCircle({circleFill = 'white', rectFill = 'var(--danger', classes = ""}) {
  return (
    <svg width="22px"  height="22px" viewBox="0 0 22 22" version="1.1" xmlns="https://www.w3.org/2000/svg" className={classes}>
      <path d="M11,22 C4.92468619,22 0,17.0753138 0,11 C0,4.92468619 4.92468619,0 11,0 C17.0753138,0 22,4.87866109 22,10.9539749 C22,17.0292887 17.0753138,22 11,22 L11,22 Z" id="Fill-41" fill={circleFill} fillRule="nonzero"></path>
      <rect id="Rectangle" fill={rectFill} x="4.88888889" y="9.77777778" width="12.2222222" height="2.44444444" rx="1.22222222"></rect>
    </svg>
  )
}
