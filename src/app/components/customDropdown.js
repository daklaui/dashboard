import { FormControl, InputLabel, ListSubheader, MenuItem, Select, TextField } from '@mui/material';
import { MenuProps } from 'app/fuse-configs/utils';
import React from 'react'

export default function CustomDropdown({ label, selectedItems, handleChange, arrayItems }) {
    return (
        <FormControl sx={{ mb: 3 }}>
            <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectedItems}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected?.map((value) => (
                            <Chip key={value} label={arrayItems.List.find(({ ID }) => ID === value)?.ArtistNameEN} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                <ListSubheader>
                    <TextField
                        size="small"
                        autoFocus
                        placeholder="Type to search..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon color="action">search</Icon>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== "Escape") {
                                e.stopPropagation();
                            }
                        }}
                    />
                </ListSubheader>
                <MenuItem disabled value="">
                    <em>{label}</em>
                </MenuItem>
                {arrayItems?.List.filter(({ ArtistNameEN }) => ArtistNameEN?.toLowerCase().includes(searchText.toLowerCase())).map(({ ID, ArtistNameEN }, index) => (
                    <MenuItem
                        key={index}
                        value={ID}
                    >
                        {ArtistNameEN}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
