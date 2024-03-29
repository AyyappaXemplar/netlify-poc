import React, { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { Container, Form, Button } from "react-bootstrap";
import { createQuote, zipCodeLookup } from "../../actions/quotes";
import { RESET_ADDRESS_OPTIONS } from "../../constants/quote-action-types";
import history from "../../history";
import mixpanel from "../../config/mixpanel";
import FormContainer from "../shared/FormContainer";
import FormAlert from "../shared/FormAlert";
import BadgeText from "../shared/BadgeText";
import SubmitButton from "../shared/SubmitButton";
import SpinnerScreen from "../shared/SpinnerScreen";
import AddressOptions from "../quote/AddressOptions";
import { Helmet } from "react-helmet";

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

function QuotesNew({ t, setAlert, location }) {
  const [state, localDispatch] = useReducer(quotesNewReducer, initialState);
  const { addressOptions, quote } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [localAlert, setLocalAlert] = useState(null);

  useEffect(() => {
    let queryParams = location?.search?.match(/zip_code=(\d{5})$/);
    queryParams = queryParams ? queryParams[1] : null;

    if (queryParams) {
      localDispatch({ type: "startZipCodeLookup", zip_code: queryParams });
      dispatch(zipCodeLookup(queryParams));
    } else if (location?.search) {
      setLocalAlert("Please enter a valid zipcode");
      localDispatch({ type: "displayForm" });
    } else {
      localDispatch({ type: "displayForm" });
    }
  }, [dispatch, location, setAlert]);

  useEffect(() => {
    if (addressOptions.length) {
      localDispatch({ type: "displayForm" });
    }
    addressOptions.length > 1 &&
      mixpanel.track("Pageview", {
        "Page Title": "City Input",
        "Section": "Quick Quote",
      });
  }, [addressOptions]);

  useEffect(() => {
    if (quote.id) {
      setAlert({
        variant: "success",
        text: `${t("congratulationsWeCover")} ${quote.zip_code}`,
      });
      history.push("/quotes/edit");
    } else if (quote.error) {
      history.push(`/quotes/not-covered?location=${state.address.zip_code}`);
    }
  }, [quote, setAlert, state.address.zip_code, t]);

  useEffect(
    () =>
      mixpanel.track("Pageview", {
        "Page Title": "Zipcode Input",
        "Section": "Quick Quote",
      }),
    []
  );

  const onChange = (address) => {
    localDispatch({ type: "setAddress", address });
  };
  const clearAddressOptions = () => {
    dispatch({ type: RESET_ADDRESS_OPTIONS });
    localDispatch({ type: "setAddress", address: { zip_code: "" } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    localDispatch({ type: "submitForm" });

    if (addressOptions.length) {
      mixpanel.track("City Submitted", {
        section: "Quick Quote",
        state: state.address.state,
        county: state.address.county,
        city: state.address.city,
      })
      const quoteParams = { address: state.address };
      dispatch(createQuote(quoteParams));
    } else {
      mixpanel.track("Zipcode Submitted", {
        "Section": "Quick Quote",
        zipcode: state.address.zip_code,
      });
      dispatch(zipCodeLookup(state.address.zip_code));
    }
  };

  if (state.renderForm) {
    return (
      <Container className="pt-base">
        <Helmet>
          <title>New quote | InsureOnline.com</title>
        </Helmet>
        <FormContainer bootstrapProperties={{ lg: 5, xl: 4 }}>
          {localAlert && <FormAlert text={localAlert} />}
          <div className="mb-5">
            {!!addressOptions.length ? (
              <>
                <h2 className="font-weight-bold">
                  {t("city.title")} {state.address.zip_code}
                </h2>
                <p>{t("city.subtitle")}</p>
              </>
            ) : (
              <h2 className="font-weight-bold">{t("new.title")}</h2>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-5">
              {!!addressOptions.length ? (
                <AddressOptions
                  addressOptions={addressOptions}
                  onChange={(option) => onChange(option[0].value)}
                />
              ) : (
                <>
                  <Form.Label>{t("new.form.zip.label")}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="60018"
                    value={state.address.zip_code}
                    onChange={(event) =>
                      onChange({ zip_code: event.target.value })
                    }
                    className="mb-3"
                  />
                </>
              )}
            </Form.Group>

            <div className="w-100 w-sm-75 mx-auto mb-3">
              <SubmitButton
                text={t("new.submit")}
                disabled={!state.enableSubmit}
                showSpinner={state.submitSpinner}
              />
            </div>
            <Button
              onClick={clearAddressOptions}
              variant="link"
              block
              className="text-primary p-0 text-decoration-none"
            >
              {t("new.form.cancel")}
            </Button>
          </Form>
        </FormContainer>
        <BadgeText />
      </Container>
    );
  } else {
    return <SpinnerScreen title="Checking your zip code for coverage" />;
  }
}

export default withTranslation(["quotes"])(QuotesNew);
