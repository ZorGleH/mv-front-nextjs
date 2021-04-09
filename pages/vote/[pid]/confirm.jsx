import Head from 'next/head'
import {Col, Container, Row} from "reactstrap";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import Paypal from "@components/banner/Paypal";
import Gform from "@components/banner/Gform";
import {getDetails} from '@services/api'


export async function getServerSideProps(context) {
  const {pid} = context.query

  const res = await getDetails(
    pid,
    res => {
      return {
        props: {
          invitationOnly: res.on_invitation_only,
          restrictResults: res.restrict_results,
          candidates: res.candidates.map((name, i) => ({id: i, label: name})),
          title: res.title,
          numGrades: res.num_grades,
          pid: pid,
        }
      }
    },
    err => ({props: {err}})
  )
  return res
}

const VoteSuccess = ({title, invitationOnly, pid}) => {
  const {t} = useTranslation();
  return (
    <Container>
      <Row>
        <Link href="/">
          <a className="d-block ml-auto mr-auto mb-4">
            <img src="/logos/logo-line-white.svg" alt="logo" height="128" />
          </a>
        </Link>
      </Row>
      <Row className="mt-4">
        <Col className="text-center offset-lg-3" lg="6">
          <h2>{t("Your participation was recorded with success!")}</h2>
          <p>{t("Thanks for your participation.")}</p>
          <div className="mt-3">
            <Gform className="btn btn-secondary" />
          </div>
          <div className="mt-5">
            <Paypal btnColor="btn-success" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default VoteSuccess
