import { Autocomplete, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from 'react'
import { useCreateBookmarkMutation, useGetCollectionsByUserQuery } from '../store';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IInsertBookmark from "../utils/interfaces/IInsertBookmark.interface"

interface Props {
    tags: Set<string>
    userId: string
}

export default function AddBookmark({ tags, userId }: Props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { data: allMyCollections } = useGetCollectionsByUserQuery(userId)
    const [createBookmark, _] = useCreateBookmarkMutation()

    const [open, openSet] = useState(false);

    const handleClickOpen = () => {
        openSet(true);
    };
    const initialNewBookmark: IInsertBookmark = { bookmarkURL: "", collectionId: -99, isFavorite: false, tags: [], userId }
    const [newBookmark, newBookmarkSet] = useState<IInsertBookmark>(initialNewBookmark)

    const handleClose = (addBookmark?: boolean) => {
        if (addBookmark) {
            createBookmark(newBookmark)
            newBookmarkSet(initialNewBookmark)
        }
        openSet(false);
    };

    return (
        <div className="flex justify-center items-center py-4 -mt-10">
            <Tooltip title="Add new bookmark" placement="top">
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickOpen}
                    color="primary"
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => { handleClose(false) }}
                aria-labelledby="create-new-bookmark-dialog"
                fullWidth
            >
                <div className="border-b-2 flex justify-between">
                    <DialogTitle>Add New Bookmark</DialogTitle>
                    <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ width: "fit", }} checked={newBookmark.isFavorite} onChange={() => {
                        if (newBookmark.isFavorite) {
                            newBookmarkSet(prev => ({ ...prev, isFavorite: false }))
                        } else {
                            newBookmarkSet(prev => ({ ...prev, isFavorite: true }))
                        }
                    }} />
                </div>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="bookmark-url"
                        label="URL"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        value={newBookmark.bookmarkURL}
                        onChange={(event) => newBookmarkSet(prev => ({ ...prev, bookmarkURL: event.target.value }))}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={Array.from(tags).map(tag => tag)}
                        freeSolo
                        onChange={(_, value) => {
                            newBookmarkSet(prev => ({ ...prev, tags: [...prev.tags, ...value] }))
                        }}
                        renderTags={(value: readonly string[], getTagProps: any) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Tags"
                                placeholder="Add tags"
                            />
                        )}
                    />
                    <InputLabel id="collection-select-label">Collection</InputLabel>
                    <Select
                        labelId="collection-select-label"
                        id="collection-select"
                        label="Collection"
                        onChange={(_, value: any) => {
                            newBookmarkSet(prev => ({ ...prev, collectionId: Number(value?.props.value) }))
                        }}
                    >
                        {allMyCollections !== undefined && allMyCollections !== null && allMyCollections.map(collection => {
                            return <MenuItem value={collection.collectionId} sx={{ width: "full" }}>{collection.collectionName}</MenuItem>
                        })}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(true) }} variant="contained" disabled={newBookmark.bookmarkURL === "" || newBookmark.collectionId === -99}>Add</Button>
                    <Button onClick={() => { handleClose(false) }} variant="contained" color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}


//url - Textfield, add check to ensure it is a valid link
//favorite? add a radio button
//tags, auto complete dropdown with suggested tags
