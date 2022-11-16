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

### Query 1. Number of Hostels
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
SELECT * WHERE
{
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
### Query 3 (in progress)
---
```
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
### Query 4 (in progress)
---
```
PREFIX accom:<http://foo.example.org/Accommodation/>
PREFIX foaf:<http://xmlns.com/foaf/0.1/>
PREFIX crime:<http://foo.example.org/Station/20646/>

select *
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

select ?station SUM(?kidnapping)
where { 
	?station foaf:Kidnapping ?kidnapping.
}
```
---
### Query 6 (in progress) 
#### testing ranked list for house prices, amount of accomm and crime
---
```
https://stackoverflow.com/questions/17313730/how-to-rank-values-in-sparql
this might be handy but website currently down
```
---
### Query 7 (to do)
---
```

```
---
### Query 8 (to do)
---
```

```
---
### Query 9 (to do)
---
```

```
---
### Query 10 (to do)
---
```

```