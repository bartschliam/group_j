import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import axios from "axios";
import _ from "lodash";

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
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Label,
} from "recharts";

import queries from "../components/queries";

// Generated here: https://mokole.com/palette.html
const colors = [
  "#006400",
  "#00008b",
  "#b03060",
  "#ff4500",
  "#deb887",
  "#00ff00",
  "#00ffff",
  "#ff00ff",
  "#6495ed",
];

const CustomTooltip = ({ active, payload, label, selectedQuery }) => {
  if (active && payload && payload.length) {
    return (
      <Paper>
        <Box m={2}>
          <Typography variant="h6" gutterBottom fontWeight={800}>
            {label}
          </Typography>
          {selectedQuery.yAxis.map((yAxis, i) => {
            let item = [];
            if (!selectedQuery?.lineFilters) {
              item = payload.filter(
                (line) => line.dataKey === `${yAxis}.value`
              );
            }
            return (
              <Box>
                <Typography variant="body1" gutterBottom fontWeight={800}>
                  {yAxis}
                </Typography>
                {!selectedQuery?.lineFilters && (
                  <Typography variant="body1">{item[0].value}</Typography>
                )}
                {selectedQuery?.lineFilters &&
                  selectedQuery.lineFilters.map((filter, index) => {
                    const item = payload.filter(
                      (line) =>
                        line.name === filter &&
                        line.dataKey === `${yAxis}.value`
                    );
                    return (
                      <Typography variant="body1">
                        {filter} : {item[0].value}
                      </Typography>
                    );
                  })}
              </Box>
            );
          })}
        </Box>
      </Paper>
    );
  }

  return null;
};

const CustomScatterTooltip = ({ active, payload, label, selectedQuery }) => {
  if (active && payload && payload.length) {
    return (
      <Paper>
        <Box m={2}>
          {Object.keys(payload[0].payload).map((key, index) => (
            <Typography variant="body1" gutterBottom fontWeight={800}>
              {key} : {payload[0].payload[key].value}
            </Typography>
          ))}
        </Box>
      </Paper>
    );
  }

  return null;
};

export default function Home() {
  const [selectedQuery, setSelectedQuery] = React.useState({
    id: 0,
    label: "",
    query: "",
  });
  const [queryResult, setQueryResult] = React.useState([]);
  const [error, setError] = React.useState({ text: "", enabled: false });
  const [chartStatus, setChartStatus] = React.useState({
    map: false,
    line: false,
    bar: false,
    scatter: false,
    table: false,
  });

  const [customPlot, setCustomPlot] = React.useState(false);

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

  const handleQuerySubmit = async (e) => {
    axios
      .get("/api/sparql", {
        params: { sparqlQuery: selectedQuery.query },
      })
      .then((result) => {
        console.log(result.data);
        setQueryResult(result.data);
      })
      .catch((error) => {
        setError({ text: "Error fetching results.", enabled: true });
      });
    if (!customPlot) {
      if (selectedQuery?.mapLabelKeys) {
        setChartStatus({ ...chartStatus, map: true });
      }
      if (selectedQuery?.barX && selectedQuery?.barY) {
        setChartStatus({ ...chartStatus, bar: true });
      }
      if (selectedQuery?.xAxis && selectedQuery?.yAxis) {
        setChartStatus({ ...chartStatus, line: true });
      }
      if (selectedQuery?.scatter) {
        setChartStatus({ ...chartStatus, scatter: true });
      }
    }
  };

  const clearQuery = () => {
    setQueryResult([]);
    setSelectedQuery({
      id: 0,
      label: "",
      query: "",
    });
    clearCharts();
    setCustomPlot(false);
  };

  const clearCharts = () => {
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

  const handleQueryChange = (event, newValue) => {
    setQueryResult([]);
    setSelectedQuery(newValue);
    clearCharts();
    setCustomPlot(false);
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
          Irish Statistics
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Use the following drop down to execute a query.
        </Typography>
        <Autocomplete
          disablePortal
          options={queries}
          value={selectedQuery}
          onChange={handleQueryChange}
          renderInput={(params) => <TextField {...params} label="Query" />}
          fullWidth
        />
        <FormGroup row>
          <Button variant="contained" sx={{ m: 1 }} onClick={handleQuerySubmit}>
            Run Query
          </Button>
          <Button variant="contained" sx={{ m: 1 }} onClick={clearQuery}>
            Clear Query
          </Button>
          {selectedQuery.label === "CUSTOM" && (
            <FormControlLabel
              control={
                <Switch
                  checked={customPlot}
                  onChange={(e) => setCustomPlot(e.target.checked)}
                />
              }
              label="Custom Plotting Properties"
            />
          )}
        </FormGroup>
        {selectedQuery.label === "CUSTOM" && customPlot && (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={800}>
              Custom Plotting Properties (Advanced)
            </Typography>
            <Box>
              <Typography variant="body1" gutterBottom fontWeight={800}>
                Geographical Map
              </Typography>
              <TextField
                label="mapLabelKeys (list)"
                variant="outlined"
                value={selectedQuery.mapLabelKeys}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    mapLabelKeys: e.target.value.split(","),
                  })
                }
              />
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom fontWeight={800}>
                Line Chart
              </Typography>
              <TextField
                label="xAxis"
                variant="outlined"
                value={selectedQuery.xAxis}
                onChange={(e) =>
                  setSelectedQuery({ ...selectedQuery, xAxis: e.target.value })
                }
              />
              <TextField
                label="yAxis (list)"
                variant="outlined"
                value={selectedQuery.yAxis}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    yAxis: e.target.value.split(","),
                  })
                }
              />
              <TextField
                label="yAxisSingle"
                variant="outlined"
                value={selectedQuery.yAxisSingle}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    yAxisSingle: e.target.value,
                  })
                }
              />
              <TextField
                label="lineFilter"
                variant="outlined"
                value={selectedQuery.lineFilter}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    lineFilter: e.target.value,
                  })
                }
              />
              <TextField
                label="lineFilters (list)"
                variant="outlined"
                value={selectedQuery.lineFilters}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    lineFilters: e.target.value.split(","),
                  })
                }
              />
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom fontWeight={800}>
                Bar Chart
              </Typography>
              <TextField
                label="barX"
                variant="outlined"
                value={selectedQuery.barX}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    barX: e.target.value,
                  })
                }
              />
              <TextField
                label="barY (list)"
                variant="outlined"
                value={selectedQuery.barY}
                onChange={(e) =>
                  setSelectedQuery({
                    ...selectedQuery,
                    barY: e.target.value.split(","),
                  })
                }
              />
            </Box>
            <Box>
              <Typography variant="body1" gutterBottom fontWeight={800}>
                Scatter Plot
              </Typography>
              <TextField label="scatter" variant="outlined" />
            </Box>
          </Box>
        )}
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
        {chartStatus.line && selectedQuery?.xAxis && selectedQuery?.yAxis && (
          <ResponsiveContainer data={queryResult} width={"100%"} height={600}>
            <LineChart margin={{ top: 25, right: 20, bottom: 5, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={`${selectedQuery.xAxis}.value`}
                allowDuplicatedCategory={false}
              />
              <Tooltip
                content={<CustomTooltip selectedQuery={selectedQuery} />}
              />
              {selectedQuery?.lineFilters && (
                <Legend
                  payload={selectedQuery.lineFilters.map((item, index) => ({
                    id: item.name,
                    type: "line",
                    value: `${item}`,
                    color: colors[index],
                  }))}
                />
              )}
              {selectedQuery?.yAxisSingle && (
                <YAxis tick={{ fontSize: 10 }} yAxisId={"single"}>
                  <Label
                    value={selectedQuery.yAxisSingle}
                    angle={-90}
                    position={"left"}
                    fill="#676767"
                    fontSize={14}
                  />
                </YAxis>
              )}
              {selectedQuery.yAxis.map((yAxis, i) => {
                return (
                  <>
                    {!selectedQuery?.yAxisSingle && (
                      <YAxis
                        yAxisId={yAxis}
                        orientation={i == 0 ? "left" : "right"}
                        tick={{ fontSize: 10 }}
                      >
                        <Label
                          value={yAxis}
                          angle={-90}
                          position={i == 0 ? "left" : "right"}
                          fill="#676767"
                          fontSize={14}
                        />
                      </YAxis>
                    )}

                    {selectedQuery?.lineFilters &&
                      selectedQuery.lineFilters.map((filtered, index) => (
                        <Line
                          data={queryResult.filter(
                            (result) =>
                              result[selectedQuery.lineFilter].value ===
                              filtered
                          )}
                          name={filtered}
                          type="monotone"
                          dataKey={`${yAxis}.value`}
                          stroke={colors[index]}
                          activeDot={{ r: 8 }}
                          yAxisId={yAxis}
                        />
                      ))}
                    {!selectedQuery?.lineFilters && (
                      <Line
                        data={queryResult}
                        name={yAxis}
                        type="monotone"
                        dataKey={`${yAxis}.value`}
                        stroke={colors[i]}
                        activeDot={{ r: 8 }}
                        yAxisId={selectedQuery?.yAxisSingle ? "single" : yAxis}
                      />
                    )}
                  </>
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartStatus.bar && selectedQuery?.barX && selectedQuery?.barY && (
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={queryResult}
              margin={{ top: 25, right: 20, bottom: 5, left: 20 }}
            >
              <Tooltip
                content={<CustomScatterTooltip selectedQuery={selectedQuery} />}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

              <YAxis />
              <XAxis dataKey={`${selectedQuery.barX}.value`} />
              {selectedQuery.barY.map((bar, i) => (
                <Bar dataKey={`${bar}.value`} fill={colors[i]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartStatus.scatter && selectedQuery?.scatter && (
          <ResponsiveContainer width={"100%"} height={600}>
            <ScatterChart
              data={queryResult}
              margin={{ top: 25, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis
                type="number"
                dataKey={`${selectedQuery.scatter[0]}.value`}
                name="Crime in the Region"
                tick={{ fontSize: 10 }}
              >
                <Label
                  value={selectedQuery.scatter[0]}
                  position={"bottom"}
                  fill="#676767"
                  fontSize={14}
                />
              </XAxis>
              <YAxis
                type="number"
                dataKey={`${selectedQuery.scatter[1]}.value`}
                name="Number of Camping"
                tick={{ fontSize: 10 }}
              >
                <Label
                  value={selectedQuery.scatter[1]}
                  angle={-90}
                  position={"left"}
                  fill="#676767"
                  fontSize={14}
                />
              </YAxis>
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={<CustomScatterTooltip selectedQuery={selectedQuery} />}
              />
              <Scatter name="Crime Camping" data={queryResult} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
        {chartStatus.table && queryResult.length > 0 && (
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
            spellCheck="false"
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
