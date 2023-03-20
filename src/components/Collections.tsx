import { CircularProgress, Divider, List, ListItem, ListItemButton, ListItemText, Typography, } from '@mui/material'
import { createContext, useState } from 'react'
import { useDeleteCollectionMutation, useGetCollectionsByUserQuery } from '../store'
import useUserData from '../hooks/useUserData'
import Collection from './Collection';
import DeleteCollectionDialog from './DeleteCollectionDialog';
import Navbar from './Navbar';
import BoxComponent from './BoxComponent';
import AddCollection from './AddCollection';

export interface ICurrentBookmarkSetContext {
    currentCollectionId: number
    currentCollectionIdSet: React.Dispatch<React.SetStateAction<number>>
    displayAllBookmarks: boolean
    toggleDisplayAllBookmarks: React.Dispatch<React.SetStateAction<boolean>>
}

export const CurrentBookmarkSetContext = createContext<ICurrentBookmarkSetContext>({ currentCollectionId: -99, currentCollectionIdSet: () => { }, displayAllBookmarks: true, toggleDisplayAllBookmarks: () => { } })

export default function Collections() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""

    const { data: collections, isLoading } = useGetCollectionsByUserQuery(userId);
    const [deleteCollection, _] = useDeleteCollectionMutation()

    const [mobileOpen, mobileOpenSet] = useState(false);
    const [openDialog, openDialogSet] = useState(false);
    const [collectionToDelete, collectionToDeleteSet] = useState(-99)
    const [displayAllBookmarks, toggleDisplayAllBookmarks] = useState(true)

    const [currentCollectionId, currentCollectionIdSet] = useState<number>(-99)


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
                Your collections
            </Typography>
            <Divider />
            <AddCollection userId={userId} />

            <List sx={{ position: "relative", height: "90vh", overflowY: "scroll" }}>
                {isLoading && <CircularProgress />}

                {collections?.length === 0 && <div>No collections found! Click above to add new</div>}
                <ListItem divider sx={{ maxWidth: "20rem" }} onClick={() => {
                    toggleDisplayAllBookmarks(true)
                    currentCollectionIdSet(-99)
                }}>
                    {collections && collections?.length !== 0 && < ListItemButton sx={{ width: "10rem" }}>
                        <ListItemText primary="Show all bookmarks" />
                    </ListItemButton>}
                </ListItem>
                {collections && collections.map((collection) => (
                    <Collection collection={collection} collectionToDeleteSet={collectionToDeleteSet} handleDialogClickOpen={handleDialogClickOpen} key={collection.collectionId} />
                ))}
            </List>
        </div >
    );

    return (
        <CurrentBookmarkSetContext.Provider value={{ currentCollectionId, currentCollectionIdSet, displayAllBookmarks, toggleDisplayAllBookmarks }}>
            <div>
                <Navbar handleDrawerToggle={handleDrawerToggle} isFull={false} />
                <BoxComponent drawer={drawer} handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
            </div>
        </CurrentBookmarkSetContext.Provider >
    )
}
