import React from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { withTranslation } from "react-i18next";

import CircleIcon from "../../shared/CircleIcon";
import iconImage from "../../../images/vehicle_vin_icon.svg";
import vinGraph from "../../../images/vin_graph.png"

const VehicleRevieVinModal = ({ showVinModal, setShowVinModal, t }) => {
  return (
    <>
      <Modal
        show={showVinModal}
        onHide={()=>setShowVinModal(false)}
        size={"md"}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="flex-column px-5 pb-5 pt-0">
          <CircleIcon iconSrc={iconImage} />
          <p className="p-3 mb-3">
            <strong>{t("VehiclesVinModal.header")}</strong>
          </p>
          <p>{ t("VehiclesVinModal.copy")}</p>
          <Image src={vinGraph} className="p-3" fluid/>
          <Button
            className="rounded-pill btn btn-primary btn-block btn-lg"
            size="lg"
            onClick={()=> setShowVinModal(false)}
          >{t("close")}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTranslation(["common"])(VehicleRevieVinModal);
