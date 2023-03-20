import { Autocomplete, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField, Tooltip, useMediaQuery, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { useGetCollectionsByUserQuery, useUpdateBookmarkMutation } from '../store';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import useUserData from '../hooks/useUserData';
import { CurrentBookmarkSetContext } from "./Collections";
import IBookmark from '../utils/interfaces/IBookmark.interface';
import EditIcon from '@mui/icons-material/Edit';
import IUpdateBookmark from '../utils/interfaces/IUpdateBookmark.interface';

export default function UpdateBookmark({ bookmarkURL, bookmarkId, collectionId, isFavorite, tags }: IBookmark) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { user } = useUserData()
    const userId = user ? user?.id : ""
    const { data: allMyCollections } = useGetCollectionsByUserQuery(userId)
    const { currentCollectionId, displayAllBookmarks } = useContext(CurrentBookmarkSetContext)
    const [open, openSet] = useState(false);
    const [] = useState()
    const [updateBookmark, _] = useUpdateBookmarkMutation()
    const [updatedBookmarkValues, updatedBookmarkValuesSet] = useState<IUpdateBookmark>({ bookmarkId, collectionId, isFavorite, tags, bookmarkURL })

    const handleClickOpen = () => {
        openSet(true);
    };
    const handleClose = (update?: boolean) => {
        if (update) {
            updateBookmark(updatedBookmarkValues)
        }
        openSet(false);
    };

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon className="cursor-pointer" />
            </IconButton>
            <div className="flex justify-center items-center py-4 -mt-10">
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={() => { handleClose(false) }}
                    aria-labelledby="create-new-bookmark-dialog"
                    fullWidth
                >
                    <div className="border-b-2 flex justify-between">
                        <DialogTitle>Update bookmark</DialogTitle>
                        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ width: "fit", }} checked={updatedBookmarkValues.isFavorite} onClick={() => {
                            if (updatedBookmarkValues.isFavorite) {
                                updatedBookmarkValuesSet(prev => ({ ...prev, isFavorite: false }))
                            } else {
                                updatedBookmarkValuesSet(prev => ({ ...prev, isFavorite: true }))
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
                            value={updatedBookmarkValues.bookmarkURL}
                            onChange={(event) => updatedBookmarkValuesSet(prev => ({ ...prev, bookmarkURL: event.target.value }))}
                            sx={{ marginBottom: "2rem" }}
                        />
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={Array.from(tags).map(tag => tag)}
                            defaultValue={Array.from(tags).map(tag => tag)}
                            freeSolo
                            onChange={(_, value) => {
                                updatedBookmarkValuesSet(prev => ({ ...prev, tags: [...value] }))
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
                            sx={{ marginBottom: "2rem" }}
                        />
                        <InputLabel id="collection-select-label">Collection</InputLabel>
                        <Select
                            labelId="collection-select-label"
                            id="collection-select"
                            label="Collection"
                            defaultValue={collectionId}
                            onChange={(_, value: any) => {
                                updatedBookmarkValuesSet(prev => ({ ...prev, collectionId: Number(value?.props.value) }))
                            }}
                            className=" w-full"
                        >
                            {allMyCollections !== undefined && allMyCollections !== null && allMyCollections.map(collection => {
                                return <MenuItem value={collection.collectionId} sx={{ width: "full" }} key={collection.collectionId}>{collection.collectionName}</MenuItem>
                            })}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { handleClose(true) }} variant="contained" disabled={bookmarkURL === "" || (collectionId === -99 && currentCollectionId === -99)}>Update</Button>
                        <Button onClick={() => { handleClose(false) }} variant="contained" color="error">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div >
        </div>
    )
}

