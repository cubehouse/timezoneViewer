import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';

export function SearchBox({ onSearch }) {
    const [textToSearch, setTextToSearch] = useState('');

    const onTextChanged = (ev) => {
        setTextToSearch(ev.target.value);
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            onSubmit={(e) => {
                e.preventDefault();
                onSearch(textToSearch);
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField label="Search" variant="standard" onChange={onTextChanged} fullWidth />
            </Box>
        </Paper>
    );
}