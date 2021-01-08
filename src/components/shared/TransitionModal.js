import React from 'react';
import { Modal } from 'react-bootstrap';
import './TransitionModal.scss';

export default function TransitionModal({show}) {
  return (
    <Modal show={show} size="lg" centered>
      <Modal.Body>
        <div>
	        <h4 className='my-5'>We are now transferring you to a secure portal to purchase your policy.</h4>
	        <div className="spinner-border spinner-border-lg mb-5"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
