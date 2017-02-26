# Timezone Viewer (cube/tz)

This is a very simple web interface I use to quickly get the timezone of a location on Earth.

It is available at https://tz.jamie.holdings, or as a Docker image cube/tz.

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

## Docker

Run ```docker run --rm -p 3000 cube/tz``` to start on port 3000.

To change port (for example, to port 8080), run ```docker run --rm -p 8080:3000 cube/tz```
