import {useState} from 'react'
import ButtonWithConfirm from "./ButtonWithConfirm";
import {
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import {useTranslation} from "react-i18next";
import {
  sortableHandle
} from "react-sortable-hoc";
import HelpButton from "@components/form/HelpButton";

const DragHandle = sortableHandle(({children}) => (
  <span className="input-group-text indexNumber">{children}</span>
));
const CandidateField = ({label, index, onUpdate, onEnter, onDelete}) => {
  const {t} = useTranslation();
  const handleChange = (e) => {
    onUpdate(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(e.target.value)
    }
  }

  return (
    <Row>
      <Col>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <DragHandle>
              <span>{index + 1}</span>
            </DragHandle>
          </InputGroupAddon>
          <Input
            type="text"
            value={label}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder={t("Candidate/proposal name...")}
            tabIndex={index + 1}
            maxLength="250"
          />
          <ButtonWithConfirm className="btn btn-primary  border-light" label={label} onDelete={onDelete}>
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
  );
}

export default CandidateField
