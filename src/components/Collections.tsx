import { CircularProgress, Divider, List, Typography, } from '@mui/material'
import { useState } from 'react'
import { useDeleteCollectionMutation, useGetCollectionsByUserQuery } from '../store'
import useUserData from '../hooks/get-user'
import Logout from './Logout';
import Collection from './Collection';
import DeleteCollectionDialog from './DeleteCollectionDialog';
import Navbar from './Navbar';
import BoxComponent from './BoxComponent';

export default function Collections() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: collections, isLoading } = useGetCollectionsByUserQuery(userId);
    const [deleteCollection, _] = useDeleteCollectionMutation()

    const [mobileOpen, mobileOpenSet] = useState(false);
    const [openDialog, openDialogSet] = useState(false);
    const [collectionToDelete, collectionToDeleteSet] = useState(-99)

    const handleDrawerToggle = () => {
        mobileOpenSet(!mobileOpen);
    };

    const handleDialogClickOpen = () => {
        openDialogSet(true);
    };

    function handleDialogClickClose(confirmDelete: boolean) {
        if (confirmDelete) {
            handleDeleteCollection()
        }
        openDialogSet(false);
    };

    const handleDeleteCollection = () => {
        deleteCollection(collectionToDelete)
        collectionToDeleteSet(-99)
    }

    const drawer = (
        <div className="text-center">
            <DeleteCollectionDialog handleDialogClickClose={handleDialogClickClose} openDialog={openDialog} />
            <Typography variant="h6" sx={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Your Collections
            </Typography>
            <Divider />
            <List sx={{ position: "relative", height: "90vh", overflowY: "scroll" }}>
                {isLoading && <CircularProgress />}
                {collections && collections.map((collection) => (
                    <Collection collection={collection} collectionToDeleteSet={collectionToDeleteSet} handleDialogClickOpen={handleDialogClickOpen} key={collection.collectionId} />

                ))}
                <Logout />
            </List>
        </div>
    );

    return (
        <div>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <BoxComponent drawer={drawer} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
        </div>
    )
}
