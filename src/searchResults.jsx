import { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// tz.jamie.holdings
let lastSearchRequest = 0;
let currentSearchTimeout = null;

export function SearchResults({ textSearch = '', onSelectedPosition = () => { } }) {
    const [searchResults, setSearchResults] = useState([]);

    const performSearch = () => {
        // cancel existing timeout if it exists
        if (currentSearchTimeout) {
            clearTimeout(currentSearchTimeout);
            currentSearchTimeout = null;
        }

        // check how long it has been since the last search request
        const now = new Date().getTime();
        // if it's been less than 1100ms, then delay the request
        if (now - lastSearchRequest < 1100) {
            currentSearchTimeout = setTimeout(performSearch, 1100);
            return;
        }
        lastSearchRequest = now;

        // request via "https://nominatim.openstreetmap.org/search/" + text + "?format=json"
        //const url = `https://geocode.maps.co/search?q=${textSearch}&api_key=${apiKey}`;
        const url = `/search?textSearch=${textSearch}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                setSearchResults(data.map((x) => {
                    return {
                        id: x.place_id,
                        name: x.display_name,
                        lat: x.lat,
                        lng: x.lon
                    }
                }));
            })
    };

    useEffect(() => {
        if (textSearch == '') {
            return;
        }
        performSearch();
    }, [textSearch]);

    return (
        <List style={{ height: '100%', overflowY: 'scroll' }}>
            {searchResults.map((result) => {
                return (
                    <ListItem disablePadding key={result.id}>
                        <ListItemButton onClick={() => {
                            onSelectedPosition(result);
                        }}>
                            <ListItemText primary={result.name} secondary={`${result.lat}, ${result.lng}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    )
}
