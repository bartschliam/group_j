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

## TODO: Query 1

### Where can I go camping where there is low petty crime?

---

```

```

[Index](#sparql-queries-index)

---

## Query 2

### What is the mimum and maximum of housing prices in Ireland?

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

### What trends are there in housing value with relation to the amount of crime in Ireland

---

```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?area ?year ?housingValue ?totalCrimes where {
	?housing rdf:type foaf:House .
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

### TODO: Query 4: Does more attractions mean higher house prices? Here are the house prices and number of attractions

PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

select \* where {
{
select ?county ?TotalAttractions ?value where {
?house rdf:type foaf:House .
?house foaf:hasArea ?county .
?house foaf:hasValue ?value .
{
select ?county (count(?Attractions) as ?TotalAttractions) where {
?Attractions rdf:type foaf:Attraction .
?Attractions foaf:hasAddressRegion ?county .
Filter(contains(?county,'Dublin'))
} group by ?county
}
}group by ?county ?TotalAttractions ?value order by desc(?value) limit 1
}union{
select ?county ?TotalAttractions ?value where {
?house rdf:type foaf:House .
?house foaf:hasArea ?county .
?house foaf:hasValue ?value .
{
select ?county (count(?Attractions) as ?TotalAttractions) where {
?Attractions rdf:type foaf:Attraction .
?Attractions foaf:hasAddressRegion ?county .
Filter(contains(?county,'Galway'))
} group by ?county
}
}group by ?county ?TotalAttractions ?value order by desc(?value) limit 1
}union{
select ?county ?TotalAttractions ?value where {
?house rdf:type foaf:House .
?house foaf:hasArea ?county .
?house foaf:hasValue ?value .
{
select ?county (count(?Attractions) as ?TotalAttractions) where {
?Attractions rdf:type foaf:Attraction .
?Attractions foaf:hasAddressRegion ?county .
Filter(contains(?county,'Cork'))
} group by ?county
}
}group by ?county ?TotalAttractions ?value order by desc(?value) limit 1
}union{
select ?county ?TotalAttractions ?value where {
?house rdf:type foaf:House .
?house foaf:hasArea ?county .
?house foaf:hasValue ?value .
{
select ?county (count(?Attractions) as ?TotalAttractions) where {
?Attractions rdf:type foaf:Attraction .
?Attractions foaf:hasAddressRegion ?county .
Filter(contains(?county,'Limerick'))
} group by ?county
}
}group by ?county ?TotalAttractions ?value order by desc(?value) limit 1
}union{
select ?county ?TotalAttractions ?value where {
?house rdf:type foaf:House .
?house foaf:hasArea ?county .
?house foaf:hasValue ?value .
{
select ?county (count(?Attractions) as ?TotalAttractions) where {
?Attractions rdf:type foaf:Attraction .
?Attractions foaf:hasAddressRegion ?county .
Filter(contains(?county,'Waterford'))
} group by ?county
}
}group by ?county ?TotalAttractions ?value order by desc(?value) limit 1
}
}order by desc (?TotalAttractions)

---

```

```

[Index](#sparql-queries-index)

---

## Query 5

### How many X crimes reported per station (Sum of entire dataset)

---

```
PREFIX station:<http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?station ?division (sum(?kidnapping + ?neglect + ?robbery + ?burglary + ?theft + ?drugoffences + ?weaponsexplosives + ?damageproperty + ?offensesagainstgovernment + ?publicorder ) AS ?totalCrime) ?lat ?long
where {
    ?gSstation rdf:type foaf:GardaStation.

	?gSstation foaf:hasKidnappingOffences ?kidnapping.
	?gSstation foaf:hasNeglectOffences ?neglect.
	?gSstation foaf:hasRobberyOffences ?robbery.
	?gSstation foaf:hasBurglaryOffences ?burglary.
	?gSstation foaf:hasTheftOffences ?theft.
    ?gSstation foaf:hasFraudOffences ?fraud.
    ?gSstation foaf:hasDrugOffences ?drugoffences.
    ?gSstation foaf:hasWeaponsOffences ?weaponsexplosives.
    ?gSstation foaf:hasDamagedPropertyOffences ?damageproperty.
    ?gSstation foaf:hasOffencesAgainstGovernment ?offensesagainstgovernment.
    ?gSstation foaf:hasPublicOrderOffences ?publicorder.

    ?gSstation foaf:hasYear ?year.
    ?gSstation foaf:hasDivision ?division .
    ?gSstation foaf:hasStation ?station .
    ?gSstation foaf:hasLatitude ?lat .
    ?gSstation foaf:hasLongitude ?long .
}
GROUP BY ?division ?station ?lat ?long
```

[Index](#sparql-queries-index)

---

## TODO: Query 6

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

## TODO: Query 7

### In 2016, in the top crime location, what was the volume of housing sales and what other types of accomodation existed.

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

## TODO: Query 8

### In high crime areas, what types of accomodation is there? (Do people go camping where there is crime?)

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
      	?newHousing rdf:type foaf:House .
        ?newHousing foaf:hasYear ?year .
        ?newHousing foaf:hasArea ?division .
        ?newHousing foaf:hasStatistic "New House Prices" .
        ?newHousing foaf:hasValue ?newHouseValue
    } OPTIONAL {
      	?newHousing rdf:type foaf:House .
        ?newHousing foaf:hasYear ?year .
        ?newHousing foaf:hasArea "National" .
        ?newHousing foaf:hasStatistic "New House Prices" .
        ?newHousing foaf:hasValue ?newHouseValue
    } OPTIONAL {
      	?secondHousing rdf:type foaf:House .
        ?secondHousing foaf:hasYear ?year .
        ?secondHousing foaf:hasArea ?division .
        ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
        ?secondHousing foaf:hasValue ?secondHouseValue
    } OPTIONAL {
      	?secondHousing rdf:type foaf:House .
        ?secondHousing foaf:hasYear ?year .
        ?secondHousing foaf:hasArea "National" .
        ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
        ?secondHousing foaf:hasValue ?secondHouseValue
    }
}
```

[Index](#sparql-queries-index)

---

## TODO: Query 10

### (to do) Do areas with a large amount of accomodation have a high house prices?

## FYI: There are only 5 named counties in the housing prices set, the others are national and other areas.

```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX accom:<http://foo.example.org/Accommodation/>

select *
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
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT *
WHERE {
  {
    SELECT (COUNT(?accom) AS ?TotalBandBs) ?region
    WHERE {
      ?accom rdf:type foaf:Accommodation .
      ?accom foaf:hasType ?type .
      ?accom foaf:hasAddressRegion ?county .
      FILTER (CONTAINS(?type, "B&B"))
      FILTER (?county = ?region)
      {
        SELECT *
        WHERE {
          {
            ?housePrice foaf:hasValue ?value .
            ?housePrice foaf:hasArea ?region .
          }
        }
        ORDER BY ?value
        LIMIT 1
      }
    }
    GROUP BY ?region
  }
  UNION
  {
    SELECT (COUNT(?accom) AS ?TotalBandBs) ?region
    WHERE {
      ?accom rdf:type foaf:Accommodation .
      ?accom foaf:hasType ?type .
      ?accom foaf:hasAddressRegion ?county .
      FILTER (CONTAINS(?type, "B&B"))
      FILTER (?county = ?region)
      {
        SELECT *
        WHERE {
          {
            ?housePrice foaf:hasValue ?value .
            ?housePrice foaf:hasArea ?region .
          }
        }
        ORDER BY DESC(?value)
        LIMIT 1
      }
    }
    GROUP BY ?region
  }
}
```

[Index](#sparql-queries-index)

---
