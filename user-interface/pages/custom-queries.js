import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CustomQueries() {
  const [query, setQuery] = React.useState(
    "select * where {\n     ?s ?p ?o .\n} limit 100"
  );
  const [queryResult, setQueryResult] = React.useState([]);
  const [error, setError] = React.useState({ text: "", enabled: false });

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ text: "", enabled: false });
  };

  const handleQuerySubmit = async (e) => {
    axios
      .get("/api/sparql", {
        params: { sparqlQuery: query },
      })
      .then((result) => {
        setQueryResult(result.data);
      })
      .catch((error) => {
        setError({ text: "Error fetching results.", enabled: true });
      });
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>Custom Queries</title>
      </Head>
      <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }} m={2} pb={3}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Run Custom Queries
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Use the following textbox to execute a query.
        </Typography>
        <TextField
          label="Query"
          multiline
          rows={10}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleQueryChange}
          value={query}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleQuerySubmit}>
          Run Query
        </Button>
        {queryResult.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {Object.keys(queryResult[0]).map((key, index) => (
                    <TableCell key={index}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {queryResult.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {Object.keys(row).map((key, index) => (
                      <TableCell key={index}>{row[key].value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Snackbar
          open={error.enabled}
          autoHideDuration={6000}
          onClose={handleCloseError}
        >
          <MuiAlert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error.text}
          </MuiAlert>
        </Snackbar>
      </Box>
    </div>
  );
}
