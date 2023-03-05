import { LogoutOutlined } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { supabase } from '../utils/supabaseClient'

export default function Logout() {
    const handleOnClick = async () => {
        await supabase.auth.signOut()
    }

    return (
        <Tooltip title="Logout" placement="top">
            <Button variant="contained" sx={{ bottom: 0, position: "sticky", margin: "auto", marginTop: "3%", }} onClick={handleOnClick} >
                <LogoutOutlined />
            </Button>
        </Tooltip>
    )
}
