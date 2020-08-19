import React from 'react';
import { withTranslation } from 'react-i18next';
import { Alert } from 'react-bootstrap';
import { ReactComponent as CheckIcon } from '../../images/checkmark-circle.svg';
import { ReactComponent as DashIcon } from '../../images/dash-circle.svg';
import * as STYLE_VARIANT from '../../constants/style-variants';


class CustomAlert extends React.Component {
  componentDidMount() {
    const { setAlert } = this.props
    setTimeout(() => { setAlert(null) }, 4000);
  }

  getIcon(variant) {
    if (variant === STYLE_VARIANT.SUCCESS) {
      return <CheckIcon className='mr-3'/>
    } else if (variant === STYLE_VARIANT.DANGER) {
      return <DashIcon className='mr-3'/>
    } else return false
  }

  render() {
    const { alert } = this.props
    const { variant, text } = alert
    const icon = this.getIcon(variant)

    return (
      <div className='d-flex justify-content-center'>
        <Alert variant={variant} className='shadow'>
          {icon}{text}
        </Alert>
      </div>
    );
  }
}

export default withTranslation()(CustomAlert);
