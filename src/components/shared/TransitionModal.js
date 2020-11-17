import React from 'react';
import { Modal } from 'react-bootstrap';
import './TransitionModal.scss';

export default function TransitionModal({show}) {
  return (
      <Modal show={show} size="lg" centered>
        <Modal.Body>
          We are now transferring you to a secure portal to purchase your policy.
          <p><div className="spinner-border spinner-border-lg"></div></p>
        </Modal.Body>
      </Modal>
  );
}