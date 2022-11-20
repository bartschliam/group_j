import axios from "axios";

export default async function handler(req, res) {
  const sparqlQuery = req.query.sparqlQuery;

  const query = await axios.get(
    `http://0.0.0.0:7200/repositories/${
      process.env.GRAPHDB_REPO
    }?query=${encodeURIComponent(sparqlQuery)}`
  );

  const result = query.data.results.bindings.map((column) => {
    Object.keys(column).forEach((key, index) => {
      if (column[key].datatype === "http://www.w3.org/2001/XMLSchema#integer") {
        column[key].value = parseInt(column[key].value);
      }

      if (column[key].datatype === "http://www.w3.org/2001/XMLSchema#gYear") {
        column[key].value = parseInt(column[key].value); // Date.parse
      }

      if (column[key].datatype === "http://www.w3.org/2001/XMLSchema#double") {
        column[key].value = parseFloat(column[key].value);
      }
    });
    return column;
  });

  res.status(200).json(result);
}
