import React, { useState, useEffect, useCallback } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Tab, Tabs, Button } from "react-bootstrap";

import CoverageStrength from "../shared/CoverageStrength";
import CoveragePricing from "../shared/CoveragePricing";
import AppliedDiscounts from "../shared/AppliedDiscounts";
import PaymentDetails from "../shared/PaymentDetails";
import PolicyLength from "../shared/PolicyLength";
import envelope from "../../images/envelope.svg";

import {
  monthlyPaymentOption,
  priceDisplay,
  payInFullOption,
  payInFullDiscount,
  formatMoney,
} from "../../services/payment-options";
import { averageCoverageStrength } from "../../services/rate-quality";
import isMonitoredDriverProgram from "../../services/isMonitoredDriverProgram";
import { purchaseQuote } from "../../actions/quotes";
import mixpanel from "../../config/mixpanel";
import mdpIcon from "../../images/mdp.svg";
import LabledPopover from "../shared/LabledPopover";
import MonitoredDriverModal from "../shared/MonitoredDriverModal";
import { updateQuote } from "../../actions/quotes";

function PricingTabs({
  rate,
  quote,
  setShowTransitionModal,
  setShowEmailQuoteModal,
  setShowOnlyEmailQuote,
  setSubmittedPurchasing,
  t,
}) {
  const PAY_IN_FULL_LABEL = "Pay In Full";
  const MONTHLY_PAY_LABEL = "Monthly";
  const defaultActiveKey = quote.pay_in_full
    ? PAY_IN_FULL_LABEL
    : MONTHLY_PAY_LABEL;
  const [activeTab, setActiveTab] = useState(defaultActiveKey);
  const dispatch = useDispatch();
  const [showMDPmodal, setShowMDPmodal] = useState(null);
  const [mDpAccepted, setmDpAccepted] = useState(false);

  const displayedPaymentOptions = useCallback(() => {
    return [monthlyPaymentOption(rate), payInFullOption(rate)];
  }, [rate]);

  const mixpanelTrackAndPush = useCallback(() => {
    mixpanel.track("Click BOL");
    setShowEmailQuoteModal(false);
    setShowOnlyEmailQuote(false);
    setSubmittedPurchasing(true);

    const paymentOptions = displayedPaymentOptions();
    const planCodeIndex = activeTab === MONTHLY_PAY_LABEL ? 0 : 1;
    const payment_plan_code = paymentOptions[planCodeIndex].plan_code;
    const quote_number = rate.id;
    dispatch(purchaseQuote({ ...quote, payment_plan_code, quote_number }));
  }, [
    activeTab,
    dispatch,
    displayedPaymentOptions,
    quote,
    rate.id,
    setShowEmailQuoteModal,
    setShowOnlyEmailQuote,
    setSubmittedPurchasing,
  ]);

  useEffect(() => {
    if (mDpAccepted) {
      setmDpAccepted(!mDpAccepted);
      mixpanelTrackAndPush();
    }
  }, [mDpAccepted, mixpanelTrackAndPush]);

  function payInFullDiscountAmount() {
    return payInFullDiscount(rate);
  }

  function showTransitionModal(event) {
    event.preventDefault();
    if (isMonitoredDriverProgram(rate)) {
      setShowMDPmodal(true);
    } else {
      mixpanelTrackAndPush();
    }
  }

  function showEmailQuoteModal(event) {
    event.preventDefault();
    setShowEmailQuoteModal(true);
  }

  function showOnlyEmailQuote(event){
    event.preventDefault();
    setShowOnlyEmailQuote(true);
  }

  function priceTabs() {
    return displayedPaymentOptions().map((option) => {
      let price = priceDisplay(option);
      let title =
        option.plan_type === "pay_in_full"
          ? PAY_IN_FULL_LABEL
          : MONTHLY_PAY_LABEL;
      const planType = option.plan_type;
      let titleComponent = () => (
        <div className="text-center p-2">
          {planType === "pay_in_full" ? t("payInFull") : t("monthly")}
          {option.plan_type === "pay_in_full" &&
            payInFullDiscountAmount() > 0 && (
              <span className="d-block d-sm-inline ml-2 font-weight-normal text-primary">
                {t("save")} $
                {formatMoney(Math.ceil(payInFullDiscountAmount() / 100))}!
              </span>
            )}
        </div>
      );

      let discounts = [];
      if (quote.homeowner) {
        discounts.push("Homeowners Discount");
      }
      if (quote.currently_insured) {
        discounts.push("Currently Insured Discount");
      }
      if (quote.vehicles.length > 1) {
        discounts.push("Multi-Car Discount");
      }

      let averageStrength = averageCoverageStrength(rate);

      return (
        <Tab
          eventKey={title}
          key={title}
          title={titleComponent()}
          className="mb-5"
        >
          <div className="rate-item-card">
            <div className="title mb-2">
              {t("Quote")} #{rate.id}
            </div>
            <div>{t("asLowAs")}</div>
            <div className="d-flex price-container mb-2">
              <p className="price-container__price quote-price display-1 mb-0">
                <sup className="price-container__dollar">$</sup>
                {price}
              </p>
              <span className="price-container__text align-self-end ml-1">
                {t("per")}
                <br />
                {option.plan_type === "monthly" ? t("month") : t("term")}
              </span>
            </div>

            <PaymentDetails option={option} />

            {isMonitoredDriverProgram(rate) && (
              <LabledPopover
                title={t(`${"monitoredDriverPopoverAndLabel.title"}`)}
                copy={t(`${"monitoredDriverPopoverAndLabel.copy"}`)}
                label={t(`${"monitoredDriverPopoverAndLabel.label"}`)}
                icon={mdpIcon}
              />
            )}
            <div className="mb-3">
              <div className="mb-3">
                <CoverageStrength strength={averageStrength} />
              </div>

              <CoveragePricing strength={averageStrength} />
            </div>

            <div className="mb-3">
              <AppliedDiscounts discounts={discounts} />
            </div>

            <PolicyLength term={rate.term} />

            <div className="mx-auto mt-5">
              <Button
                className="rounded-pill btn btn-primary btn-block btn-lg"
                type="link"
                href="#"
                onClick={showTransitionModal}
              >
                {t("bol")}
              </Button>
            </div>

            <div
              className="mx-auto text-center mt-3 mb-0 coverage-graph-item"
              style={{ backgroundColor: "#F2F5F5" }}
            >
             
                Not ready to buy yet?

              <br />
              <Button
                onClick={showEmailQuoteModal}
                variant="link"
                className="email-quote-btn"
                style={{ color: "#F16322" }}
              >
                <img
                  alt="Email"
                  src={envelope}
                  style={{ width: "23px", height: "23px", marginRight: "10px" }}
                />
                Email yourself this quote
              </Button>
              <div className="mx-auto text-center">or</div>

              <Button
                onClick={showOnlyEmailQuote}
                variant="link"
                style={{ color: "#F16322" }}
                className="email-quote-btn"
              >
                <img
                  alt="Email"
                  src={envelope}
                  style={{ width: "23px", height: "23px", marginRight: "10px" }}
                />{" "}
                Have a licensed agent contact me
              </Button>
            </div>
          </div>
        </Tab>
      );
    });
  }

  return (
    <div className="bg-white shadow-lg rate-card-tabs">
      <Tabs
        transition={false}
        defaultActiveKey={defaultActiveKey}
        onSelect={(tabName) => {
          setActiveTab(tabName);

          const displayedPaymentOptions = () => {
            return [monthlyPaymentOption(rate), payInFullOption(rate)];
          };

          const paymentOptions = displayedPaymentOptions();
          const planCodeIndex = tabName === MONTHLY_PAY_LABEL ? 0 : 1;
          const payment_plan_code = paymentOptions[planCodeIndex].plan_code;
          const quote_number = rate.id;

          dispatch(updateQuote({ ...quote, payment_plan_code, quote_number }));
        }}
        className="nav-justified"
      >
        {priceTabs()}
      </Tabs>
      <MonitoredDriverModal
        setShowMDPmodal={setShowMDPmodal}
        show={showMDPmodal}
        setmDpAccepted={setmDpAccepted}
      />
    </div>
  );
}

export default withTranslation(["quotes"])(PricingTabs);
