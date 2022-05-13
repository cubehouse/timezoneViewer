import { useState, useEffect } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

export function SearchResults({ textSearch = '', onSelectedPosition = () => { } }) {
    const [searchResults, setSearchResults] = useState([]);

    const performSearch = () => {
        // request via "https://nominatim.openstreetmap.org/search/" + text + "?format=json"
        const url = `https://nominatim.openstreetmap.org/search/${textSearch}?format=json`;
        fetch(url)
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