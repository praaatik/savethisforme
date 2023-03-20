import { LogoutOutlined } from '@mui/icons-material'
import { Button, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'

export default function Logout() {
    const navigate = useNavigate()

    const handleOnClick = async () => {
        await supabase.auth.signOut()
        navigate("/")
    }

    return (
        <Tooltip title="Logout" placement="top">
            <Button variant="contained" sx={[{ bottom: 0, position: "sticky", margin: "auto", marginTop: "3%", backgroundColor: "#2d3748" }, { '&:hover': { backgroundColor: "black" } }]} onClick={handleOnClick} >
                <LogoutOutlined />
            </Button>
        </Tooltip>
    )
}
