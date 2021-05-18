import React                from 'react';
import { Form }             from 'react-bootstrap'
import { withTranslation }  from 'react-i18next';
// import CustomSelect from '../../forms/CustomSelect'

function Lienholder({ t, lienholder, dispatch }) {

  // const lienholderTypeOptions = [
  //   {value: 'Lienholder', label: 'Lienholder'},
  //   {value: 'Additional Interes', label: 'Additional Interest'}
  // ]

  // function changeLienholderType(values) {
  //   if (!values[0]) return
  //   dispatch({type: 'updateLienholder', payload: { type: values[0].value }})
  // }

  return (
    <div className="p-3 bg-light">
      <Form.Label>{ t("bindOnline.licenseInfo.lienholderLabels.name") }</Form.Label>
      <Form.Control
        className="font-weight-light mb-3"
        type="text"
        placeholder="Capital One Auto"
        name='institution'
        value={lienholder.name}
        onChange={(event) => {
          dispatch({type: 'updateLienholder', payload: { name: event.target.value }})
        }}
      />
      <Form.Label>{ t("bindOnline.licenseInfo.lienholderLabels.name") }</Form.Label>
      <Form.Control
        className="font-weight-light mb-3"
        type="text"
        name='address[line1]'
        placeholder="Address"
        value={lienholder.address.line1}
        onChange={(event) => {
          dispatch({type: 'updateLienholderAddress', payload: { line1: event.target.value }})
        }}
      />

      <Form.Control
        className="font-weight-light mb-3"
        type="text"
        name='address[line2]'
        placeholder="Apt"
        value={lienholder.address.line2}
        onChange={(event) => {
          dispatch({type: 'updateLienholderAddress', payload: { line2: event.target.value }})
        }}
      />

      <div className='d-md-flex'>
        <Form.Control
          className="font-weight-light mb-3 col-md-5"
          type="text"
          placeholder="City"
          value={lienholder.address.city}
          onChange={(event) => {
            dispatch({type: 'updateLienholderAddress', payload: { city: event.target.value }})
          }}
        />

        <Form.Control
          className="font-weight-light mb-3 col-md-2 mx-md-2"
          type="text"
          placeholder="State"
          name='address[state]'
          value={lienholder.address.state}
          onChange={(event) => {
            dispatch({type: 'updateLienholderAddress', payload: { state: event.target.value }})
          }}
          />
        <Form.Control
          className="font-weight-light mb-3 md-5"
          type="text"
          name='address[zip_code]'
          placeholder="ZIP"
          value={lienholder.address.zip_code}
          onChange={(event) => {
            dispatch({type: 'updateLienholderAddress', payload: { zip_code: event.target.value }})
          }}
        />

        </div>
    </div>
  )
}

// export default 
export default withTranslation(['drivers'])(Lienholder)