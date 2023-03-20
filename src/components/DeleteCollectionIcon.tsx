import { ListItemText, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    handleDialogClickOpen: () => void
}

export default function DeleteCollectionIcon({ handleDialogClickOpen }: Props) {
    return (
        <Tooltip title="Delete collection" placement="top">
            {/* <ListItemText className="opacity-60 hover:opacity-100 cursor-pointer flex justify-center" >
                <DeleteIcon onClick={() => {
                    collectionToDeleteSet(collection.collectionId)
                    handleDialogClickOpen()
                }}
                    className="cursor-pointer"
                />
            </ListItemText> */}
            <></>
        </Tooltip>
    )
}
