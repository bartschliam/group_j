const queries = [
  {
    id: 2,
    label: "Minimum & Maximum housing prices",
    query: `PREFIX foaf:<http://xmlns.com/foaf/0.1/>
SELECT * WHERE {
    {
        select ?house ?value ?area ?year
        where {
            ?house foaf:hasValue ?value .
            ?house foaf:hasArea ?area .
            ?house foaf:hasYear ?year .
        } order by desc (?value)
        limit 1
    }
        UNION
    {
        select ?house ?value ?area ?year
        where {
            ?house foaf:hasValue ?value .
            filter(?value > 0)
            ?house foaf:hasArea ?area .
            ?house foaf:hasYear ?year .
        } order by asc (?value)
        limit 1
    }
}
    `,
  },
  {
    id: 11,
    label: "Dublin Garda Stations",
    query: `PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX accom:<http://foo.example.org/Accommodation/>

select ?station ?lat ?long where {
    ?gardaStation rdf:type foaf:GardaStation .
    ?gardaStation foaf:hasDivision "Dublin" .
    ?gardaStation foaf:hasYear ?year .
    filter(year(?year) = 2016) .
    ?gardaStation foaf:hasLatitude ?lat .
    ?gardaStation foaf:hasLongitude ?long .
    ?gardaStation foaf:hasStation ?station .
    } `,
  },
];

export default queries;
