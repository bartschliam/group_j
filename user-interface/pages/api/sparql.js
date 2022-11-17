import axios from "axios";

var SparqlParser = require("sparqljs").Parser;
var parser = new SparqlParser();

export default async function handler(req, res) {
  const sparqlQuery = req.query.sparqlQuery;
  // TODO: Add fetching of the active REPO
  // const getRepos = await axios.get("http://0.0.0.0:7200/repositories");

  const query = await axios.get(
    `http://0.0.0.0:7200/repositories/${
      process.env.GRAPHDB_REPO
    }?query=${encodeURI(sparqlQuery)}`
  );

  // Create a better object to process in the front end
  const result = query.data.head.vars.map((variable) => {
    return {
      [variable]: query.data.results.bindings.map(
        (binding) => binding[variable]
      ),
    };
  });
  res.status(200).json(result);
}
