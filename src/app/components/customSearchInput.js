import React from 'react'
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { Icon, Input, Paper } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

export default function customSearchInput({callbackFunction}) {
    const [searchText, setSearchText] = useState('');
    const theme = useTheme();

    function handleSearch(event) {
        setSearchText(event.target.value);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log(`I can see you're not typing. I can use "${searchText}" now!`)
            callbackFunction && callbackFunction(searchText)
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchText]);


    return (

        <ThemeProvider theme={theme}>
            <Paper className="flex items-center min-w-full sm:min-w-0 w-full px-12 py-4 rounded-16 shdaow">
                <Icon color="action">search</Icon>
                <Input
                    placeholder="Search..."
                    disableUnderline
                    fullWidth
                    value={searchText}
                    onChange={handleSearch}
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                />
            </Paper>
        </ThemeProvider>
    )
}
