import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { addMessage } from "../../../actions/messages";
import { createQuote, zipCodeLookup } from "../../../actions/quotes";
import history from "../../../history";
import SpinnerScreen from "../../shared/SpinnerScreen";
import AddressOptions from "../../quote/AddressOptions";

const initialState = {
  address: { zip_code: "" },
  renderForm: false,
  enableSubmit: false,
};

function checkValidZipCode(zip_code) {
  return !!zip_code.match(/^\d{5}$/);
}

function quotesNewReducer(state, action) {
  switch (action.type) {
    case "setAddress": {
      action.address.zip_code = action.address.zip_code.slice(0, 5);
      const address = { ...state.address, ...action.address };
      const enableSubmit = checkValidZipCode(action.address.zip_code);
      return { ...state, address, enableSubmit };
    }
    case "displayForm": {
      return { ...state, submitSpinner: false, renderForm: true };
    }
    case "submitForm": {
      return { ...state, submitSpinner: true, enableSubmit: false };
    }
    case "startZipCodeLookup": {
      const address = { ...state.address, zip_code: action.zip_code };
      return { ...state, rederForm: false, address };
    }
    default:
      throw new Error();
  }
}

function ConversationQuotesNew({ t, setAlert, location }) {
  const [state, localDispatch] = useReducer(quotesNewReducer, initialState);
  const { addressOptions, quote } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialMessage = {
      from: "bot",
      statements: [
        "Hey! I'm Anne. I'm happy to help you get an auto quote!",
        "What's your zip code?",
      ],
    };
    dispatch(addMessage(initialMessage));
  }, [dispatch]);

  useEffect(() => {
    let queryParams = location?.search?.match(/zip_code=(\d{5})$/);
    queryParams = queryParams ? queryParams[1] : null;

    if (queryParams) {
      localDispatch({ type: "startZipCodeLookup", zip_code: queryParams });
      dispatch(zipCodeLookup(queryParams));
    } else if (location?.search) {
      // setLocalAlert("Please enter a valid zipcode")
      localDispatch({ type: "displayForm" });
    } else {
      localDispatch({ type: "displayForm" });
    }
  }, [dispatch, location, setAlert]);

  useEffect(() => {
    if (addressOptions.length) localDispatch({ type: "displayForm" });
  }, [addressOptions]);

  useEffect(() => {
    if (quote.id) {
      history.push("/conversation/quotes/edit");
    } else if (quote.error) {
      history.push(
        `/conversation/quotes/not-covered?location=${state.address.zip_code}`
      );
    }
  }, [quote, setAlert, state.address.zip_code, dispatch]);

  const onChange = (address) => localDispatch({ type: "setAddress", address });

  const handleSubmit = (event) => {
    event.preventDefault();
    localDispatch({ type: "submitForm" });

    dispatch(
      addMessage({ from: "user", statements: [state.address.zip_code] })
    );
    const quoteParams = { address: state.address };

    if (addressOptions.length) {
      dispatch(createQuote(quoteParams));
    } else {
      dispatch(zipCodeLookup(state.address.zip_code));
    }
  };

  if (state.renderForm) {
    return (
      <>
        <Container className="uiContainer">
          <Row>
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  {!!addressOptions.length ? (
                    <>
                      <AddressOptions
                        addressOptions={addressOptions}
                        onChange={(option) => onChange(option[0].value)}
                      />
                      <br />
                      <Button
                        // disabled={!state.enableSubmit}
                        // showSpinner={state.submitSpinner}
                        className={"rounded-pill"}
                      >
                        {t("new.submit")}
                      </Button>
                    </>
                  ) : (
                    <div className={"flex"}>
                      <Form.Control
                        type="zip"
                        placeholder="60018"
                        value={state.address.zip_code}
                        onChange={(event) =>
                          onChange({ zip_code: event.target.value })
                        }
                        className="rounded-pill uiContainer__zipInput"
                      />
                      <Button type="submit" className={"uiContainer__submit"}>
                        &gt;
                      </Button>
                    </div>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return <SpinnerScreen title="Checking your zip code for coverage" />;
  }
}

export default withTranslation(["quotes"])(ConversationQuotesNew);
