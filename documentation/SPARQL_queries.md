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
PREFIX accom:<http://foo.example.org/Accommodation/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select (count (distinct ?names) as ?count)
where {
accom:Hostel foaf:AddressLocality ?names .
}
```

---

### Query 2. Min Max of Housing Prices

---

```
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
```

---

### Query 3 (in progress) In areas where there's an increase in new housing sale value, what trends are there in crime over time?

---

```

```

---

### Query 4 (in progress)

---

```
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
```

---

### Query 5 (in progress)

#### testing how many X crimes reported per station

---

```
PREFIX station:<http://foo.example.org/Station/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>

select ?station (sum(?kidnapping + ?neglect + ?robbery + ?burglary + ?theft + ?drugoffences + ?weaponsexplosives + ?damageproperty + ?offensesagainstgovernment + ?publicorder ) AS ?total)
where {
	?station foaf:Kidnapping ?kidnapping.
	?station foaf:Dangerous-Negligent-Acts ?neglect.
	?station foaf:Robbery ?robbery.
	?station foaf:Burglary ?burglary.
	?station foaf:Theft ?theft.
    ?station foaf:Fraud ?fraud.
    ?station foaf:Controlled-Drug-Offences ?drugoffences.
    ?station foaf:Weapons-Explosives ?weaponsexplosives.
    ?station foaf:Damage-Property ?damageproperty.
    ?station foaf:Offenses-Against-Government ?offensesagainstgovernment.
    ?station foaf:Public-Order ?publicorder.
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
?station foaf:Attempted-Murder-Assaults-Harrasments ?murder.
?station foaf:Dangerous-Negligent-Acts ?neglect.
?station foaf:Kidnapping ?kidnapping.
?station foaf:Kidnapping ?kidnapping.
?station foaf:Division ?division.
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
    ?housing foaf:Year ?year .
    ?housing foaf:Value ?value .
    filter(year(?year) = 2016) .
    ?housing foaf:Area ?division .
    ?housing foaf:Statistic ?statistic .

    {
    select ?gardaStation ?totalCrime ?division
    where {
        ?gardaStation foaf:Year ?year .
        filter(year(?year) = 2016) .
        ?gardaStation rdf:type foaf:GardaStation .
        ?gardaStation foaf:hasDivision ?division .
        ?gardaStation foaf:Attempted-Murder-Assaults-Harrasments  ?numMurders .
        ?gardaStation foaf:Burglary ?numBurglary .
        ?gardaStation foaf:Controlled-Drug-Offences ?numDrugs .
        ?gardaStation foaf:Damage-Property ?numPropertyDamage .
        ?gardaStation foaf:Dangerous-Negligent-Acts ?numDangerousActs .
        ?gardaStation foaf:Fraud ?numFraud .
        ?gardaStation foaf:Kidnapping ?numKidnapping .
        ?gardaStation foaf:Offenses-Against-Government ?numOffensesGov .
        ?gardaStation foaf:Public-Order ?numPublicOrder .
        ?gardaStation foaf:Robbery ?numRobbery .
        ?gardaStation foaf:Theft ?numTheft .
        ?gardaStation foaf:Weapons-Explosives ?numWeapons .
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
    ?housing rdf:type foaf:Accom .
	?housing foaf:type ?type .
    ?housing foaf:name ?name .
    ?housing foaf:AddressRegion ?region .

    ?gardaStation foaf:Year ?year .
    filter(year(?year) = 2016) .
    ?gardaStation rdf:type foaf:GardaStation .
    ?gardaStation foaf:hasDivision ?region.
    ?gardaStation foaf:Attempted-Murder-Assaults-Harrasments  ?numMurders .
    ?gardaStation foaf:Burglary ?numBurglary .
    ?gardaStation foaf:Controlled-Drug-Offences ?numDrugs .
    ?gardaStation foaf:Damage-Property ?numPropertyDamage .
    ?gardaStation foaf:Dangerous-Negligent-Acts ?numDangerousActs .
    ?gardaStation foaf:Fraud ?numFraud .
    ?gardaStation foaf:Kidnapping ?numKidnapping .
    ?gardaStation foaf:Offenses-Against-Government ?numOffensesGov .
    ?gardaStation foaf:Public-Order ?numPublicOrder .
    ?gardaStation foaf:Robbery ?numRobbery .
    ?gardaStation foaf:Theft ?numTheft .
    ?gardaStation foaf:Weapons-Explosives ?numWeapons .
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
        ?gardaStation foaf:Year ?year .
        ?gardaStation rdf:type foaf:GardaStation .
        ?gardaStation foaf:hasDivision ?division .

        ?gardaStation foaf:Attempted-Murder-Assaults-Harrasments  ?numMurders .
        ?gardaStation foaf:Burglary ?numBurglary .
        ?gardaStation foaf:Controlled-Drug-Offences ?numDrugs .
        ?gardaStation foaf:Damage-Property ?numPropertyDamage .
        ?gardaStation foaf:Dangerous-Negligent-Acts ?numDangerousActs .
        ?gardaStation foaf:Fraud ?numFraud .
        ?gardaStation foaf:Kidnapping ?numKidnapping .
        ?gardaStation foaf:Offenses-Against-Government ?numOffensesGov .
        ?gardaStation foaf:Public-Order ?numPublicOrder .
        ?gardaStation foaf:Robbery ?numRobbery .
        ?gardaStation foaf:Theft ?numTheft .
        ?gardaStation foaf:Weapons-Explosives ?numWeapons .
        filter(?totalCrime = 0) .
        bind(?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons as ?totalCrime)
    } order by asc (?totalCrime)
    } OPTIONAL {
      	?newHousing rdf:type foaf:HousePrice .
        ?newHousing foaf:Year ?year .
        ?newHousing foaf:Area ?division .
        ?newHousing foaf:Statistic "New House Prices"
    } OPTIONAL {
      	?secondHousing rdf:type foaf:HousePrice .
        ?secondHousing foaf:Year ?year .
        ?secondHousing foaf:Area ?division .
        ?secondHousing foaf:Statistic "Second Hand House Prices"
    }
}

```

---

### Query 10 (to do) Do areas with a large amount of accomodation have a high house prices?

---

```

```
