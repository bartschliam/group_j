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

export default queries;
