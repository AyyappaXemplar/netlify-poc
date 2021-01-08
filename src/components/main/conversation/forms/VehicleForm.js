import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Container, Form, Button } from "react-bootstrap";

import FormContainer from "../../../shared/FormContainer";
import BadgeText from "../../../shared/BadgeText";
import Radio from "../../../forms/Radio";
import VehicleSearch from "./VehicleSearch";
import VehicleFormDropdowns from "./VehicleFormDropdowns";

import history from "../../../../history";
import vehicleOptions from "../../../../services/vehicle-options";
import VehicleOptionsApi from "../../../../services/vehicle-api";
import * as VehicleConstants from "../../../../constants/vehicle";

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    const showVehicleSearch = true && props.allowVehicleSearch;
    this.state = {
      vehicle: this.props.vehicle,
      options: vehicleOptions,
      optionsReady: true,
      vehicleSearchOptions: [],
      showVehicleSearch,
      showForm: false
    };
  }

  componentDidMount() {
    const newVehicle = this.vehicleValuesPresent();
    if (newVehicle && !this.state.showVehicleSearch) {
      this.setState({ optionsReady: false }, this.initOptions);
    }
  }

  initOptions() {
    this.setManufacturerOption()
      .then(() => this.setModelOptions())
      .then(() => this.setTrimOptions())
      .then(() => this.setState({ optionsReady: true }));
  }

  onDropdownChange(vehicleProperty, selectedOptions) {
    const option = selectedOptions[0];
    // the change needs to come from a user selection
    if (!option) return;

    const callbacks = {
      year: this.setManufacturerOption,
      manufacturer: this.setModelOptions,
      model: this.setTrimOptions,
    };
    const vehicleDropdownProperties = this.props
      .t("form.fields.vehicle.fields")
      .map((item) => item.name);
    const changedPropertyIndex = vehicleDropdownProperties.indexOf(
      vehicleProperty
    );
    const propertiesToClear = vehicleDropdownProperties.slice(
      changedPropertyIndex + 1
    );
    const { vehicle } = this.state;

    vehicle[vehicleProperty] = option.name;
    if (vehicleProperty === "trim") vehicle.vin = option.vin;
    if (vehicleProperty === "manufacturer") vehicle.logo_url = option.logo;

    propertiesToClear.forEach((property) => (vehicle[property] = null));
    const callback = callbacks[vehicleProperty];
    this.setState({ vehicle }, callback);
  }

  useCodeChange(value) {
    const { vehicle } = this.state;
    vehicle.use_code = value;

    // If vehicle use code is not business unselect TNC and Delivery
    if (vehicle.use_code !== "business") {
      vehicle.tnc = false;
      vehicle.individual_delivery = false;
    }

    this.setState({ vehicle });
  }

  tncUsageChange(item) {
    const { vehicle } = this.state;
    vehicle[item.name] = !vehicle[item.name];

    if (vehicle.tnc || vehicle.individual_delivery) {
      if (vehicle.use_code !== "business") {
        vehicle.use_code = "business";
      }
    } else if (!vehicle.tnc && !vehicle.individual_delivery) {
      // If neither is selected, we can revert the
      // use_code to null so user can select
      vehicle.use_code = null;
    }

    this.setState({ vehicle });
  }

  setManufacturerOption() {
    return VehicleOptionsApi.manufacturer(this.state).then((response) => {
      let { options } = this.state;
      options = { ...options, manufacturer: response.data };
      this.setState({ options });
    });
  }

  setModelOptions() {
    if (!this.state.options.manufacturer.length) return;

    return VehicleOptionsApi.model(this.state).then((response) => {
      let options = { ...this.state.options };
      options = { ...options, model: response.data };
      this.setState({ options });
    });
  }

  setTrimOptions() {
    if (!this.state.options.manufacturer.length) return;

    VehicleOptionsApi.trim(this.state).then((response) => {
      let { options } = this.state;
      options = { ...options, trim: response.data };
      this.setState({ options });
    });
  }

  setVehicleFromSearch(vehicleProps) {
    let vehicle = { ...this.state.vehicle, ...vehicleProps };
    this.setState({ vehicle });
  }

  useCodeRadios() {
    const { t } = this.props;

    return t("form.fields.use.useCodevalues").map((item, index) => {
      let label = t(`form.fields.use.useCode.${item}.label`);
      let value = t(`form.fields.use.useCode.${item}.value`).toLowerCase();
      let onChange = () => this.useCodeChange(value);

      return (
        <Radio
          type={"radio"}
          id={`info-car-${value}`}
          label={label}
          value={value}
          key={index}
          selected={this.state.vehicle.use_code === value}
          onChange={onChange}
        />
      );
    });
  }

  tncUseCheckBoxes() {
    return this.props.t("form.fields.tncUsage.attributes").map((item) => {
      let onChange = () => this.tncUsageChange(item);

      return (
        <Radio
          key={item.name}
          type="checkbox"
          label={item.label}
          value={this.state.vehicle[item.name]}
          selected={this.state.vehicle[item.name]}
          onChange={onChange}
        />
      );
    });
  }

  cancelSubmit(event) {
    event.preventDefault();
    history.push(this.props.returnPath || "/quotes/vehicles");
  }

  vehicleValuesPresent() {
    const { vehicle } = this.state;
    return VehicleConstants.PRESENT_FIELDS.map((field) => vehicle[field]).every(
      (property) => property
    );
  }

  enableSubmit() {
    const { vehicle } = this.state;
    const objectPresent = !!Object.keys(vehicle).length;

    return objectPresent && this.vehicleValuesPresent();
  }

  render() {
    const { t, title, handleSubmit, avoidCancel } = this.props;
    const enabled = this.enableSubmit();
    const cancelSubmit = this.cancelSubmit.bind(this);
    const onSubmit = (event) => handleSubmit(event, this.state.vehicle);
    const useCodeRadios = this.useCodeRadios();
    const tncUseCheckBoxes = this.tncUseCheckBoxes();
    const toggleVehicleSearch = (event) => {
      this.setState({
        showVehicleSearch: !this.state.showVehicleSearch,
        vehicle: this.props.vehicle, // reset vehicle
      });
    };
    const toggleVinSearch = (event) =>
      this.setState({ searchByVin: !this.state.searchByVin });

    const toggletext = (event) =>
      this.state.showVehicleSearch
        ? "Select by year, make, and model"
        : "Autocomplete Search";

    const toggleVinText = (event) =>
      this.state.searchByVin ? "Autocomplete Search" : "Search by VIN";

    
    
    const renderForms = () => { 

      return ( <Container className="pt-base">
        <FormContainer bootstrapProperties={{ md: 6 }}>
          <h2 className="mb-4 mb-sm-5 font-weight-bold ">{title}</h2>
          <Form onSubmit={onSubmit}>
            <div className="mb-4 mb-sm-5">
              <Form.Label>{t("form.fields.vehicle.label")}</Form.Label>
              {this.state.showVehicleSearch ? (
                <VehicleSearch
                  onChange={this.setVehicleFromSearch.bind(this)}
                  searchByVin={this.state.searchByVin}
                />
              ) : (
                <VehicleFormDropdowns
                  options={this.state.options}
                  vehicle={this.state.vehicle}
                  onChange={this.onDropdownChange.bind(this)}
                  ready={this.state.optionsReady}
                />
              )}
              {this.props.allowVehicleSearch && (
                <Button
                  onClick={toggleVehicleSearch}
                  variant="link"
                  className="p-0 text-primary text-decoration-none"
                >
                  {toggletext()}
                </Button>
              )}
              {this.state.showVehicleSearch && (
                <Button
                  onClick={toggleVinSearch}
                  variant="link"
                  className="p-0 text-primary text-decoration-none float-right"
                >
                  {toggleVinText()}
                </Button>
              )}
            </div>

            <Form.Label>{t("form.fields.use.label")}</Form.Label>
            <div className="mb-4 mb-sm-5">{useCodeRadios}</div>

            <div className="mb-4 mb-sm-5">
              <Form.Label>{t("form.fields.tncUsage.label")}</Form.Label>
              {tncUseCheckBoxes}
              <small className="form-text text-muted">
                {t("form.fields.tncUsage.smallText")}
              </small>
            </div>

            <div className="w-100 w-sm-75 mx-auto d-flex flex-column align-items-center">
              <Button
                className="rounded-pill mb-3"
                size="lg"
                variant="primary"
                type="submit"
                block
                disabled={!enabled}
              >
                {t("form.submit")}
              </Button>

              {!avoidCancel && (
                <Button
                  onClick={cancelSubmit}
                  variant="link"
                  className="text-med-dark text-decoration-none"
                >
                  {t("form.cancel")}
                </Button>
              )}
            </div>
          </Form>
        </FormContainer>
        <BadgeText />
      </Container>)
    }

    const renderButtons = () => { 
      return (

        <div className="uiContainer flex">
        
            <Button
              onClick={() => {
                this.setState({ showForm: true });
              }}
              type={"button"}
              className={"rounded-pill btn-block"}
            >
            click here to add a vehicles details
            </Button>
          </div>
      )
    }

    return (
      (() => {
        if (!this.state.showForm) {
          return renderButtons();
        }
        else { 
          return renderForms();
        }
       })()
    );
  }
}

export default withTranslation(["vehicles"])(VehicleForm);
