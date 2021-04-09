import Link from 'next/link'
import {Container, Row, Col} from "reactstrap";


const Error = props => (
  <Container>
    <Row>
      <Link href="/">
        <a className="d-block ml-auto mr-auto mb-4">
          <img src="/logos/logo-line-white.svg" alt="logo" height="128" />
        </a>
      </Link>
    </Row>
    <Row className="mt-4">
      <Col className="text-center">
        <h4>{props.value}</h4>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col className="text-center">
        <Link href="/">
          <a className="btn btn-secondary">
            Back to home page
  </a>
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Error
