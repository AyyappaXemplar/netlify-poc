import React                from "react";
import { Modal, Button }    from "react-bootstrap";
import { withTranslation }  from "react-i18next";
import CircleIcon           from "../../shared/CircleIcon";
import iconImage            from "../../../images/signature_icon.svg";

const SignatureModal = ({ showSignatureModalState, updateShowModalState, t }) => {
  return (
    <>
      <Modal
        show={showSignatureModalState}
        onHide={()=>updateShowModalState(false)}
        size={"md"}
        className={"reviewPageModal"}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0" >
          <CircleIcon iconSrc={iconImage} />
          <p className="p-3">
            <strong>{t("SignatureModal.header")}</strong>
                  </p>
                  <p className="mb-5">{t("SignatureModal.message")}</p>

          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> updateShowModalState(false)}
          >{t("SignatureModal.cta")}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTranslation(["modals"])(SignatureModal);
