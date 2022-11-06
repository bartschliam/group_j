# CS7IS1-202223 Group J Project 

# Description
To design and build an interactive ontology-driven application based on:
- at least TWO open data-sets
- domain (e.g. Crime, Planning, Health, Finance, etc...)

Any dataset chosen:
- **must not** already have an RDF version published
- Must be **open** public data

# Requirements
1. Define a set of 10 questions that users of the application will be able to answer from the combined data and which are not answerable alone by querying over a single dataset. (Note marks available for uniqueness/novelty of chosen domain)

2. Create an OWL ontology to represent the relevant human readable terms and concepts that span both data-sets.
    - Design classes that could be used to link your datasets (e.g. two datasets about two different car brands could be linked using the class "car")
    - Where possible reuse of existing vocabularies/ontologies that are standard for specific domain
    - Use a light-weight ontology to model extra features needed to answer their particular
    - Remember to validate your ontology questions.
3. Uplift the external data instances using R2RML mappings into your model using reused and your own vocabularies

4. Build a basic query interface to allow you at runtime execute a set of SPARQL queries based on your use case questions

Characteristics of the Ontology:
- Must have at least 10 classes
- Must have at least 10 properties
- Provide cardinalities for properties
- Include at least one example property of each of the following types: symmetric, inverse, transitive
- Reuse from other ontologies and vocabularies as
appropriate
    - Expand existing ontologies with your own classes and properties if necessary
    - Good place to search for ontologies and vocabularies: https://lov.linkeddata.es/dataset/lov/


# Installation

# Usage

# Authors and acknowledgment

- Finn
- Oisin 
- Sanil 
- Yannick 
- Liam
- Declan


# License

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Project status

1. ✅ Demo: [Group Interim Progress](https://docs.google.com/presentation/d/1KMor0qnAbQpiv_s-OxFozfPKAhSGCVuNHesDoBExSro/edit?usp=sharing)

2. ⏳Documentation
    - ⏳ [OWL ontology model](https://docs.google.com/document/d/1WwFKcXlZCi9_zi84WCxoezuKGI9CtVtNBcwN2UEEXIY/edit?usp=sharing) & `./documentation/owl_ontology.owl`
    - ⏳ Documented R2RML mappings 
    - ⏳ Documented SPARQL queries 
    - ⏳ Application code for Application Query Interface 
    - ⏳ Original and uplifted datasets 
    - ⏳ Electronic versions – for a,b,c use WIDOCO https://dgarijo.github.io/Widoco/
        - ⏳ understand examples from WIDOCO github before attempting to use in your own project 
        - ⏳ Note the html file generated with WIDOCO can be edited if needed with additional information (e.g. the SPARQL queries in a new section). 
3. ⏳ [Technical Report](https://www.overleaf.com/8328128127kjhgzxphsrrq)
    - ⏳ Approach to Ontology Modelling 
        - ⏳ Description of Competency Questions that ontology answers 
        - ⏳ Description of datasets selected for application 
        - ⏳ Assumptions made 
        - References to sources used/reused e.g. SIOC, FOAF for people 
        - ⏳ Discussion of your data mapping process 
        - ⏳ Explanation of use of inverse, symmetric and transitive properties 
    - ⏳ Overview of Design 
        - ⏳ Description of Application Query Interface 
        - ⏳ Description of Queries 
    - ⏳ Discussion of challenges faced while ontology modelling or creating queries and mappings 
        - ⏳ Report how you organised your project (e.g. meetings, common google doc ...). 
    - ⏳ Conclusions: Self reflection of group on Strengths/weakness of ontology model, queries & interface 
4. ⏳ Self Reflection Report (`./reports`)
    - ⏳ What you contributed 
    - ⏳ Reflection strengths and weaknesses of own contribution and of group work 