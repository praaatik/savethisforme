import { Button, ListItem, ListItemButton, ListItemText, TextField, Tooltip } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ICollection from '../utils/interfaces/ICollection.interface'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useGetBookmarksByCollectionQuery, useUpdateCollectionNameMutation } from '../store';
import { CurrentBookmarkSetContext } from './Collections';

interface Props {
    collectionToDeleteSet: (value: React.SetStateAction<number>) => void
    handleDialogClickOpen: () => void
    collection: ICollection
}

export default function Collection({ collectionToDeleteSet, handleDialogClickOpen, collection }: Props) {
    const [isCollectionEdit, isCollectionEditSet] = useState(false);
    const [collectionName, collectionNameSet] = useState(collection.collectionName)
    const [skip, skipSet] = useState(true)

    const [updateCollectionName, _] = useUpdateCollectionNameMutation()
    const { data } = useGetBookmarksByCollectionQuery(collection.collectionId, { skip })

    const { currentCollectionId, currentCollectionIdSet } = useContext(CurrentBookmarkSetContext)

    const handleOnUpdate = () => {
        if (collectionName !== "") {
            updateCollectionName({ collectionId: collection?.collectionId, updatedCollectionName: collectionName })
            isCollectionEditSet(false)
        }
    }

    const handleOnCollectionClick = () => {
        console.log(`clicked! ${collection.collectionId}`)
        currentCollectionIdSet(collection.collectionId)
    }

    return !isCollectionEdit ? <ListItem key={collection.collectionId} divider sx={{ maxWidth: "20rem" }} onClick={handleOnCollectionClick}>
        <ListItemButton sx={{ width: "10rem" }}>
            <ListItemText primary={collectionName} />
        </ListItemButton>
        <Tooltip title="Edit collection name" placement="top">
            <ListItemText className="opacity-60 hover:opacity-100 cursor-pointer flex justify-center">
                <EditIcon className="cursor-pointer" onClick={() => isCollectionEditSet(true)} />
            </ListItemText>
        </Tooltip>
    </ListItem > : <ListItem key={collection.collectionId} divider sx={{ maxWidth: "20rem", display: "flex", justifyContent: "space-evenly" }} >
        <TextField value={collectionName} onChange={(event) => collectionNameSet(event.target.value)} />
        <ListItemButton sx={{ display: "flex", justifyContent: "center", }} onClick={handleOnUpdate}>
            <CheckIcon className="cursor-pointer" color='success' />
        </ListItemButton>
        <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <ClearIcon className="cursor-pointer" color="error" onClick={() => {
                isCollectionEditSet(false)
            }} />
        </ListItemButton>
        <ListItemButton sx={{ display: "flex", justifyContent: "center" }}>
            <DeleteIcon onClick={() => {
                collectionToDeleteSet(collection.collectionId)
                handleDialogClickOpen()
            }}
                className="cursor-pointer"
            />
        </ListItemButton>
    </ListItem >
}

