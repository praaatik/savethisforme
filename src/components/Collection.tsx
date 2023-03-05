import { ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material'
import React from 'react'
import ICollection from '../utils/interfaces/ICollection.interface'
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    collectionToDeleteSet: (value: React.SetStateAction<number>) => void
    handleDialogClickOpen: () => void
    collection: ICollection
}

export default function Collection({ collectionToDeleteSet, handleDialogClickOpen, collection }: Props) {
    return (
        <ListItem key={collection.collectionId} divider sx={{ maxWidth: "20rem", }} >
            <ListItemButton sx={{ maxWidth: "10rem" }} >
                <ListItemText primary={collection.collectionName} />
            </ListItemButton>
            <Tooltip title="Delete collection" placement="top">
                <ListItemText className="opacity-60 hover:opacity-100 cursor-pointer flex justify-center" >
                    <DeleteIcon onClick={() => {
                        collectionToDeleteSet(collection.collectionId)
                        handleDialogClickOpen()
                    }}
                        className="cursor-pointer"
                    />
                </ListItemText>
            </Tooltip>
        </ListItem>
    )
}
