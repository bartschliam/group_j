import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import queries from "../components/queries";

export default function Home() {
  const [selectedQuery, setSelectedQuery] = React.useState({
    id: 0,
    label: "",
    mapLabelKeys: [],
    query: "",
  });
  const [queryResult, setQueryResult] = React.useState([]);
  const [error, setError] = React.useState({ text: "", enabled: false });
  const [chartStatus, setChartStatus] = React.useState({
    map: false,
    line: false,
    bar: false,
    table: false,
  });

  const Map = React.useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    [
      /* list variables which should trigger a re-render here */
    ]
  );

  // TODO: Process the returned data
  const handleQuerySubmit = async (e) => {
    axios
      .get("/api/sparql", {
        params: { sparqlQuery: selectedQuery.query },
      })
      .then((result) => {
        setQueryResult(result.data);
      })
      .catch((error) => {
        setError({ text: "Error fetching results.", enabled: true });
      });
    if (selectedQuery.mapLabelKeys.length > 0) {
      setChartStatus({ ...chartStatus, map: true });
    }
  };

  const clearQuery = () => {
    setQueryResult([]);
    setSelectedQuery({ id: 0, label: "", mapLabelKeys: [], query: "" });
    const updatedChartStatus = chartStatus;
    Object.keys(chartStatus).map((chart) => {
      updatedChartStatus[chart] = false;
    });
    setChartStatus(updatedChartStatus);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError({ text: "", enabled: false });
  };

  const handleSwitch = (event, type) => {
    setChartStatus({ ...chartStatus, [type]: event.target.checked });
  };

  const handleCustomQuery = (event) => {
    setSelectedQuery({
      ...selectedQuery,
      id: 11,
      label: "CUSTOM",
      query: event.target.value,
    });
  };

  return (
    <div>
      <Head>
        <title>User Interface</title>
      </Head>
      <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }} m={2} pb={3}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Housing, Accommodation, and Crime
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Use the following drop down to execute a query.
        </Typography>
        <Autocomplete
          disablePortal
          options={queries}
          value={selectedQuery}
          onChange={(event, newValue) => {
            setSelectedQuery(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Query" />}
          fullWidth
        />
        <Button variant="contained" sx={{ m: 1 }} onClick={handleQuerySubmit}>
          Run Query
        </Button>
        <Button variant="contained" sx={{ m: 1 }} onClick={clearQuery}>
          Clear Query
        </Button>
        <FormGroup row>
          {Object.keys(chartStatus).map((chart) => (
            <FormControlLabel
              control={
                <Switch
                  checked={chartStatus[chart]}
                  onChange={(e) => handleSwitch(e, chart)}
                />
              }
              label={chart.charAt(0).toUpperCase() + chart.slice(1)}
            />
          ))}
        </FormGroup>
        {chartStatus.map && (
          <Box mt={2}>
            <Map data={queryResult} labelKeys={selectedQuery.mapLabelKeys} />
          </Box>
        )}
        {chartStatus.bar && (
          <ResponsiveContainer width={"100%"} height={300}>
            {/* TODO: LINE CHART HERE */}
          </ResponsiveContainer>
        )}
        {chartStatus.bar && (
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={queryResult}
              margin={{ top: 25, right: 20, bottom: 5, left: 20 }}
            >
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

              <YAxis />
              {/* TODO: Fix bar chart */}
              {queryResult[0]?.value && (
                <>
                  <Bar dataKey="value.value" fill="#8884d8" />
                  <XAxis dataKey="area.value" />
                </>
              )}
              {queryResult[0]?.count && (
                <>
                  <Bar dataKey="count.value" fill="#8884d8" />
                  <XAxis dataKey="count" label="Count" />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartStatus.table && (
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
        <Box bgcolor={blueGrey[50]} mt={2} p={2} borderRadius={1}>
          <TextField
            label="SPARQL"
            multiline
            rows={selectedQuery.query.split(/\r\n|\r|\n/).len}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleCustomQuery}
            value={selectedQuery.query}
            spellcheck="false"
          />
        </Box>
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
