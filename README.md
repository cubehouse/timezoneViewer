# Timezone Viewer

This is a very simple web interface I use to quickly get the timezone of a location on Earth.

It is available at https://tz.jamie.holdings.

## Features

* Search for location using search box
* Interactive OpenStreetMap map
* Click a location to get
  * Latitude
  * Longitude
  * Current time
  * Timezone (in iana tz tzdata zoneinfo format - eg. Europe/London)

## Usage

Run ```node index.js```, and it will start a web sever on port 3000 (override using environment variable PORT).

Or, use the included Dockerfile to build as a Docker container.