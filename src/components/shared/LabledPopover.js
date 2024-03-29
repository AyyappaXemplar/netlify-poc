import React                       from 'react';
import { Popover, OverlayTrigger } from "react-bootstrap";
import infoIcon                    from "../../images/Info.svg"

const LabledPopover = ({ title, copy, label, icon, }) => {
  const popover = (
    <Popover className="border-0 shadow-lg bg-white rounded" >
      <Popover.Content className="my-2">
        <strong>{title}</strong>
        <p>{copy}</p>
      </Popover.Content>
    </Popover>
  )

  return (
    <div className={'coverage-graph-item d-flex mb-3'} >
      <img src={icon} alt="" className={'mr-2'} /> <span className={'mr-2'}>{label}</span><OverlayTrigger
                  trigger={['hover', 'focus']}
                  key="top"
                  placement="bottom"
                  overlay={popover}
                >
                  <img className="d-inline rounded-circle ml-1" src={infoIcon} alt="info logo" style={{ width: "14px", height: "14px" }}/>
      </OverlayTrigger>
      </div>
  )
}

export default LabledPopover
