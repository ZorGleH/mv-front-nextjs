import {Container, Row, Col} from "reactstrap";


const Error = props => (
  <Container>
    <Row>
      <Link href="/" className="d-block ml-auto mr-auto mb-4">
        <img src="./logos/logo-line-white.svg" alt="logo" height="128" />
      </Link>
    </Row>
    <Row className="mt-4">
      <Col className="text-center">
        <h4>{props.value}</h4>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col className="text-center">
        <Link href="/" className="btn btn-secondary">
          Back to home page
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Error
