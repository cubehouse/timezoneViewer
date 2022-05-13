# What Timezone / Time is it at a given location?

This is a very simple web interface I use to quickly get the timezone of a location on Earth.

It is available at https://tz.jamie.holdings.

![tz.jamie.holdings](/screenshot.png?raw=true)

## Features

* Search for location using search box
* Interactive OpenStreetMap map
* Click a location to get
  * Latitude
  * Longitude
  * Current time
  * Timezone (in iana tz tzdata zoneinfo format - eg. Europe/London)

## Usage

Application is designed for Cloudflare Pages.

Run ```npm run dev```, and Cloudflare Wrangler should startup the service.

