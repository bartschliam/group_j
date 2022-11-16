- [Query 1](#query-1-number-of-hostels)
- [Query 2](#query-2-min-max-of-housing-prices)
- [Testing](#testing)

### Query 1. Number of Hostels TODO: Should replace

---

PREFIX accom:<http://foo.example.org/Accommodation/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select (count (distinct ?names) as ?count)
where {
accom:Hostel foaf:AddressLocality ?names .
}

---

### Query 2. Min Max of Housing Prices

---

PREFIX foaf:<http://xmlns.com/foaf/0.1/>
SELECT \* WHERE {
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

### Query 3: In areas where there's an increase in new housing sale value, what trends are there in crime over time?

### Query 4: In high crime areas, what types of accomodation is there? (Do people go camping where there is crime?)

### Query 5: In low crime areas, are new houses sold for more than old houses?

### Query 6: Do areas with a large amount of accomodation have a high house prices?

### Query 7: In 2016, in the top crime location, what was the volume of housing sales and what other types of accomodation existed.

- @yannickgloster

### Query 8: Year and location with the largest damage to property and to the environment, how did house sale value compare to the year with the least.

---

### testing

---

PREFIX accom:<http://foo.example.org/Accommodation/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX crime:<http://foo.example.org/Station/20646/>

select \*
where {
?a foaf:Attempted-Murder-Assaults-Harrasments ?b.
?a foaf:Burglary ?b.
?a foaf:Controlled-Drug-Offences ?b.
?a foaf:Damage-Property ?b
}
ORDER BY DESC(?b)

---

### testing how many X crimes reported per station

---

PREFIX station:<http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select ?station SUM(?kidnapping)
where {
?station foaf:Kidnapping ?kidnapping.
}

---

### testing ranked list for house prices, amount of accomm and crime

---

https://stackoverflow.com/questions/17313730/how-to-rank-values-in-sparql
this might be handy but website currently down

### testing

PREFIX station: <http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select ?station ?division ?murder ?neglect ?kidnapping where {  
 {
?station foaf:Attempted-Murder-Assaults-Harrasments ?murder.
?station foaf:Dangerous-Negligent-Acts ?neglect.
?station foaf:Kidnapping ?kidnapping.
?station foaf:Kidnapping ?kidnapping.
?station foaf:Division ?division.
}
}order by desc (?kidnapping)
