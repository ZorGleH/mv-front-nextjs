import {useState} from 'react'
import {
  arrayMove,
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import CandidateField from './CandidateField'


const SortableItem = sortableElement(({className, ...childProps}) => <li className={className}><CandidateField {...childProps} /></li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul className="m-0 pl-4">{children}</ul>;
});


const CandidatesField = ({candidates, setCandidates}) => {
  const addCandidate = () => {
    if (candidates.length < 1000) {
      candidates.push({label: ""});
      setCandidates(candidates);
    }
  };

  const removeCandidate = index => {
    candidates.splice(index, 1);
    if (candidates.length === 0) {
      candidates = [{label: ""}];
    }
    setCandidates(candidates);
  };

  const editCandidate = (index, label) => {
    candidates[index].label = label
    setCandidates(candidates);
  };

  const onEnter = (index) => {
    if (index + 1 === candidates.length) {
      addCandidate();
    } else {
      candidateInputs[index + 1].focus();
    }
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    candidates = arrayMove(candidates, oldIndex, newIndex);
    setCandidates(candidates);
  };

  return (<SortableContainer onSortEnd={onSortEnd}>
    {candidates.map((candidate, index) => {
      const className = candidate.label !== "" ? "m-0" : "d-none";
      return (
        <SortableItem
          className={className}
          key={`item-${index}`}
          index={index}
          label={candidate.label}
          onChange={(label) => editCandidate(index, label)}
          onEnter={() => onEnter(index)}
          onDelete={() => removeCandidate(index)}
        />
      )
    })}
  </SortableContainer>);

}


export default CandidatesField

