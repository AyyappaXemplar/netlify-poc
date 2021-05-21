import React, { useState, useEffect }               from "react";
import { useLocation }                   from 'react-router-dom';
import i18next                           from "i18next";
import langSelectIcon                    from "../images/language.svg";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

export default function LanguageSelector() {

  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState(localStorage.i18nextLng);
  const location = useLocation();
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

  useEffect(() => {

    const LANG_KEY = 'lan'
    const param = new URLSearchParams(location.search).get(LANG_KEY);

    if (param) {
      switch (param) {
        case "en-US":
          setLang("en");
          setLanguage("en-US");
          break;

        case "en":
          setLang("en");
          setLanguage("en-US");
          break;

        case "es":
          setLang("es");
          setLanguage("es");
          break;
        default:
          break;
      }
    }

}, [location])


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
               // ref={radioDefault}
                checked={language === 'en-US' ? true : false}
              />
              <Form.Check
                type={type}
                label={`Spanish (Espanol)`}
                id={`${type}`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value='es'
               // ref={radioNotDefault}
                checked={language === 'es' ? true : false}
              />
            </div>
          ))}
        </Form>
      </Popover>
    );

    return (
    <>
      <OverlayTrigger show={show} trigger="click" placement="left" overlay={popover}>
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
