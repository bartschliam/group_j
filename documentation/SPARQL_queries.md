- [Query 1](#query-1-number-of-hostels)
- [Query 2](#query-2-min-max-of-housing-prices)
- [Query 3](#query-3-in-progress)
- [Query 4](#query-4-in-progress)
- [Query 5](#query-5-in-progress-testing-how-many-x-crimes-reported-per-station)
- [Query 6](#query-6-in-progress-testing-ranked-list-for-house-prices-amount-of-accomm-and-crime)
- [Query 7](#query-7-to-do)
- [Query 8](#query-8-to-do)
- [Query 9](#query-9-to-do)
- [Query 10](#query-10-to-do)

### Query 1. Number of Hostels TODO: Should replace

---

```
PREFIX accom:<http://xmlns.com/foaf/0.1/Accommodation>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select (count (distinct ?type) as ?count)
where {
?s foaf:hasType ?type .
}
```

---

### Query 2. Min Max of Housing Prices

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

---

### Query 3 (in progress) In areas where there's an increase in new housing sale value, what trends are there in crime over time?

## Find the difference or % increase from past year for crimes and for prices per year

---

```

```

---

### Query 4 (in progress)

---

```
PREFIX accom:<http://xmlns.com/foaf/0.1/Accommodation>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX crime:<http://foo.example.org/Station/20646/>

select *
where {
    ?a foaf:hasMurderOffences ?b.
    ?a foaf:hasBurglaryOffences ?b.
    ?a foaf:hasDrugOffences ?b.
    ?a foaf:hasDamagedPropertyOffences ?b
}
ORDER BY DESC(?b)
```

---

### Query 5 (Done but maybe can be made more presentable?)

#### testing how many X crimes reported per station

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

---

### Query 6 (in progress)

#### testing ranked list for house prices, amount of accomm and crime

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

---

### Query 7 (to do) In 2016, in the top crime location, what was the volume of housing sales and what other types of accomodation existed.

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

---

### Query 8 (to do) In high crime areas, what types of accomodation is there? (Do people go camping where there is crime?)

IN PROGRESS NOT DONE BECAUSE IT STILL IS BIT BROKEY

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

---

### Query 9 (to do) In low crime areas, are new houses sold for more than old houses?

Not perfect but it gets the job done. Can be improved later

```
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX ex:<http://foo.example.org/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

select ?gardaStation ?totalCrime ?division ?newHousing ?secondHousing
where {
    {
    select ?gardaStation ?totalCrime ?division ?year
    where {
        ?gardaStation foaf:hasYear ?year .
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
        filter(?totalCrime = 0) .
        bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
    } order by asc (?totalCrime)
    } OPTIONAL {
      	?newHousing rdf:type foaf:HousePrice .
        ?newHousing foaf:hasYear ?year .
        ?newHousing foaf:hasArea ?division .
        ?newHousing foaf:hasStatistic "New House Prices"
    } OPTIONAL {
      	?secondHousing rdf:type foaf:HousePrice .
        ?secondHousing foaf:hasYear ?year .
        ?secondHousing foaf:hasArea ?division .
        ?secondHousing foaf:hasStatistic "Second Hand House Prices"
    }
}


```

---

### Query 10 (to do) Do areas with a large amount of accomodation have a high house prices?

## FYI: There are only 5 named counties in the housing prices set, the others are national and other areas.

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

```
