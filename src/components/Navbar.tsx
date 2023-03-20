import { AppBar, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom'
import useUserData from "../hooks/useUserData";

interface Props {
    handleDrawerToggle?: () => void
    isFull?: boolean
}
export default function Navbar({ handleDrawerToggle, isFull }: Props) {
    const drawerWidth = 330;
    const navigate = useNavigate()
    const { user } = useUserData()

    const handleOnClick = () => {
        if (user === null) {
            navigate("/")
        }
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: isFull ? "100%" : `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: "white",
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "row",
            }}
            className="h-20 mb-20"
        >
            <div className="w-fit sm:hidden">
                <MenuIcon onClick={handleDrawerToggle} fontSize="large" />
            </div>
            <div className=" flex items-center justify-between w-full px-5">
                <div className="h-full text-xl flex items-center justify-center w-full sm:w-fit text-black cursor-pointer" onClick={handleOnClick}>Save this for me</div>
                {!isFull && <div className="flex items-center justify-center flex-col">
                    <Logout />
                </div>}
            </div>
        </AppBar>
    )
}
