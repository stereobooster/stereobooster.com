---
title: "Classification"
date: 2019-09-28T13:20:10+02:00
draft: false
description: "A systematic arrangement in groups or categories according to established criteria"
---

## Definition

> [Definition of classification](https://www.merriam-webster.com/dictionary/classification)
>
> 1: the act or process of classifying
>
> 2a: systematic arrangement in groups or categories according to established criteria
> specifically : TAXONOMY
>
> 2b: CLASS, CATEGORY



_Synonyms_: bracket, category, class, division, family, genus, grade, group, kind, league, order, rank(s), rubric, set, species, tier, type

> [Definition of taxonomy](https://www.merriam-webster.com/dictionary/taxonomy)
>
> 1: the study of the general principles of scientific classification : SYSTEMATICS

## Why?

After reading the definition I thought: so what? Here is a bit different point of view:

> A classification or arrangement of any sort cannot be handled without reference to the purpose or purposes for which it is being made.
>
> -- [britannica](https://www.britannica.com/science/taxonomy)

Why do we need classification?

1. To quickly find things. For example, when we know the word we can use book index to quickly find the page. Classification can be used to quickly find the thing when we don't know "the word", but know something else about the subject.
2. To predict things. If the classification is systematic, it would be possible to predict if something missing. For example, Mendeleev noticed that there is a box in the periodic table in position 43 and predicted there suppose to be missing element (Technetium).
3. To name things. Classification can be used as nomenclature e.g. rules how to name things. For example, biological taxonomy.
4. To discover patterns. If we use non-hierarchical classification, for example, tagging, we can treat this classification as a graph and discover clusters and some patterns.

## Methodology

There are different approaches to building classifications.

### Prescriptive, descriptive, predictive

This terminology is used in [business analytics](https://www.ibm.com/downloads/cas/3V9AA9Y5):

 - Descriptive, which uses business intelligence and data mining to ask: “What has happened?”
 - Predictive, which uses statistical models and forecasts to ask: “What could happen?”
 - Prescriptive, which uses optimization and simulation to ask: “What should we do?”

We can observe something similar about classifications. Some classifications "weaker" and can only describe what is given, and soon as we find new facts we may need to change classification. I call those a fair attempt to add a systematic approach to unorganized data. Sometimes they called "zoo", for example [Complexity Zoo](https://complexityzoo.uwaterloo.ca/Complexity_Zoo), [The Programming Languages Zoo](https://plzoo.andrej.com/), [Data structure zoo](https://github.com/sellout/data-structure-zoo/wiki).

Other classifications are baked by some mathematical model and they are not likely to change in the future, rather they are capable of predicting future themselves. For example periodic table (read the example in the previous section).

We can think about it as "strength" of the classification system from weak to strong.

See [Descriptive and prescriptive taxonomies](https://www.researchgate.net/publication/329623712_Descriptive_and_prescriptive_taxonomies) by Jim Endersby.

### Hiearacrchical vs non-hierarchical

Classical classifications are hierarchical e.g. represented by a tree (undirected, connected and acyclic graph). For example, biological taxonomy.

Another way would be to use tags (or labels). This classification is represented by a graph. For example, tags for blog posts.

### From catalog to classification

> [Definition of catalog](https://www.merriam-webster.com/dictionary/catalog)
> 1: LIST, REGISTER
>
> a catalog of the band's songs
>
> 2a: a complete enumeration of items arranged systematically with descriptive details

_Synonyms_: canon, checklist, list, listing, menu, register, registry, roll, roll call, roster, schedule, table

I think of a catalog as an attempt to collect as much as possible things (of some kind) and record them, not necessarily in a systematic approach (maybe alphabetically ordered).

On the other hand, classification is an attempt to find some similarities inside the collection. I imagine it as people start from a catalog, to move to some semi-structured classification (zoo) and then to full classification. In practice, people would use this terminology sparsely.

## More defintions

### Systemic approach

> [Definition of systemic approach](https://www.afscet.asso.fr/Archives/Systemic-Approach-eng.pdf):
>
> New discipline which brings together theoretical, practical, and methodological approaches, relating to the study of what is recognized as too complex to be approached in a reductionist way, and which poses the problems of borders, internal and external relationships, structures, laws or emerging properties characterizing the system as such, or the problems of: mode of observation, representation, modelling or simulation of a complex totality.

### Cluster

> [Definition of cluster](https://www.merriam-webster.com/dictionary/cluster)
> : a number of similar things that occur together: such as ...

> Cluster analysis, in statistics, set of tools and algorithms that is used to classify different objects into groups in such a way that the similarity between two objects is maximal if they belong to the same group and minimal otherwise.

### Taxonomy

> [Definition of taxonomy](https://www.merriam-webster.com/dictionary/taxonomy)
>
> 1: the study of the general principles of scientific classification : SYSTEMATICS
>
> 2: CLASSIFICATION
> especially : orderly classification of plants and animals according to their presumed natural relationships

> Taxonomy, in a broad sense the science of classification, but more strictly the classification of living and extinct organisms—i.e., biological classification. The term is derived from the Greek taxis (“arrangement”) and nomos (“law”). Taxonomy is, therefore, the methodology and principles of systematic botany and zoology and sets up arrangements of the kinds of plants and animals in hierarchies of superior and subordinate groups.
>
> -- [britannica](https://www.britannica.com/science/taxonomy)

## Zoos

It is a bit strange (from the first glance), but even highly systematic knowledge is hard to classify, for example, see:

- [Logic System Interrelationships](https://web.archive.org/web/20190111041713if_/http://home.utah.edu/~nahaj/logic/structures/index.html)
- [Model Zoo](https://modelzoo.co/)
- [ONNX Model Zoo](https://github.com/onnx/models)
- [Intuitive Machine Learning for Engineers](https://modeldepot.io/)
