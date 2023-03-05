import { ListItemText, Tooltip } from '@mui/material'
import React from 'react'

interface Props {
    handleDialogClickOpen: () => void
}

export default function DeleteCollectionIcon() {
    return (
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
    )
}
