import * as React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";

const queries = [
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

  return (
    <div>
      <Head>
        <title>User Interface</title>
      </Head>
      <Box sx={{ width: "100%", maxWidth: 500 }} m={2} pb={3}>
        <Typography variant="h4" gutterBottom fontWeight={800}>
          Knowledge Engineering
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
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Query" />}
          fullWidth
        />
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => {
            console.log(`Selected Query: ${selectedQuery.label}`);
          }}
        >
          Select Query
        </Button>
        <Box bgcolor={blueGrey[50]} mt={2} p={2} borderRadius={1}>
          <Typography variant="body1" gutterBottom fontWeight={800}>
            Output:
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedQuery.label}
          </Typography>
        </Box>
        <Map />
      </Box>
    </div>
  );
}
