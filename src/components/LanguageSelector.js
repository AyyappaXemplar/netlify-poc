import React from "react"
import i18next from "i18next"
import langSelectIcon from "../images/language.svg"
import { Form } from "react-bootstrap"
export default function LanguageSelector() {
  const TOOLTIP_ID = "#langToolTip"
  const HIDE_CLASS = "hide"
  const RADIOS_SELECTORS = ".langRadioCheck > #radio"

  const toggleLangToolTip = () => {

    const tooltip = document.querySelector(TOOLTIP_ID)
    console.log(tooltip)
    if (tooltip !== undefined) tooltip.classList.toggle(HIDE_CLASS)
  }

  const handleCheckMark = e => {
    const radios = document.querySelectorAll(RADIOS_SELECTORS)

    if (radios.length >= 1) {
      radios.forEach(radio => {
        if (radio.checked === true) radio.checked = false

        e.target.checked = true
        setLang(e.target.value)
      })
    }
  }

  const setLang = lang => {
    i18next.changeLanguage(lang)
  }
  return (
    <>
      <img
        alt="language-selector-button"
        src={langSelectIcon}
        width="24px"
        height="24px"
        style={{ marginRight: "20px", cursor: "pointer" }}
        onClick={toggleLangToolTip}
      />
      <div className="hide" id="langToolTip">
        <Form className="langSelectForm">
          {["radio"].map(type => (
            <div key={`default-${type}`}>
              <Form.Check
                type={type}
                id={type}
                label={`English`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value="en-US"
              />
              <Form.Check
                type={type}
                label={`Spanish (Espanol)`}
                id={`${type}`}
                className="langRadioCheck"
                onClick={handleCheckMark}
                value="es"
              />
            </div>
          ))}
        </Form>
      </div>
    </>
  )
}