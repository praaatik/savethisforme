import { Autocomplete, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from 'react'
import { useCreateBookmarkMutation, useGetCollectionsByUserQuery } from '../store';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import IInsertBookmark from "../utils/interfaces/IInsertBookmark.interface"
import useUserData from '../hooks/useUserData';
import { CurrentBookmarkSetContext } from "./Collections";

interface Props {
    tags: Set<string>
    userId: string
}

export default function AddBookmark({ tags }: Props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: allMyCollections } = useGetCollectionsByUserQuery(userId)
    const [createBookmark, _] = useCreateBookmarkMutation()

    const { currentCollectionId, displayAllBookmarks } = useContext(CurrentBookmarkSetContext)

    const [open, openSet] = useState(false);

    const handleClickOpen = () => {
        openSet(true);
    };
    const initialNewBookmark: IInsertBookmark = { bookmarkURL: "", collectionId: -99, isFavorite: false, tags: [], userId: userId }
    const [newBookmark, newBookmarkSet] = useState<IInsertBookmark>(initialNewBookmark)

    const handleClose = (addBookmark?: boolean) => {
        if (addBookmark && userId !== "") {
            createBookmark(newBookmark)
            newBookmarkSet(initialNewBookmark)
        }
        openSet(false);
    };

    useEffect(() => {
        if (userId !== null || userId !== "") {
            newBookmarkSet((prev) => ({ ...prev, userId: userId }))
        }
    }, [userId])

    useEffect(() => {
        if (currentCollectionId !== -99) {
            newBookmarkSet((prev) => ({ ...prev, collectionId: currentCollectionId }))
        }
    }, [currentCollectionId])

    return (
        <div className="flex justify-center items-center py-4 -mt-10">
            <Tooltip title={(allMyCollections && allMyCollections.length === 0) ? "Please add at least one collection to start creating bookmarks" : "Click to add a new bookmark"} placement="top" >
                <span>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleClickOpen}
                        sx={[{ backgroundColor: "#2d3748" }, { '&:hover': { backgroundColor: "black" } }]}
                        disabled={allMyCollections && allMyCollections.length === 0}
                    >

                        <AddIcon fontSize="small" />
                    </Button>
                </span>
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
                        variant="outlined"
                        required
                        value={newBookmark.bookmarkURL}
                        onChange={(event) => newBookmarkSet(prev => ({ ...prev, bookmarkURL: event.target.value }))}
                        sx={{ marginBottom: "2rem" }}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={Array.from(tags).map(tag => tag)}
                        freeSolo
                        onChange={(_, value) => {
                            newBookmarkSet(prev => ({ ...prev, tags: [...value] }))
                        }}
                        renderTags={(value: readonly string[], getTagProps: any) =>
                            value.map((option: string, index: number) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Tags"
                                placeholder="Add tags"
                            />
                        )}
                        sx={{ marginBottom: "2rem" }}
                    />
                    {/* <div className="border-2 border-black"> */}
                    <InputLabel id="collection-select-label">Collection</InputLabel>
                    <Select
                        labelId="collection-select-label"
                        id="collection-select"
                        label="Collection"
                        defaultValue={currentCollectionId !== -99 ? currentCollectionId : 0}
                        onChange={(_, value: any) => {
                            newBookmarkSet(prev => ({ ...prev, collectionId: Number(value?.props.value) }))
                        }}
                        className=" w-full"
                    >
                        {allMyCollections !== undefined && allMyCollections !== null && allMyCollections.map(collection => {
                            return <MenuItem value={collection.collectionId} sx={{ width: "full" }} key={collection.collectionId}>{collection.collectionName}</MenuItem>
                        })}
                    </Select>
                    {/* </div> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(true) }} variant="contained" disabled={newBookmark.bookmarkURL === "" || (newBookmark.collectionId === -99 && currentCollectionId === -99)}>Add</Button>
                    <Button onClick={() => { handleClose(false) }} variant="contained" color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}


//url - Textfield, add check to ensure it is a valid link
//favorite? add a radio button
//tags, auto complete dropdown with suggested tags
