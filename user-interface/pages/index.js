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

const queries = [
  {
    label: "WORKING EXAMPLE: Count the number of Hostels in Ireland",
    query: `PREFIX accom:<http://foo.example.org/Accommodation/>
  PREFIX foaf:<http://xmlns.com/foaf/0.1/>
  
  select (count (distinct ?names) as ?count)
  where { 
    accom:Hostel foaf:AddressLocality ?names .
  }
  `,
  },
  {
    label: "Min Max Housing",
    query: `PREFIX foaf:<http://xmlns.com/foaf/0.1/>
    SELECT * WHERE {
        {
        select ?house ?value ?area ?year 
        where {
            ?house foaf:Value ?value .
            ?house foaf:Area ?area .
            ?house foaf:Year ?year .
        } order by desc (?value)
        limit 1
        }
    UNION
        {
        select ?house ?value ?area ?year 
        where {
            ?house foaf:Value ?value .
                    filter(?value > 0)
            ?house foaf:Area ?area .
            ?house foaf:Year ?year .
        } order by asc (?value)
        limit 1
        }
    }
  `,
  },
  { label: "Is there a correlation between new house prices and crime?" },
  {
    label: "Is there a correlation between second hand house prices and crime?",
  },
  {
    label:
      "Is there a correlation between prices and Minor and non-minor offences?",
  },
  {
    label:
      "Is there a correlation between prices and Serious and non-serious offences?",
  },
  {
    label:
      "Is there a correlation between prices and Arrestable and non-arrestable offences?",
  },
  { label: "Is there a higher crime rate for certain areas?" },
  {
    label:
      "What was the most expensive price year as well as the most amount of crime year?",
  },
  {
    label:
      "What was the cheapest price year as well as the lowest amount of crime year?",
  },
  { label: "Return the top 10 years with the most crime and cheapest prices?" },
  { label: "Min and max of price and crimes?" },
  {
    label:
      "Does an increase in crime correlate with the amount of second hand houses sold?",
  },
];

export default function Home() {
  const [selectedQuery, setSelectedQuery] = React.useState("");
  const [queryResult, setQueryResult] = React.useState([]);
  const [error, setError] = React.useState({ text: "", enabled: false });
  const [chartStatus, setChartStatus] = React.useState({
    bar: true,
    map: true,
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
  };

  const clearQuery = () => {
    setQueryResult([]);
    setSelectedQuery("");
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
          id="combo-box"
          options={queries}
          value={selectedQuery}
          onChange={(event, newValue) => {
            setSelectedQuery(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Query" />}
          fullWidth
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleQuerySubmit}>
          Run Query
        </Button>
        <Button variant="contained" sx={{ mt: 1 }} onClick={clearQuery}>
          Clear Query
        </Button>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={chartStatus.map}
                onChange={(e) => handleSwitch(e, "map")}
              />
            }
            label="Map"
          />
          <FormControlLabel
            control={
              <Switch
                checked={chartStatus.bar}
                onChange={(e) => handleSwitch(e, "bar")}
              />
            }
            label="Bar"
          />
        </FormGroup>
        {chartStatus.bar && (
          <ResponsiveContainer width={"100%"} height={300}>
            <BarChart
              data={queryResult}
              margin={{ top: 25, right: 20, bottom: 5, left: 20 }}
            >
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

              <YAxis />
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
        {chartStatus.map && (
          <Box mt={2}>
            <Map />
          </Box>
        )}
        <Box bgcolor={blueGrey[50]} mt={2} p={2} borderRadius={1}>
          <Typography variant="body1" gutterBottom fontWeight={800}>
            SPARQL:
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {selectedQuery.query}
          </Typography>
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
