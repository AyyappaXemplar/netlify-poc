import React from "react";

const IconListItem = ({check, flexRow, infoIcon, copy, header, index, shadow}) => {
  return (
    <div
      className={`quote-item-card quote-item-card__policy-terms d-flex align-items-center bg-white ${shadow ? "shadow" : null}`}
      key={index + 1}
    >
      <div className={"mr-3 text-success"}>{check}</div>
      <div className={`d-flex ${flexRow ? flexRow : "flex-column" } flex-grow-1`}>
        <div className="title col-xs-12">
          {header}
          {infoIcon ? infoIcon : null}
        </div>
        <div className="price col-xs-12">{copy}</div>
      </div>
    </div>
  );
};

export default IconListItem;
