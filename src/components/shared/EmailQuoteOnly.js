import React, { useEffect, useReducer } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendQuoteRequestByEmail } from "../../actions/quotes";
import { setAlert } from "../../actions/state";
import "./TransitionModal.scss";
import SubmitButton from "./SubmitButton";
import { ReactComponent as EnvelopeIcon } from "../../images/envelope.svg";

const initialState = {
  email: "",
  fullName: "",
  phoneNumber: "",
  enableSubmit: false,
  submitSpinner: false,
  
};

function checkValidEmail(email) {
  return !!email.match(/.+@.+\..+/);
}

function quotesNewReducer(state, action) {
  switch (action.type) {
    case "setEmail": {
      const email = action.email;
      const enableSubmit = checkValidEmail(action.email);
      return { ...state, email, enableSubmit };
    }
    case "setFullName": {
      const fullName = action.fullName;
      return { ...state, fullName };
    }
    case "setPhoneNumber": {
      const phoneNumber = action.phoneNumber;
      return { ...state, phoneNumber };
    }
    case "submitForm": {
      return { ...state, submitted: true, enableSubmit: false };
    }
    case "reset": {
      return initialState;
    }
    default:
      throw new Error();
  }
}

export default function EmailQuoteModal({ show, setShow }) {
  const [state, localDispatch] = useReducer(quotesNewReducer, initialState);
  const dispatch = useDispatch();
  const emailingQuote = useSelector((state) => state.state.emailingQuote);

  useEffect(() => {
    if (state.submitted && !emailingQuote) {
      localDispatch({ type: "reset" });
      const alert = {
        variant: "success",
        text: `We emailed your quote to ${state.email}`,
      };
      dispatch(setAlert(alert));
      setShow(false);
    }
  }, [setShow, state.submitted, state.email, dispatch, emailingQuote]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localDispatch({ type: "submitForm" });
    dispatch(sendQuoteRequestByEmail(state.email, state.fullName, state.phoneNumber));
  };

  const onChange = (event) => {
    const email = event.target.value;
    localDispatch({ type: "setEmail", email });
  };

  const onChangeName = (event) => {
    const fullName = event.target.value;
    localDispatch({ type: "setFullName", fullName });
  };

  const onChangePhone = (event) => {
    const phoneNumber = event.target.value;
    localDispatch({ type: "setPhoneNumber", phoneNumber });
  };


  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div className="m-5">
          <div className="envelope-oval mx-auto rounded-circle mb-3">
            <EnvelopeIcon />
          </div>
          <h5 className="mb-4 text-dark">Have a licensed agent contact me</h5>
          <p className="mb-4">
            Please provide your information below and one of our licensed agent
            weill reach back as soon as possible about your quote.
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control
                type="text"
                required={true}
                placeholder="Full Name"
                value={state.fullName}
                onChange={onChangeName}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control
                type="email"
                required={true}
                placeholder="Email Address"
                value={state.email}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Control
                type="number"
                pattern="[0-9]*"
                required={true}
                placeholder="Phone Number"
                value={state.phoneNumber}
                onChange={onChangePhone}
              />
            </Form.Group>

            <div className="mb-4">
              <SubmitButton
                text="Send My Information "
                disabled={!state.enableSubmit}
                showSpinner={state.submitted}
              />
            </div>
          </Form>

          <Button
            variant="link"
            className="bg-white border-0 p-0 text-dark mb-5"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
