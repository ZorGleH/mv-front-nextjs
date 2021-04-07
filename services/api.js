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
export {api}
