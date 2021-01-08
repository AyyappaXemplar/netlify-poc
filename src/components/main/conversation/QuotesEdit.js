import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withTranslation } from "react-i18next";
import { Form, Button, Container } from "react-bootstrap";
import history from "../../../history";
import { updateQuote } from "../../../actions/quotes.js";
import { addMessage } from "../../../actions/messages";
// import StartOverButton from "../../shared/StartOverButton";
// import Radio from "../../forms/Radio";

function ConversationQuotesEdit({ t }) {
  const quote = useSelector((state) => state.data.quote);
  const updatingQuoteInfo = useSelector(
    (state) => state.state.updatingQuoteInfo
  );
  const formPrevFilled = localStorage.getItem("filledQuoteEdit") && quote;
  const dispatch = useDispatch();
  const [currently_insured, setInsured] = useState(
    formPrevFilled ? quote.currently_insured : undefined
  );
  const [homeowner, setHomeowner] = useState(
    formPrevFilled ? quote.homeowner : undefined
  );
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const initialMessage = {
      from: "bot",
      statements: [
        "Perfect! Let’s get some more information. What’s your name?",
      ],
    };
    dispatch(addMessage(initialMessage));
  }, [dispatch]);

  useEffect(() => {
    if (submitted && !updatingQuoteInfo) {
      history.push("/conversation/vehicles/new");
    }
  }, [submitted, updatingQuoteInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("filledQuoteEdit", true);
    dispatch(updateQuote({ currently_insured, homeowner }));
    // setSubmitted(true);
  };

  const NAME_UI = "name";
  const HOMEOWNER_UI = "isHomeOwner";
  const INSURED_UI = "isInsured";
  const [nameState, updateNameState] = useState("");
  const [uiTypeState, updateUiTypeState] = useState(NAME_UI);

  /** handlers for input selections  */

  const handleHomeOwnerSelection = (label) => {
    if (label === "Own") {
      setHomeowner(true);
      const ownersMessage = {
        from: "user",
        statements: ["I own my own home"],
      };

      const botMessage = {
        from: "bot",
        statements: [
          "Great, thanks for that! You'll get a homeowners discount as well!",
        ],
      };

      dispatch(addMessage(ownersMessage));

      setTimeout(() => {
        dispatch(addMessage(botMessage));
        isInsuredResponse();
      }, 1000);
    } else if (label === "Rent") {
      setHomeowner(false);
      const botNotInsuredResponse = {
        from: "bot",
        statements: ["No worries"],
      };
      dispatch(addMessage(botNotInsuredResponse));
      isInsuredResponse();
    }
  };

  const handleNameInput = () => {
    const nameMessage = {
      from: "user",
      statements: [nameState],
    };
    dispatch(addMessage(nameMessage));
    isHomeOwnerResponse();
  };

  const handleIsInsuredSelection = (isInsuredBoleen) => {
    if (isInsuredBoleen) {
      setInsured(isInsuredBoleen);
      const botResponse = {
        from: "bot",
        statements: [
          "Nice! Being insured will give you an additional discount as well!",
          "Let’s add a vehicle. Click the button below to add your first vehicle.",
        ],
      };
      dispatch(addMessage(botResponse));
    } else {
      const botNotInsuredResponse = {
        from: "bot",
        statments: ["No worries !", "Let's move on"],
      };
      dispatch(addMessage(botNotInsuredResponse));
      setInsured(isInsuredBoleen);
    }

    localStorage.setItem("filledQuoteEdit", true);
    setSubmitted(true);
    dispatch(updateQuote({ currently_insured: isInsuredBoleen, homeowner }));
  };

  /** chat responses  */

  const isInsuredResponse = () => {
    const botResponse = {
      from: "bot",
      statements: ["Are you insured?"],
    };

    updateUiTypeState(INSURED_UI);

    dispatch(addMessage(botResponse));
  };
  // next response in chat plus save name to localstorage for later retrieval
  const isHomeOwnerResponse = () => {
    const botNameResponse = {
      from: "bot",
      statements: [
        `Nice to meet you, ${nameState}! Now we can start with some basic information about yourself.`,
      ],
    };
    const botNameResponse2 = {
      from: "bot",
      statements: [`Do you own or rent?`],
    };

    window.localStorage.setItem("userName", `${nameState}`);

    // mimic chat - TO DO: find better way to do this
    setTimeout(() => {
      dispatch(addMessage(botNameResponse));
    }, 1000);
    setTimeout(() => {
      dispatch(addMessage(botNameResponse2));
      updateUiTypeState(HOMEOWNER_UI);
    }, 2000);
  };
  /** render UI functions */
  const renderNameInput = () => {
    return (
      <div className={"flex mb-3"}>
        <Form.Control
          type="name"
          placeholder="name"
          className="rounded-pill uiContainer__zipInput"
          onChange={(e) => {
            updateNameState(e.target.value);
          }}
        />
        <Button
          type="submit"
          className={"uiContainer__submit"}
          onClick={handleNameInput}
        ></Button>
        <br />
      </div>
    );
  };

  const renderHomeOwnerUi = () => {
    return (
      <div className="mb-3 flex" style={{ justifyContent: "space-around" }}>
        {t("edit.fields.home.options").map((item, index) => (
          <Button
            onClick={() => {
              return handleHomeOwnerSelection(item.label);
            }}
            type={"button"}
            id={`info-home-${item.value}`}
            label={item.label}
            value={item.value}
            key={index}
            selected={homeowner === item.value}
            onChange={() => setHomeowner(item.value)}
            className={"col-6 rounded-pill"}
            style={{ maxWidth: "160px" }}
          >
            {`I ${item.label}`}
          </Button>
        ))}
      </div>
    );
  };

  const renderinsuredUi = () => {
    return (
      <div className="mb-3 flex" style={{ justifyContent: "space-around" }}>
        {t("edit.fields.home.insuredOptions").map((item, index) => (
          <Button
            onClick={() => {
              return handleIsInsuredSelection(true);
            }}
            type={"button"}
            id={`info-home-${item.value}`}
            label={item.label}
            value={item.value}
            key={index}
            selected={homeowner === item.value}
            onChange={() => {}}
            className={"col-6 rounded-pill"}
            style={{ maxWidth: "160px" }}
          >
            {`${item.label}`}
          </Button>
        ))}
      </div>
    );
  };

  const filterUI = (uiTypeState) => {
    switch (uiTypeState) {
      case NAME_UI: {
        return renderNameInput();
      }
      case HOMEOWNER_UI: {
        return renderHomeOwnerUi();
      }
      case INSURED_UI: {
        return renderinsuredUi();
      }
      default: {
        return renderNameInput();
      }
    }
  };

  return (
    <>
      <Container className="uiContainer">
        <Form onSubmit={handleSubmit}>
          <hr />
          {filterUI(uiTypeState)}
        </Form>
      </Container>
    </>
  );
}

export default withTranslation(["quotes"])(ConversationQuotesEdit);
