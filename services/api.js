const api = {
  urlServer: process.env.SERVER_URL,
  feedbackForm: process.env.FEEDBACK_FORM,
  routesServer: {
    setElection: "election/",
    getElection: "election/get/:slug/",
    getResultsElection: "election/results/:slug",
    voteElection: "election/vote/"
  }
};

const createElection = (title, candidates, {
  emails, numGrades, start, finish, locale},
  successCallback, failureCallback) => {

  const endpoint = new URL(
    api.urlServer,
    api.routesServer.setElection
  );

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
      select_language: locale,
      front_url: window.location.origin,
      restrict_results: finish && start && finish > start,
    })
  })
    .then(response => response.json())
    .then(successCallback)
    .catch(failureCallback || console.log);
}

export {api, createElection}
