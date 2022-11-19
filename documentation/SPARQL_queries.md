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

---

## Query 1

### Where can I go camping where there is low theft and robbery rates?

---

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?name ?type ?lat ?long ?region ?locality
WHERE {
  ?camping foaf:hasType ?type .
  FILTER (CONTAINS(?type, "Camping"))
  ?camping foaf:hasAddressRegion ?region .
  ?camping foaf:hasAddressLocality ?locality .
  ?camping foaf:hasLatitude ?lat .
  ?camping foaf:hasLongitude ?long .
  ?camping foaf:hasName ?name .
  {
    SELECT ?locality ?region
    WHERE {
      ?gardaStation foaf:hasYear ?year .
      ?gardaStation rdf:type foaf:GardaStation .
      ?gardaStation foaf:hasDivision ?region .
      ?gardaStation foaf:hasStation ?locality .
      ?gardaStation foaf:hasRobberyOffences ?numRobbery .
      ?gardaStation foaf:hasTheftOffences ?numTheft .
      ?gardaStation foaf:hasYear ?year .
      BIND (?numRobbery + ?numTheft AS ?totalSteal)
      FILTER (?totalSteal < 5)
      FILTER (year(?year) = 2016)
    }
  }
}
```

[Index](#sparql-queries-index)

---

## Query 2

### What is the mimum and maximum of housing prices in Ireland?

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT *
WHERE {
  {
    SELECT ?house ?value ?area ?year
    WHERE {
      ?house foaf:hasValue ?value .
      ?house foaf:hasArea ?area .
      ?house foaf:hasYear ?year .
    }
    ORDER BY DESC(?value)
    LIMIT 1
  }
  UNION
  {
    SELECT ?house ?value ?area ?year
    WHERE {
      ?house foaf:hasValue ?value .
      FILTER (?value > 0)
      ?house foaf:hasArea ?area .
      ?house foaf:hasYear ?year .
    }
    ORDER BY ?value
    LIMIT 1
  }
}
```

[Index](#sparql-queries-index)

---

## Query 3

### What trends are there in housing value with relation to the amount of crime in Ireland

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?area ?year ?housingValue ?totalCrimes
WHERE {
  ?housing rdf:type foaf:House .
  ?housing foaf:hasYear ?year .
  ?housing foaf:hasArea ?area .
  ?housing foaf:hasStatistic "New House Prices" .
  ?housing foaf:hasValue ?housingValue .
  FILTER (?area != "National")
  FILTER (?area != "Other areas")
  {
    SELECT ?area (sum(?totalCrime) AS ?totalCrimes) ?year
    WHERE {
      ?gardaStation foaf:hasYear ?year .
      ?gardaStation rdf:type foaf:GardaStation .
      ?gardaStation foaf:hasDivision ?area .
      ?gardaStation foaf:hasStation ?station .
      ?gardaStation foaf:hasMurderOffences ?numMurders .
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
      BIND (?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons AS ?totalCrime)
    }
    GROUP BY ?area ?year
  }
}
ORDER BY ?year
```

[Index](#sparql-queries-index)

---

### Query 4: Does more attractions mean higher house prices? Here are the house prices and number of attractions

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT *
WHERE {
  {
    SELECT ?county ?TotalAttractions ?value
    WHERE {
      ?house rdf:type foaf:House .
      ?house foaf:hasArea ?county .
      ?house foaf:hasValue ?value .
      {
        SELECT ?county (COUNT(?Attractions) AS ?TotalAttractions)
        WHERE {
          ?Attractions rdf:type foaf:Attraction .
          ?Attractions foaf:hasAddressRegion ?county .
          FILTER (CONTAINS(?county, 'Dublin'))
        }
        GROUP BY ?county
      }
    }
    GROUP BY ?county ?TotalAttractions ?value
    ORDER BY DESC(?value)
    LIMIT 1
  }
  UNION
  {
    SELECT ?county ?TotalAttractions ?value
    WHERE {
      ?house rdf:type foaf:House .
      ?house foaf:hasArea ?county .
      ?house foaf:hasValue ?value .
      {
        SELECT ?county (COUNT(?Attractions) AS ?TotalAttractions)
        WHERE {
          ?Attractions rdf:type foaf:Attraction .
          ?Attractions foaf:hasAddressRegion ?county .
          FILTER (CONTAINS(?county, 'Galway'))
        }
        GROUP BY ?county
      }
    }
    GROUP BY ?county ?TotalAttractions ?value
    ORDER BY DESC(?value)
    LIMIT 1
  }
  UNION
  {
    SELECT ?county ?TotalAttractions ?value
    WHERE {
      ?house rdf:type foaf:House .
      ?house foaf:hasArea ?county .
      ?house foaf:hasValue ?value .
      {
        SELECT ?county (COUNT(?Attractions) AS ?TotalAttractions)
        WHERE {
          ?Attractions rdf:type foaf:Attraction .
          ?Attractions foaf:hasAddressRegion ?county .
          FILTER (CONTAINS(?county, 'Cork'))
        }
        GROUP BY ?county
      }
    }
    GROUP BY ?county ?TotalAttractions ?value
    ORDER BY DESC(?value)
    LIMIT 1
  }
  UNION
  {
    SELECT ?county ?TotalAttractions ?value
    WHERE {
      ?house rdf:type foaf:House .
      ?house foaf:hasArea ?county .
      ?house foaf:hasValue ?value .
      {
        SELECT ?county (COUNT(?Attractions) AS ?TotalAttractions)
        WHERE {
          ?Attractions rdf:type foaf:Attraction .
          ?Attractions foaf:hasAddressRegion ?county .
          FILTER (CONTAINS(?county, 'Limerick'))
        }
        GROUP BY ?county
      }
    }
    GROUP BY ?county ?TotalAttractions ?value
    ORDER BY DESC(?value)
    LIMIT 1
  }
  UNION
  {
    SELECT ?county ?TotalAttractions ?value
    WHERE {
      ?house rdf:type foaf:House .
      ?house foaf:hasArea ?county .
      ?house foaf:hasValue ?value .
      {
        SELECT ?county (COUNT(?Attractions) AS ?TotalAttractions)
        WHERE {
          ?Attractions rdf:type foaf:Attraction .
          ?Attractions foaf:hasAddressRegion ?county .
          FILTER (CONTAINS(?county, 'Waterford'))
        }
        GROUP BY ?county
      }
    }
    GROUP BY ?county ?TotalAttractions ?value
    ORDER BY DESC(?value)
    LIMIT 1
  }
}
ORDER BY DESC(?TotalAttractions)
```

[Index](#sparql-queries-index)

---

## Query 5

### How many X crimes reported per station (Sum of entire dataset)

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?station ?division (sum(?totalCrime) AS ?totalCrimes) ?lat ?long
WHERE {
  ?gardaStation rdf:type foaf:GardaStation .
  ?gardaStation foaf:hasKidnappingOffences ?kidnapping .
  ?gardaStation foaf:hasNeglectOffences ?neglect .
  ?gardaStation foaf:hasRobberyOffences ?robbery .
  ?gardaStation foaf:hasBurglaryOffences ?burglary .
  ?gardaStation foaf:hasTheftOffences ?theft .
  ?gardaStation foaf:hasFraudOffences ?fraud .
  ?gardaStation foaf:hasDrugOffences ?drugoffences .
  ?gardaStation foaf:hasWeaponsOffences ?weaponsexplosives .
  ?gardaStation foaf:hasDamagedPropertyOffences ?damageproperty .
  ?gardaStation foaf:hasOffencesAgainstGovernment ?offensesagainstgovernment .
  ?gardaStation foaf:hasPublicOrderOffences ?publicorder .
  ?gardaStation foaf:hasYear ?year .
  ?gardaStation foaf:hasDivision ?division .
  ?gardaStation foaf:hasStation ?station .
  ?gardaStation foaf:hasLatitude ?lat .
  ?gardaStation foaf:hasLongitude ?long .
  BIND (?kidnapping + ?neglect + ?robbery + ?burglary + ?theft + ?drugoffences + ?weaponsexplosives + ?damageproperty + ?offensesagainstgovernment + ?publicorder AS ?totalCrime)
}
GROUP BY ?division ?station ?lat ?long
```

[Index](#sparql-queries-index)

---

## TODO: Query 6

### gets amount of people and total number of people on welfare each year

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT *
WHERE {
  {
    SELECT ?year (sum(?people2008) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2008 ?people2008 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2008)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2009) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2009 ?people2009 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2009)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2010) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2010 ?people2010 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2010)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2011) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2011 ?people2011 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2011)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2012) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2012 ?people2012 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2012)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2013) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2013 ?people2013 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2013)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2014) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2014 ?people2014 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2014)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2015) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2015 ?people2015 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2015)
        }
      }
    }
    GROUP BY ?year ?amount
  }
  UNION
  {
    SELECT ?year (sum(?people2016) AS ?TotalPeopleonWelfare) (?amount AS ?TotalPeopleInEducation)
    WHERE {
      ?WelfareOffice foaf:hasPersons2016 ?people2016 .
      {
        SELECT *
        WHERE {
          ?StudentData foaf:hasLevelOfEducation ?level .
          ?StudentData foaf:hasYear ?year .
          ?StudentData foaf:hasValue ?amount .
          FILTER (?level = 'All levels of education')
          FILTER (?year = 2016)
        }
      }
    }
    GROUP BY ?year ?amount
  }
}
```

[Index](#sparql-queries-index)

---

## Query 7

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

## Query 8

### Do people go camping where there is high crime?

---

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?region (sum(?totalCrime) AS ?allCrime) (COUNT(?accom) AS ?numCamping)
WHERE {
  ?accom rdf:type foaf:Accommodation .
  ?accom foaf:hasType ?type .
  ?accom foaf:hasName ?name .
  ?accom foaf:hasAddressRegion ?region .
  FILTER (CONTAINS(?type, "Camping"))
  ?gardaStation foaf:hasYear ?year .
  FILTER (year(?year) = 2016)
  ?gardaStation rdf:type foaf:GardaStation .
  ?gardaStation foaf:hasDivision ?region .
  ?gardaStation foaf:hasMurderOffences ?numMurders .
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
  BIND (?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons AS ?totalCrime)
}
GROUP BY ?region
```

[Index](#sparql-queries-index)

---

## Query 9

### In low crime areas, are new houses sold for more than old houses?

```
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?division ?totalCrimes ?newHouseValue ?secondHouseValue ?year
WHERE {
  {
    SELECT ?division (sum(?totalCrime) AS ?totalCrimes) ?year
    WHERE {
      ?gardaStation foaf:hasYear ?year .
      ?gardaStation rdf:type foaf:GardaStation .
      ?gardaStation foaf:hasDivision ?division .
      ?gardaStation foaf:hasStation ?station .
      ?gardaStation foaf:hasMurderOffences ?numMurders .
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
      FILTER (?totalCrime = 0)
      BIND (?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons AS ?totalCrime)
    }
    GROUP BY ?division ?year
  }
  OPTIONAL {
    ?newHousing rdf:type foaf:House .
    ?newHousing foaf:hasYear ?year .
    ?newHousing foaf:hasArea ?division .
    ?newHousing foaf:hasStatistic "New House Prices" .
    ?newHousing foaf:hasValue ?newHouseValue .
  }
  OPTIONAL {
    ?newHousing rdf:type foaf:House .
    ?newHousing foaf:hasYear ?year .
    ?newHousing foaf:hasArea "National" .
    ?newHousing foaf:hasStatistic "New House Prices" .
    ?newHousing foaf:hasValue ?newHouseValue .
  }
  OPTIONAL {
    ?secondHousing rdf:type foaf:House .
    ?secondHousing foaf:hasYear ?year .
    ?secondHousing foaf:hasArea ?division .
    ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
    ?secondHousing foaf:hasValue ?secondHouseValue .
  }
  OPTIONAL {
    ?secondHousing rdf:type foaf:House .
    ?secondHousing foaf:hasYear ?year .
    ?secondHousing foaf:hasArea "National" .
    ?secondHousing foaf:hasStatistic "Second Hand House Prices" .
    ?secondHousing foaf:hasValue ?secondHouseValue .
  }
}
```

[Index](#sparql-queries-index)

---

## Query 10

### Look at trends in third level student enrolement, crime, and housing prices, how do they relate? Does a more educated population mean higher prices?

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?year ?numStudents (MAX(?value) AS ?highestHousePrice) (sum(?totalCrime) AS ?yearlyCrime)
WHERE {
  ?studentData rdf:type foaf:StudentData .
  ?studentData foaf:hasValue ?numStudents .
  ?studentData foaf:hasYear ?year .
  ?studentData foaf:hasLevelOfEducation "Third level" .
  ?housingData rdf:type foaf:House .
  ?housingData foaf:hasYear ?year .
  ?housingData foaf:hasValue ?value .
  ?gardaStation foaf:hasYear ?year .
  ?gardaStation rdf:type foaf:GardaStation .
  ?gardaStation foaf:hasMurderOffences ?numMurders .
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
  BIND (?numMurders + ?numBurglary + ?numDrugs + ?numPropertyDamage + ?numDangerousActs + ?numFraud + ?numKidnapping + ?numOffensesGov + ?numPublicOrder + ?numRobbery + ?numTheft + ?numWeapons AS ?totalCrime)
}
GROUP BY ?numStudents ?year
ORDER BY ?year
```

[Index](#sparql-queries-index)

---
