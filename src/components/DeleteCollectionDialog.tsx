import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@mui/material"

interface Props {
    openDialog: boolean,
    handleDialogClickClose(confirmDelete: boolean): void
}

export default function DeleteCollectionDialog({ openDialog, handleDialogClickClose, }: Props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return <>
        {
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
                    <Button onClick={() => { handleDialogClickClose(true) }} autoFocus variant='contained' color='error' >
                        Confirm
                    </Button>
                    <Button onClick={() => { handleDialogClickClose(false) }} autoFocus variant='contained'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        }

    </>
}