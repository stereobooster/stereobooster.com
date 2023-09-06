---
title: "NLP: preparing data"
date: 2019-09-29T15:00:00+02:00
draft: true
tags: [python, machinelearning, datascience, beginners]
---

I'm not gonna write a full tutorial on the subject (there are a lot of good tutorials, for example, [this one](https://course.spacy.io/chapter4)). I will talk about the preparation of the project.



## Project structure

We can take inspiration from [Cookiecutter Data Science](https://drivendata.github.io/cookiecutter-data-science/):

```text
├── LICENSE
├── Makefile <- Makefile with commands like `make data` or `make train`
├── README.md <- The top-level README for developers using this project.
├── data
│ ├── external <- Data from third party sources.
│ ├── interim <- Intermediate data that has been transformed.
│ ├── processed <- The final, canonical data sets for modeling.
│ └── raw <- The original, immutable data dump.
│
├── docs <- A default Sphinx project; see sphinx-doc.org for details
│
├── models <- Trained and serialized models, model predictions, or model summaries
│
├── notebooks <- Jupyter notebooks. Naming convention is a number (for ordering),
│ the creator's initials, and a short `-` delimited description, e.g.
│ `1.0-jqp-initial-data-exploration`.
│
├── references <- Data dictionaries, manuals, and all other explanatory materials.
│
├── reports <- Generated analysis as HTML, PDF, LaTeX, etc.
│ └── figures <- Generated graphics and figures to be used in reporting
│
├── requirements.txt <- The requirements file for reproducing the analysis environment, e.g.
│ generated with `pip freeze > requirements.txt`
│
├── setup.py <- Make this project pip installable with `pip install -e`
├── src <- Source code for use in this project.
│ ├── __init__.py <- Makes src a Python module
│ │
│ ├── data <- Scripts to download or generate data
│ │ └── make_dataset.py
│ │
│ ├── features <- Scripts to turn raw data into features for modeling
│ │ └── build_features.py
│ │
│ ├── models <- Scripts to train models and then use trained models to make
│ │ │ predictions
│ │ ├── predict_model.py
│ │ └── train_model.py
│ │
│ └── visualization <- Scripts to create exploratory and results oriented visualizations
│ └── visualize.py
│
└── tox.ini <- tox file with settings for running tox; see tox.testrun.org
```

We can replace `pip` installation files with `Dockerfile` (does it work with GPU?).

## Storing data

> Don't ever edit your raw data, especially not manually, and especially not in Excel. Don't overwrite your raw data. Don't save multiple versions of the raw data. Treat the data (and its format) as immutable.

We can use s3, [dvc](https://dvc.org/), [git-lfs](https://git-lfs.github.com/), [git-annex](https://git-annex.branchable.com/) to store raw data or pretrained models.

## Preparing data

Data is very important for training, the bigger the set, the cleaner data, the more fair data the more accurate model you will get.

1. Gathering raw data. In the case of NLP, it can be web scrapping or OCR
2. Data wrangling
3. Data cleansing
4. Data preparation. For example, in the case of NER, it can be data tagging

- [automatic tagging using rule-based matching](https://course.spacy.io/chapter4)
- automatic tagging using markup, for example, if you scrapped data from HTML or markdown files
- manual tagging, for example, with [brat](http://brat.nlplab.org/)
