import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from "../images/insureOnlineLogo.svg";
import { withTranslation } from "react-i18next";
import progressBarRoutes from "../progress-bar-routes";
import PhoneNumberLink from "./shared/PhoneNumberLink";
import { ReactComponent as PhoneIcon } from "../images/phone-icon.svg";
import { Helmet } from "react-helmet"
import LanguageSelector from './LanguageSelector'
import { connect } from "react-redux"
class Header extends React.Component {

  constructor(props) {
    super(props)
    this.initChat()
    this.state = {
      chat: true,
    }
  }

  progressBar() {
    return progressBarRoutes.map((route, index) => (
      <Route path={route.path} key={index} render={route.render} />
    ));
  }

  componentDidMount(){
    this.initChat()
    this.setState((prevState) => { return { ...prevState, chat: true } })
  }

  initChat() {

    if (typeof window !== `undefined`) {
      //console.log(this.props.quote.drivers[0].first_name, this.props.quote.drivers.length >= 0);
      window.HFCHAT_CONFIG = {
        EMBED_TOKEN: process.env.REACT_APP_EMBED_TOKEN,
        ASSETS_URL: process.env.REACT_APP_ASSETS_URL,

        onload: function () {
          window.HappyFoxChat = this
          console.log("this", this)
          const firstname = () => {
            if (this.props.quote.drivers.length >= 0) {
              return this.props.quote.drivers[0].first_name
            }
            else {
              return "name here"
            }
          };
          const customFields = {
            name: firstname(),
            email: this.props.quote.drivers.length >= 0 ? this.props.quote.drivers[0].email: "email"
          }

          window.HappyFoxChat.setVisitorInfo(customFields, function (err, resp) {
            if (err) {
              console.error('Failed to set visitor details. Error:', err);
            } else {
              console.log('Added visitor details:', resp);
            }
          });
        }
      }
    }
  }


  render() {

    const { t } = this.props;
    const progressBar = this.progressBar();
    const Chat = () => {
      return <Helmet><script async={true} src={`${process.env.REACT_APP_ASSETS_URL}/js/widget-loader.js`}></script></Helmet>
      }
    return <>
      <Chat />
      <Container className="header-container">
        <Row className="align-items-center header-row">
          <Col
            xs={6}
            sm={6}
            lg={3}
            className="text-center text-sm-left my-2 my-md-0 header-brand"
          >
            <Logo className="logo" />
          </Col>

          <Col xs={{ order: 3, span: 12 }} lg={{ order: 0, span: 6 }}>
            <Switch>
              {progressBar}
            </Switch>
          </Col>

          <Col
            xs={6}
            sm={6}
            lg={3}
            className="header-contact text-center text-sm-right"
          >
            <div className="d-sm-none text-right">
              <PhoneNumberLink
                number={t("header.phoneNumber")}
                classes="text-dark"
              >
                <PhoneIcon height="24px" width="24px" />
              </PhoneNumberLink>
            </div>

            <div className="d-none d-sm-block d-md-flex align-items-center justify-content-center">
              <LanguageSelector />
              <div>
                <small className="mb-0">{t("header.title")}</small>
                <p className="h5 mb-0">
                  <PhoneNumberLink
                    number={t("header.phoneNumber")}
                    classes="text-dark"
                  />
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  }
}

const mapStateToProps = (state) => {
  return {
    quote: state.data.quote.drivers.length > 0 ? state.data.quote : {}
  }
}

export default connect(mapStateToProps)(withTranslation(["common"])(Header));
