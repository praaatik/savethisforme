import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip, useMediaQuery, useTheme } from "@mui/material"
import { useCreateCollectionMutation } from '../store';

interface Props {
    userId: string
}

export default function AddCollection({ userId }: Props) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [createBookmark, _] = useCreateCollectionMutation()
    const [newCollectionName, newCollectionNameSet] = useState("")
    const [error, errorSet] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (addCollection?: boolean) => {
        if (addCollection && !error && newCollectionName !== "") {
            createBookmark({ collectionName: newCollectionName, userId })
        }

        setOpen(false);
        newCollectionNameSet("")
    };

    useEffect(() => {
        if (newCollectionName === "") {
            errorSet(true)
        } else {
            errorSet(false)
        }
    }, [newCollectionName])

    return (

        <div className="mt-5">
            <Tooltip title="Add new collection " placement='top'>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleClickOpen}
                    sx={[{ backgroundColor: "#2d3748" }, { '&:hover': { backgroundColor: "black" } }]}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Tooltip>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => { handleClose(false) }}
                aria-labelledby="create-new-collection-dialog"
            >
                <DialogTitle>Create New Collection</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="collection-name"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        required
                        value={newCollectionName}
                        onChange={(event) => newCollectionNameSet(event.target.value)}
                        error={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(true) }} variant="contained" disabled={newCollectionName === "" ? true : false}>Add</Button>
                    <Button onClick={() => { handleClose(false) }} variant="contained" color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
