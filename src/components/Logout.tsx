import { LogoutOutlined } from '@mui/icons-material'
import { ListItemButton, ListItemText, Tooltip } from '@mui/material'
import React from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Logout() {
    const handleOnClick = async () => {
        await supabase.auth.signOut()
    }

    return (
        <Tooltip title="Logout" placement="top">
            <ListItemButton divider sx={{ borderRadius: "10%", bottom: 0, width: "25%", position: "sticky", display: "flex", justifyContent: "center", margin: "auto", marginTop: "20%", backgroundColor: "skyblue", }} onClick={handleOnClick} >
                <LogoutOutlined />
            </ListItemButton>
        </Tooltip>
    )
}
