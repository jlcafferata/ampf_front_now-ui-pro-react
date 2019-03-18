import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Container,
  Col
} from "reactstrap";

import { Link } from "react-router-dom";

import avatar from "assets/img/logo.png";

import bgImage from "assets/img/logo.png";

class LockScreenPage extends React.Component {
  render() {
    return (
      <div>
        <br />
        <div className="full-page-content">
          <div className="lock-page">
            <Container>
              <Col lg={4} md={8} xs={12} className="mr-auto ml-auto">
                <Card className="card-lock text-center">
                  <CardHeader>
                    <img
                      style={{ marginTop: "10px" }}
                      src={avatar}
                      alt="avatar-img"
                    />
                  </CardHeader>
                  <CardBody>
                    <CardTitle tag="h4">Ups! ocurrio un error</CardTitle>
                  </CardBody>
                  <CardFooter>
                    <Link to="/">Ir a pagina principal</Link>
                  </CardFooter>
                </Card>
              </Col>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </div>
    );
  }
}

export default LockScreenPage;
