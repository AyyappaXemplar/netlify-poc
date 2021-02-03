import React from "react";

const IconListItem = (props) => {
  return (
    <div
      className="quote-item-card quote-item-card__policy-terms d-flex align-items-center"
      key={props.index + 1}
    >
      <div className={"mr-3 text-success"}>{props.check}</div>
      <div className="d-flex flex-row flex-grow-1 ">
        <div className="title col-xs-12">
          {props.header}
          {props.infoIcon ? props.infoIcon : null}
        </div>
        <div className="price col-xs-12">{props.copy}</div>
      </div>
    </div>
  );
};

export default IconListItem;
