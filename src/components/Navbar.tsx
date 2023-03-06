import { AppBar, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Logout from "./Logout";

interface Props {
    handleDrawerToggle: () => void
}
export default function Navbar({ handleDrawerToggle }: Props) {
    const drawerWidth = 330;

    return (
        <AppBar

            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: "transparent",
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexDirection: "row"
            }}
            className="h-20 border-white border-2"
        >
            <div className="w-fit sm:hidden">
                <MenuIcon onClick={handleDrawerToggle} fontSize="large" />
            </div>
            <div className=" flex items-center justify-between w-full px-5">
                <div className=" flex items-center w-full">Save this for me</div>
                <div className="flex items-center justify-center flex-col">
                    <Logout />
                </div>
            </div>
        </AppBar>
    )
}
