import React, { useState, useRef } from "react";
import i18next from "i18next";
import langSelectIcon from "../images/language.svg";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

export default function LanguageSelector() {
  const [show, setShow] = useState(false);
  const radioDefault = useRef(null)
  const radioNotDefault = useRef(null)
  const [language, setLanguage] = useState(localStorage.i18nextLng)

  const handleClick = () => {
    setShow(!show);
  };

  const handleCheckMark = (e) => {
    setShow(!show)
    setLang(e.target.value);
  };

  const setLang = (lang) => {
    i18next.changeLanguage(lang);
    setLanguage(lang)
  };

  const popover = (
     <Popover id="langToolTip">
        <Form className="langSelectForm" id="">
          {["radio"].map(type => (
            <div key={`default-${type}`}>
              <Form.Check
                type={type}
                id={type}
                label={`English`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value='en-US'
                ref={radioDefault}
                checked={language === 'en-US' ? true : false}
              />
              <Form.Check
                type={type}
                label={`Spanish (Espanol)`}
                id={`${type}`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value='es'
                ref={radioNotDefault}
                checked={language === 'es' ? true : false}
              />
            </div>
          ))}
        </Form>
      </Popover>
    );

    return (
    <>
      <OverlayTrigger show={show} trigger="click" placement="right" overlay={popover}>
        <img
          alt="language-selector-button"
          src={langSelectIcon}
          width="24px"
          height="24px"
          style={{ marginRight: "20px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </OverlayTrigger>
    </>
  );
}