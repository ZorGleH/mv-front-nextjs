import {useState} from 'react'
import {useTranslation} from "react-i18next";
import {
  Button,
  Card,
  CardBody
} from "reactstrap";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move"
import CandidateField from './CandidateField'


const SortableItem = sortableElement(({className, ...childProps}) => <li className={className}><CandidateField {...childProps} /></li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul className="sortable">{children}</ul>;
});


const CandidatesField = ({onChange}) => {
  const {t} = useTranslation();
  const initialCandidates = [{label: ""}]
  const [candidates, setCandidates] = useState(initialCandidates)
  const addCandidate = () => {
    if (candidates.length < 1000) {
      const newCandidates = candidates;
      newCandidates.push({label: ""});
      setCandidates(newCandidates);
    } else {
      console.error("Too many candidates")
    }
  };

  const removeCandidate = index => {
    if (candidates.length === 1) {
      setCandidates(initialCandidates);
      onChange(initialCandidates);
    }
    else {
      const newCandidates = candidates.filter((c, i) => i != index)
      setCandidates(newCandidates);
      onChange(newCandidates);
    }
  };

  const editCandidate = (index, label) => {
    candidates[index].label = label
    setCandidates(candidates);
    onChange(candidates);
  };

  const onEnter = (index) => {
    if (index + 1 === candidates.length) {
      addCandidate();
    }
    // TODO else {
    //  candidateInputs[index + 1].focus();
    //}
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setCandidates(arrayMove(candidates, oldIndex, newIndex));
  };

  return (
    <>
      <SortableContainer onSortEnd={onSortEnd}>
        {candidates.map((candidate, index) => {
          // const className = candidate.label !== "" ? "m-0" : "d-none";
          const className = "sortable"
          return (
            <SortableItem
              className={className}
              key={`item-${index}`}
              index={index}
              candIndex={index}
              label={candidate.label}
              onUpdate={(label) => editCandidate(index, label)}
              onEnter={() => onEnter(index)}
              onDelete={() => removeCandidate(index)}
            />
          )
        })}
      </SortableContainer>

      <Button
        color="secondary"
        className="btn-block mt-2"
        tabIndex={candidates.length + 2}
        type="button"
        onClick={addCandidate}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        {t("Add a proposal")}
      </Button>
    </>
  );

}


export default CandidatesField

