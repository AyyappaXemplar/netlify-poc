import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import CircleIcon from "../../shared/CircleIcon";
import iconImage from "../../../images/sheild_icon.svg";
import vinGraph from "../../../images/vin_graph.png"

const VehicleRevieVinModal = ({ showVinModalState, updateShowVinModalState, t }) => {
  return (
    <>
      <Modal
        show={showVinModalState}
        onHide={()=>updateShowVinModalState(false)}
        size={"md"}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">{/**override bootstrap text align - rule  */}
          <CircleIcon iconSrc={iconImage} />
          <p className="p-3 mb-3">
            <strong>{t("VehiclesVinModal.header")}</strong>
          </p>
          <p>{ t("VehiclesVinModal.copy")}</p>
          <Image src={vinGraph} className="p-3" fluid/>
          
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> updateShowVinModalState(false)}
          >Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTranslation(["modals"])(VehicleRevieVinModal);
