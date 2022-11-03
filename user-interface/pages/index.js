import * as React from "react";
import Head from "next/head";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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

  return (
    <div>
      <Head>
        <title>User Interface</title>
      </Head>
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
      />
      <Button
        variant="contained"
        onClick={() => {
          alert(`Selected Query: ${selectedQuery.label}`);
        }}
      >
        Select Query
      </Button>
    </div>
  );
}
