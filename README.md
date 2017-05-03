[![Build Status](https://travis-ci.org/bsingr/fitness-tracker.svg?branch=master)](https://travis-ci.org/bsingr/fitness-tracker)

# What is This

This is a personal fun project. It consists of two parts:

1. An iOS app that tracks geolocations and pushes them into the cloud
2. The static site that provides an overview over runs

Looking deeper into technical stuff, this repository serves as

1. Data store: data is received via commits from the iOS app and processed using Travis CI
2. Static site: the React app is deployed in the /docs folder on every commit
