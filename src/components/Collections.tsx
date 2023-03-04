import { AppBar, Box, CircularProgress, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Toolbar, Typography, useTheme, Button, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import { useState } from 'react'
import useUserData from '../hooks/get-user'
import { useDeleteCollectionMutation, useGetCollectionsByUserQuery } from '../store'
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Collections() {
    const { user } = useUserData()
    const userId = user ? user?.id : ""
    const drawerWidth = 330;

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

    const handleDialogClickClose = (confirmDelete: boolean) => {
        if (confirmDelete) {
            handleDeleteCollection()
        }
        openDialogSet(false);
    };

    const handleDeleteCollection = () => {
        deleteCollection(collectionToDelete)
        collectionToDeleteSet(-99)
    }

    const container = window !== undefined ? () => window.document.body : undefined;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const drawer = (
        <div className="text-center">
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={() => { handleDialogClickClose(false) }}
                aria-labelledby="delete-collection-confirmation-dialog"
            >
                <DialogTitle id="delete-collection-confirmation-dialog">
                    {"Delete this collection?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will delete the collection and all the bookmarks associated with it. This action is irreversible. Click Confirm to proceed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleDialogClickClose(true) }} autoFocus variant='contained' color='error'>
                        Confirm
                    </Button>
                    <Button onClick={() => { handleDialogClickClose(false) }} autoFocus variant='contained'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Typography variant="h6" sx={{ height: "10vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                Your Collections
            </Typography>
            <Divider />
            <List sx={{ position: "relative", height: "90vh", overflowY: "scroll" }}>
                {isLoading && <CircularProgress />}
                {collections && collections.map((collection) => (
                    <ListItem key={collection.collectionId} divider>
                        <ListItemButton>
                            <ListItemText primary={collection.collectionName} />
                        </ListItemButton>
                        <ListItemIcon>
                            <DeleteIcon onClick={() => {
                                collectionToDeleteSet(collection.collectionId)
                                handleDialogClickOpen()
                            }}
                            />
                        </ListItemIcon>
                    </ListItem>
                ))}
                <ListItemButton sx={{ bottom: 0, width: "100%", position: "sticky", backgroundColor: "gray" }}>
                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                            textAlign: "center"
                        }}
                    />
                </ListItemButton>
            </List>
        </div>
    );

    return (
        <div>

            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    bgcolor: "transparent"
                }}
                className="h-20"
            >
                <div className="w-fit sm:hidden">
                    <MenuIcon onClick={handleDrawerToggle} fontSize="large" />
                </div>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </div>
    )
}
