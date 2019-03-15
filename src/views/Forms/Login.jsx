import React from "react";
import {
  Form,
  /*FormGroup,
  Label,
  Input,
  FormText,*/
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Row,
  Col
} from "reactstrap";
import { connect } from "react-redux";

import { userService } from "./../../services/index";

import logo from "../../assets/img/logo-1.png";

import { FormInputs, Button } from "components";
import { Link } from "react-router-dom";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange = e => {
    let value = e.target.value;
    switch (e.target.name) {
      case "txt_email":
        this.setState({ email: value });
        break;
      case "txt_password":
        this.setState({ password: value });
        break;
      default:
        break;
    }
  };

  handlerSubmit = e => {
    let self = this;
    e.preventDefault();
    this.setState({ submitted: true });
    const { email, password } = this.state;
    //  const { dispatch } = this.props;
    if (email && password) {
      self.props.login(email, password);
    }
  };

  render() {
    const { loggedIn, user, loading, error } = this.props;
    console.dir(this.props);
    return (
      <div>
        <br />
        {loggedIn && <div>{loggedIn}</div>}
        {user && (
          <div>
            {user.email} &nbsp; {user.token}
          </div>
        )}
        {loading && <div> loading... </div>}
        {error && <div>{error}</div>}
        <br />
        <div className="content">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <img src={logo} alt="AMPF" />
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form method="POST" onSubmit={this.handlerSubmit}>
                    <FormInputs
                      // ncols={["col-12", "col-12", "col-12"]}
                      proprieties={[
                        {
                          label: "Email address",
                          inputProps: {
                            type: "email",
                            name: "txt_email",
                            onChange: this.handlerChange
                          }
                        },
                        {
                          label: "Password",
                          inputProps: {
                            type: "password",
                            name: "txt_password",
                            onChange: this.handlerChange
                          }
                        }
                        /*{
                          label: "Subscribe to newsletter",
                          labelProps: {
                            check: true
                          },
                          inputProps: {
                            type: "checkbox"
                          },
                          formGroupProps: {
                            check: true,
                            className: "mt-3"
                          }
                        }*/
                      ]}
                    />
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Form>
                  <Row>
                    <Col sm="12" md={{ size: 8, offset: 8 }}>
                      <Link to="/remember" className="btn btn-link">
                        Olvide la contraseña
                      </Link>
                      <Link to="/register" className="btn btn-link">
                        Registrar
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { loggedIn, user } = state.authentication;
  const { loading, error } = state.general;
  return {
    loggedIn,
    user,
    loading,
    error
  };
};

const mapDispatchToProps = dispatch => ({
  login(email, password) {
    return dispatch(userService.login(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
