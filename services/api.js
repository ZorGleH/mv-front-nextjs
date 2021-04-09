const api = {
  urlServer: process.env.NEXT_PUBLIC_SERVER_URL,
  feedbackForm: process.env.NEXT_PUBLIC_FEEDBACK_FORM,
  routesServer: {
    setElection: "election/",
    getElection: "election/get/:slug/",
    getResults: "election/results/:slug",
    voteElection: "election/vote/"
  }
};


const createElection = (title, candidates, {
  emails, numGrades, start, finish, locale},
  successCallback, failureCallback) => {

  const endpoint = new URL(api.routesServer.setElection, api.urlServer);

  console.log(endpoint.href)

  fetch(endpoint.href, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      candidates,
      on_invitation_only: emails.length > 0,
      num_grades: numGrades,
      elector_emails: emails || [],
      start_at: start,
      finish_at: finish,
      select_language: locale || "fr",
      front_url: window.location.origin,
      restrict_results: finish && start && finish > start,
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(successCallback)
    .catch(failureCallback || console.log);
}


const getResults = (pid, successCallback, failureCallback) => {
  // Fetch results from external API

  const endpoint = new URL(
    api.routesServer.getResults.replace(
      new RegExp(":slug", "g"),
      pid
    ),
    api.urlServer
  );
  return fetch(endpoint.href)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(successCallback || ((res) => res))
    .catch(failureCallback || console.log);

}

const getDetails = (pid, successCallback, failureCallback) => {
  // Fetch data from external API

  const detailsEndpoint = new URL(
    api.routesServer.getElection.replace(
      new RegExp(":slug", "g"),
      pid
    ),
    api.urlServer
  );
  return fetch(detailsEndpoint.href)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(successCallback || ((res) => res))
    .catch(failureCallback || console.log);

}


const castBallot = (judgments, pid, token, callbackSuccess, callbackError) => {

  const endpoint = new URL(
    api.routesServer.voteElection,
    api.urlServer,
  );


  const payload = {
    election: pid,
    grades_by_candidate: judgments
  };
  if (token && token !== "") {
    payload["token"] = token;
  }

  fetch(endpoint.href, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
    .then(callbackSuccess || (res => res))
    .catch(callbackError || console.log);
}


export const UNKNOWN_ELECTION_ERROR = "E1";
export const ONGOING_ELECTION_ERROR = "E2";
export const NO_VOTE_ERROR = "E3";
export const ELECTION_NOT_STARTED_ERROR = "E4";
export const ELECTION_FINISHED_ERROR = "E5";
export const INVITATION_ONLY_ERROR = "E6";
export const UNKNOWN_TOKEN_ERROR = "E7";
export const USED_TOKEN_ERROR = "E8";
export const WRONG_ELECTION_ERROR = "E9";

export const apiErrors = (error, t) => {
  if (error.startsWith(UNKNOWN_ELECTION_ERROR)) {
    return t("Oops... The election is unknown.");
  } else if (error.startsWith(ONGOING_ELECTION_ERROR)) {
    return t(
      "The election is still going on. You can't access now to the results."
    );
  } else if (error.startsWith(NO_VOTE_ERROR)) {
    return t("No votes have been recorded yet. Come back later.");
  } else if (error.startsWith(ELECTION_NOT_STARTED_ERROR)) {
    return t("The election has not started yet.");
  } else if (error.startsWith(ELECTION_FINISHED_ERROR)) {
    return t("The election is over. You can't vote anymore");
  } else if (error.startsWith(INVITATION_ONLY_ERROR)) {
    return t("You need a token to vote in this election");
  } else if (error.startsWith(USED_TOKEN_ERROR)) {
    return t("You seem to have already voted.");
  } else if (error.startsWith(WRONG_ELECTION_ERROR)) {
    return t("The parameters of the election are incorrect.");
  }
};
export {api, getDetails, getResults, createElection, castBallot}
