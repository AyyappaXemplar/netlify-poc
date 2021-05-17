import React, {useState, useRef, useEffect} from "react";
import i18next from "i18next";
import langSelectIcon from "../images/language.svg";
import { Form, OverlayTrigger, Popover, Overlay } from "react-bootstrap";
export default function LanguageSelector() {
  // const TOOLTIP_ID = "#langToolTip";
  // const HIDE_CLASS = "hide";
  const RADIOS_SELECTORS = ".langRadioCheck > #radio";
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const radioDefault = useRef(null)
  const radioNotDefault = useRef(null)

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleCheckMark = (e) => {
    const radios = document.querySelectorAll(RADIOS_SELECTORS);

    if (radios.length >= 1) {
      radios.forEach((radio) => {
        if (radio.checked === true) radio.checked = false;

        e.target.checked = true;
        setLang(e.target.value);
      });
    }
  };
  useEffect(() => {
    if (typeof window !== `undefined`) {
      const lang = window.localStorage.getItem("gatsby-i18next-language")
      console.log('el', radioDefault, lang)
      if (lang === "en") {
     
        //radioDefault.current.checked = true
      } else {
        //radioNotDefault.current.checked = true
      }
    }
  })
  const setLang = (lang) => {
    i18next.changeLanguage(lang);
  };

  const popover = () => {
    return (
      
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
     <Popover id="langToolTip">
        <Form className="langSelectForm" id="">
          {["radio"].map((type) => (
            <div key={`default-${type}`}>
              <Form.Check
                type={type}
                id={type}
                label={`English`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value="en-US"
                ref={radioDefault}
              />
              <Form.Check
                type={type}
                label={`Spanish (Espanol)`}
                id={`${type}`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value="es"
                ref={radioNotDefault}
              />
            </div>
          ))}
        </Form>
        </Popover>
        </Overlay>
    );
  };
  return (
    <>
      <OverlayTrigger trigger="click" placement="right" overlay={popover}>
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
