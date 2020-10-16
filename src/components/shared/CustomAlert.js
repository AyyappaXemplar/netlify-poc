import React from 'react';
import { Alert } from 'react-bootstrap';
import { ReactComponent as CheckIcon } from '../../images/checkmark-circle.svg';
import DashIcon from './DashCircle';
import * as STYLE_VARIANT from '../../constants/style-variants';


class CustomAlert extends React.Component {
  componentDidMount() {
    const { setAlert } = this.props
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => { setAlert(null) }, 4000);
  }

  getIcon(variant) {
    if (variant === STYLE_VARIANT.SUCCESS) {
      return <CheckIcon/>
    } else if (variant === STYLE_VARIANT.DANGER) {
      return <DashIcon/>
    } else return false
  }

  render() {
    const { alert } = this.props
    const { variant, text } = alert
    const icon = this.getIcon(variant)

    return (
      <div className='d-flex justify-content-center'>
        <Alert variant={variant} className='shadow'>
          {icon}<span className="ml-3">{text}</span>
        </Alert>
      </div>
    );
  }
}

export default CustomAlert;
