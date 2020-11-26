import React from "react";
import "./SelectionButton.css";
import { NavLink } from "react-router-dom";
import { Button, Row, Col, Container } from "reactstrap";
class SelectionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container className="pt-5 pb-8">
          <Row className="container">
            <Col
              sm="6"
              md="4"
              className="d-flex flex-column align-items-center"
            ></Col>
          </Row>

          <Row>
            <Col sm="4" className="text-center">
              <NavLink to="/doctors-cards" className="Events">
                <Button
                  className="SelectBtnSetting"
                  color="success"
                  outline
                  type="button"
                >
                  <strong style={{ color: " white" }}>{this.props.name}</strong>
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SelectionButton;
