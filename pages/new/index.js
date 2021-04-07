import {Component} from "react";
import {
  Collapse,
  Container,
  Row,
  Col,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Button,
  Card,
  CardBody
} from "reactstrap";
import {ReactMultiEmail, isEmail} from "react-multi-email";
import "react-multi-email/style.css";
import {toast, ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import {resolve} from "url";
import queryString from "query-string";
import {
  arrayMove,
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashAlt,
  faCheck,
  faCogs,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import {useAppContext} from "@services/context";
import HelpButton from "@components/form/HelpButton";
import ButtonWithConfirm from "@components/form/ButtonWithConfirm";
import Loader from "@components/wait";

// Error messages
const AT_LEAST_2_CANDIDATES_ERROR = "Please add at least 2 candidates.";
const NO_TITLE_ERROR = "Please add a title.";

const isValidDate = date => date instanceof Date && !isNaN(date);
const getOnlyValidDate = date => (isValidDate(date) ? date : new Date());

// Convert a Date object into YYYY-MM-DD
const dateToISO = date =>
  getOnlyValidDate(date)
    .toISOString()
    .substring(0, 10);

// Retrieve the current hour, minute, sec, ms, time into a timestamp
const hours = date => getOnlyValidDate(date).getHours() * 3600 * 1000;
const minutes = date => getOnlyValidDate(date).getMinutes() * 60 * 1000;
const seconds = date => getOnlyValidDate(date).getSeconds() * 1000;
const ms = date => getOnlyValidDate(date).getMilliseconds();
const time = date =>
  hours(getOnlyValidDate(date)) +
  minutes(getOnlyValidDate(date)) +
  seconds(getOnlyValidDate(date)) +
  ms(getOnlyValidDate(date));

// Retrieve the time part from a timestamp and remove the day. Return a int.
const timeMinusDate = date => time(getOnlyValidDate(date));

// Retrieve the day and remove the time. Return a Date
const dateMinusTime = date =>
  new Date(getOnlyValidDate(date).getTime() - time(getOnlyValidDate(date)));

const DragHandle = sortableHandle(({children}) => (
  <span className="input-group-text indexNumber">{children}</span>
));

const displayClockOptions = () =>
  Array(24)
    .fill(1)
    .map((x, i) => (
      <option value={i} key={i}>
        {i}h00
      </option>
    ));

const SortableCandidate = sortableElement(
  ({candidate, sortIndex, form, t}) => (
    <li className="sortable">
      <Row key={"rowCandidate" + sortIndex}>
        <Col>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <DragHandle>
                <span>{sortIndex + 1}</span>
              </DragHandle>
            </InputGroupAddon>
            <Input
              type="text"
              value={candidate.label}
              onChange={event => form.editCandidateLabel(event, sortIndex)}
              onKeyPress={event =>
                form.handleKeypressOnCandidateLabel(event, sortIndex)
              }
              placeholder={t("Candidate/proposal name...")}
              tabIndex={sortIndex + 1}
              innerRef={ref => (form.candidateInputs[sortIndex] = ref)}
              maxLength="250"
            />
            <ButtonWithConfirm className="btn btn-primary input-group-append border-light">
              <div key="button">
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div key="modal-title">{t("Delete?")}</div>
              <div key="modal-body">
                {t("Are you sure to delete")}{" "}
                {candidate.label !== "" ? (
                  <b>&quot;{candidate.label}&quot;</b>
                ) : (
                  <span>
                    {t("the row")} {sortIndex + 1}
                  </span>
                )}{" "}
                ?
              </div>
              <div
                key="modal-confirm"
                onClick={() => form.removeCandidate(sortIndex)}
              >
                Oui
              </div>
              <div key="modal-cancel">Non</div>
            </ButtonWithConfirm>
          </InputGroup>
        </Col>
        <Col xs="auto" className="align-self-center pl-0">
          <HelpButton>
            {t(
              "Enter the name of your candidate or proposal here (250 characters max.)"
            )}
          </HelpButton>
        </Col>
      </Row>
    </li>
  )
);

const SortableCandidatesContainer = sortableContainer(({items, form, t}) => {
  return (
    <ul className="sortable">
      {items.map((candidate, index) => (
        <SortableCandidate
          key={`item-${index}`}
          index={index}
          sortIndex={index}
          candidate={candidate}
          form={form}
          t={t}
        />
      ))}
    </ul>
  );
});

const CreateElection = (props) => {
  // default value : start at the last hour
  const now = new Date();
  const start = new Date(
    now.getTime() - minutes(now) - seconds(now) - ms(now)
  );

  return (<p>Not done</p>);
}

export default CreateElection;

