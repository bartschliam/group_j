# SPARQL Queries Index
- [Query 1](#query-1)
- [Query 2](#query-2)
- [Query 3](#query-3)
- [Query 4](#query-4)
- [Query 5](#query-5)
- [Query 6](#query-6)
- [Query 7](#query-7)
- [Query 8](#query-8)
- [Query 9](#query-9)
- [Query 10](#query-10)
- [Query 11](#query-11)

---
## Query 1
### TODO: Should replace
### Number of Hostels 
---
```
PREFIX accom:<http://xmlns.com/foaf/0.1/Accommodation>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select (count (distinct ?type) as ?count)
where {
?s foaf:hasType ?type .
}
```
[Index](#sparql-queries-index)

---
## Query 2
### Min Max of Housing Prices
---
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
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
```
[Index](#sparql-queries-index)

---

## Query 3 
### In areas where there's an increase in new housing sale value, what trends are there in crime over time?
### Find the difference or % increase from past year for crimes and for prices per year
---
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?area ?year ?housingValue ?totalCrimes where {
	?housing rdf:type foaf:HousePrice .
    ?housing foaf:hasYear ?year .
    ?housing foaf:hasArea ?area .
    ?housing foaf:hasStatistic "New House Prices" .
    ?housing foaf:hasValue ?housingValue .
    filter(?area != "National")
    filter(?area != "Other areas")
    {
        select  ?area (SUM(?totalCrime) as ?totalCrimes) ?year
        where {
            ?gardaStation foaf:hasYear ?year .
            ?gardaStation rdf:type foaf:GardaStation .
            ?gardaStation foaf:hasDivision ?area .
            ?gardaStation foaf:hasStation ?station .

            ?gardaStation foaf:hasMurderOffences  ?numMurders .
            ?gardaStation foaf:hasBurglaryOffences ?numBurglary .
            ?gardaStation foaf:hasDrugOffences ?numDrugs .
            ?gardaStation foaf:hasDamagedPropertyOffences ?numPropertyDamage .
            ?gardaStation foaf:hasNeglectOffences ?numDangerousActs .
            ?gardaStation foaf:hasFraudOffences ?numFraud .
            ?gardaStation foaf:hasKidnappingOffences ?numKidnapping .
            ?gardaStation foaf:hasOffencesAgainstGovernment ?numOffensesGov .
            ?gardaStation foaf:hasPublicOrderOffences ?numPublicOrder .
            ?gardaStation foaf:hasRobberyOffences ?numRobbery .
            ?gardaStation foaf:hasTheftOffences ?numTheft .
            ?gardaStation foaf:hasWeaponsOffences ?numWeapons .
            bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
        } groupby ?area ?year
    }
} order by ?year
```
[Index](#sparql-queries-index)

---
### Query 4
### TODO
---
```

```
[Index](#sparql-queries-index)

---
## Query 5 
### How many X crimes reported per station
### (Done but maybe can be made more presentable?)
---
```
PREFIX station:<http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select ?station (sum(?kidnapping + ?neglect + ?robbery + ?burglary + ?theft + ?drugoffences + ?weaponsexplosives + ?damageproperty + ?offensesagainstgovernment + ?publicorder ) AS ?total)
where {
	?station foaf:hasKidnappingOffences ?kidnapping.
	?station foaf:hasNeglectOffences ?neglect.
	?station foaf:hasRobberyOffences ?robbery.
	?station foaf:hasBurglaryOffences ?burglary.
	?station foaf:hasTheftOffences ?theft.
    ?station foaf:hasFraudOffences ?fraud.
    ?station foaf:hasDrugOffences ?drugoffences.
    ?station foaf:hasWeaponsOffences ?weaponsexplosives.
    ?station foaf:hasDamagedPropertyOffences ?damageproperty.
    ?station foaf:hasOffencesAgainstGovernment ?offensesagainstgovernment.
    ?station foaf:hasPublicOrderOffences ?publicorder.
}
GROUP BY ?station
```
[Index](#sparql-queries-index)

---

## Query 6 
### ranked list for house prices, amount of accomm and crime, testing (in progress)
---
```
https://stackoverflow.com/questions/17313730/how-to-rank-values-in-sparql
this might be handy but website currently down

### testing

PREFIX station: <http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select ?station ?division ?murder ?neglect ?kidnapping where {
 {
?station foaf:hasMurders ?murder.
?station foaf:hasNeglect ?neglect.
?station foaf:hasKidnapping ?kidnapping.
?station foaf:hasKidnapping ?kidnapping.
?station foaf:hasDivision ?division.
}
}order by desc (?kidnapping)


```
[Index](#sparql-queries-index)

---
## Query 7
### (to do) In 2016, in the top crime location, what was the volume of housing sales and what other types of accomodation existed.
---
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?gardaStation ?totalCrime ?statistic ?value
where {
    ?housing rdf:type foaf:HousePrice .
    ?housing foaf:hasYear ?year .
    ?housing foaf:hasValue ?value .
    filter(year(?year) = 2016) .
    ?housing foaf:hasArea ?division .
    ?housing foaf:hasStatistic ?statistic .

    {
    select ?gardaStation ?totalCrime ?division
    where {
        ?gardaStation foaf:hasYear ?year .
        filter(year(?year) = 2016) .
        ?gardaStation rdf:type foaf:GardaStation .
        ?gardaStation foaf:hasDivision ?division .
        ?gardaStation foaf:hasMurderOffences  ?numMurders .
        ?gardaStation foaf:hasBurglaryOffences ?numBurglary .
        ?gardaStation foaf:hasDrugOffences ?numDrugs .
        ?gardaStation foaf:hasDamagedPropertyOffences ?numPropertyDamage .
        ?gardaStation foaf:hasNeglectOffences ?numDangerousActs .
        ?gardaStation foaf:hasFraudOffences ?numFraud .
        ?gardaStation foaf:hasKidnappingOffences ?numKidnapping .
        ?gardaStation foaf:hasOffencesAgainstGovernment ?numOffensesGov .
        ?gardaStation foaf:hasPublicOrderOffences ?numPublicOrder .
        ?gardaStation foaf:hasRobberyOffences ?numRobbery .
        ?gardaStation foaf:hasTheftOffences ?numTheft .
        ?gardaStation foaf:hasWeaponsOffences ?numWeapons .
        bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
    } order by desc (?totalCrime)
    limit 1
    }
}
```
[Index](#sparql-queries-index)

---
## Query 8 
### (to do) In high crime areas, what types of accomodation is there? (Do people go camping where there is crime?)
### IN PROGRESS NOT DONE BECAUSE IT STILL IS BIT BROKEY
---
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?housing ?name ?division where {
    ?housing rdf:type foaf:Accommodation .
	?housing foaf:hasType ?type .
    ?housing foaf:hasName ?name .
    ?housing foaf:hasAddressRegion ?region .

    ?gardaStation foaf:hasYear ?year .
    filter(year(?year) = 2016) .
    ?gardaStation rdf:type foaf:GardaStation .
    ?gardaStation foaf:hasDivision ?region.
    ?gardaStation foaf:hasMurderOffences  ?numMurders .
    ?gardaStation foaf:hasBurglaryOffences ?numBurglary .
    ?gardaStation foaf:hasDrugOffences ?numDrugs .
    ?gardaStation foaf:hasDamagedPropertyOffences ?numPropertyDamage .
    ?gardaStation foaf:hasNeglectOffences ?numDangerousActs .
    ?gardaStation foaf:hasFraudOffences ?numFraud .
    ?gardaStation foaf:hasKidnappingOffences ?numKidnapping .
    ?gardaStation foaf:hasOffencesAgainstGovernment ?numOffensesGov .
    ?gardaStation foaf:hasPublicOrderOffences ?numPublicOrder .
    ?gardaStation foaf:hasRobberyOffences ?numRobbery .
    ?gardaStation foaf:hasTheftOffences ?numTheft .
    ?gardaStation foaf:hasWeaponsOffences ?numWeapons .
    bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
}
```
[Index](#sparql-queries-index)

---
## Query 9 
### In low crime areas, are new houses sold for more than old houses?
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?division ?totalCrimes ?newHouseValue ?secondHouseValue ?year
where {
    {
        select  ?division (SUM(?totalCrime) as ?totalCrimes) ?year
    where {
        ?gardaStation foaf:hasYear ?year .
        ?gardaStation rdf:type foaf:GardaStation .
        ?gardaStation foaf:hasDivision ?division .
        ?gardaStation foaf:hasStation ?station .

        ?gardaStation foaf:hasMurderOffences  ?numMurders .
        ?gardaStation foaf:hasBurglaryOffences ?numBurglary .
        ?gardaStation foaf:hasDrugOffences ?numDrugs .
        ?gardaStation foaf:hasDamagedPropertyOffences ?numPropertyDamage .
        ?gardaStation foaf:hasNeglectOffences ?numDangerousActs .
        ?gardaStation foaf:hasFraudOffences ?numFraud .
        ?gardaStation foaf:hasKidnappingOffences ?numKidnapping .
        ?gardaStation foaf:hasOffencesAgainstGovernment ?numOffensesGov .
        ?gardaStation foaf:hasPublicOrderOffences ?numPublicOrder .
        ?gardaStation foaf:hasRobberyOffences ?numRobbery .
        ?gardaStation foaf:hasTheftOffences ?numTheft .
        ?gardaStation foaf:hasWeaponsOffences ?numWeapons .
        filter(?totalCrime = 0) .
        bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
    } groupby ?division ?year
    } OPTIONAL {
      	?newHousing rdf:type foaf:HousePrice .
        ?newHousing foaf:hasYear ?year .
        ?newHousing foaf:hasArea ?division .
        ?newHousing foaf:hasStatistic "New House Prices" .
        ?newHousing foaf:hasValue ?newHouseValue
    } OPTIONAL {
      	?newHousing rdf:type foaf:HousePrice .
        ?newHousing foaf:hasYear ?year .
        ?newHousing foaf:hasArea "National" .
        ?newHousing foaf:hasStatistic "New House Prices" .
        ?newHousing foaf:hasValue ?newHouseValue
    } OPTIONAL {
      	?secondHousing rdf:type foaf:HousePrice .
        ?secondHousing foaf:hasYear ?year .
        ?secondHousing foaf:hasArea ?division .
        ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
        ?secondHousing foaf:hasValue ?secondHouseValue
    } OPTIONAL {
      	?secondHousing rdf:type foaf:HousePrice .
        ?secondHousing foaf:hasYear ?year .
        ?secondHousing foaf:hasArea "National" .
        ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
        ?secondHousing foaf:hasValue ?secondHouseValue
    }
}
```
[Index](#sparql-queries-index)

---
## Query 10 
### (to do) Do areas with a large amount of accomodation have a high house prices?
## FYI: There are only 5 named counties in the housing prices set, the others are national and other areas.
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX accom:<http://foo.example.org/Accommodation/>

select \*
where
{
{
select distinct ("Other areas" as ?reigon) (count(?accomms) as ?totalaccom)
where
{
?x foaf:hasAddressRegion ?place .
?x foaf:hasName ?accomms .
FILTER (?place NOT IN ("Cork","Dublin","Galway","Waterford","Limerick")).
}
}
UNION
{
select distinct ?reigon (count(?accomms) as ?totalaccom)
where
{
?x foaf:hasAddressRegion ?reigon .
?x foaf:hasName ?accomms .
?y foaf:hasArea ?reigon .
?y foaf:hasValue ?price .
}
GROUP BY(?reigon)
}
}
```
[Index](#sparql-queries-index)

---
## Query 11
### Does the least expensive region have more B&B's than the most expensive region?
```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
select _ {
{
SELECT (count(?accom) as ?TotalBandBs) ?leastExpensiveRegion WHERE {
?accom rdf:type foaf:Accommodation .
?accom foaf:hasType ?type .
?accom foaf:hasAddressRegion ?county .
Filter (contains(?type,"B&B"))
Filter (?county = ?leastExpensiveRegion)
{
select _ where {
{
?housePrice foaf:hasValue ?value .
?housePrice foaf:hasArea ?leastExpensiveRegion .
}
}order by asc (?value) limit 1
}
} group by ?leastExpensiveRegion
}
union {
SELECT (count(?accom) as ?TotalBandBs) ?mostExpensiveRegion WHERE {
?accom rdf:type foaf:Accommodation .
?accom foaf:hasType ?type .
?accom foaf:hasAddressRegion ?county .
Filter (contains(?type,"B&B"))
Filter (?county = ?mostExpensiveRegion)
{
select \* where {
{
?housePrice foaf:hasValue ?value .
?housePrice foaf:hasArea ?mostExpensiveRegion .
}
}order by desc (?value) limit 1
}
} group by ?mostExpensiveRegion
}
}
```
[Index](#sparql-queries-index)

---