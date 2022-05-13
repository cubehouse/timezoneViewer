import { Map } from './map';
import { SearchBox } from './search';
import { SearchResults } from './searchResults';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Badge } from './badge';
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';

import { useEffect, useState } from 'react';

import moment from 'moment-timezone';

import tzlookup from './tz.mjs';

export function App() {
    const [timezone, setTimezone] = useState('Europe/London');
    const [position, setPosition] = useState(null);
    const [localTime, setLocalTime] = useState('0000-00-00 00:00:00');
    const [searchText, setSearchText] = useState('');
    const [mapOrigin, setMapOrigin] = useState({
        lat: 51.477936,
        lng: -0.001471
    });

    // if origin changes, use this as our new position too
    useEffect(() => {
        setPosition(mapOrigin);
    }, [mapOrigin]);

    useEffect(() => {
        if (!position) {
            return;
        }

        const tz = tzlookup(position.lat, position.lng);
        setTimezone(tz);

        // calculate local time in this timezone
        setLocalTime(moment().tz(tz).format());
    }, [position]);

    // update time string every second
    useEffect(() => {
        const loopTimer = setInterval(() => {
            if (timezone) {
                setLocalTime(moment().tz(timezone).format());
            }
        }, 1000);

        return () => {
            clearInterval(loopTimer);
        };
    }, [timezone]);

    return (
        <Box style={{ height: '100%' }}>
            <Grid style={{ height: '100%' }} container spacing={2} columns={4}>
                <Grid item xs={1} style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <p>
                        Search or click a location to find it's timezone, local time, longitude and latitude.
                    </p>
                    <Stack direction="column" spacing={1}>
                        <Badge color="info" icon={<LanguageIcon />} label={timezone} />
                        <Badge color="success" icon={<LocationOnIcon />} label={`${position?.lat}, ${position?.lng}`} />
                        <Badge color="secondary" icon={<AccessTimeIcon />} label={localTime} />
                    </Stack>
                    <SearchBox onSearch={(txt) => setSearchText(txt)} />
                    <SearchResults textSearch={searchText} onSelectedPosition={(newMapPos => {
                        setMapOrigin(newMapPos);
                    })} />
                    <p>Made with love &amp; anger of timezones by <a href='https://github.com/cubehouse'>Jamie Holding</a></p>
                </Grid>
                <Grid item xs={3}>
                    <Map lat={mapOrigin.lat} lng={mapOrigin.lng} onPositionChange={setPosition} />
                </Grid>
            </Grid>
        </Box>
    )
}