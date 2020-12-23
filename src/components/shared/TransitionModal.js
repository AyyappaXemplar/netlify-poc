import React from 'react';
import { Modal } from 'react-bootstrap';
import './TransitionModal.scss';

export default function TransitionModal({show}) {
  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div>
	        <p>We are now transferring you to a secure portal to purchase your policy.</p>
	        <div className="spinner-border spinner-border-lg my-5"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
