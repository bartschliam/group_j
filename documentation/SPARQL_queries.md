- [Query 1](#query-1-number-of-hostels)
- [Query 2](#query-2-min-max-of-housing-prices)
- [Testing](#testing)

### Query 1. Number of Hostels
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

---
### testing
---
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

---
