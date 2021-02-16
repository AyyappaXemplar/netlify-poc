import React from "react";
import { Modal, Button } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import CircleIcon from "../../shared/CircleIcon";
import iconImage from "../../../images/sheild_icon.svg";

const ReviewModal = ({ showReviewModalState, t }) => {
  return (
    <>
      <Modal
        show={showReviewModalState}
        size={"md"}
        className={"reviewPageModal"}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0" style={{ textAlign: "left" }}>{/**override bootstrap text align - rule  */}
          <CircleIcon iconSrc={iconImage} />
          <p className="p-3">
            <strong>{t("QuotesReviewPageModal.header")}</strong>
          </p>
          <ul className="p-4">
            {t("QuotesReviewPageModal.list").map((item, i) => {
              return <li>{item}</li>;
            })}
          </ul>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg mb-3"
            size="lg"
          >
            close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTranslation(["modals"])(ReviewModal);
