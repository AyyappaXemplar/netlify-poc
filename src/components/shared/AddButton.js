import React from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import { ReactComponent as PlusIcon } from '../../images/plus-circle-fill.svg';
import './AddButton.scss';

function AddButton({ onClick, text, disabled }) {
  const addVehicleClassNames = classNames(
    'border-0 rounded-0 mb-5 text-dark font-weight-bolder d-flex justify-content-center align-items-center',
    { disabled }
  )

  return (
    <Button
      className={addVehicleClassNames}
      size="lg"
      variant="med-light"
      onClick={onClick}
      block>
      <PlusIcon className="mr-2 plus-icon"/>
      {text}
    </Button>
  );
}

export default AddButton;
