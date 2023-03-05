import { AppBar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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
                bgcolor: "transparent"
            }}
            className="h-20"
        >
            <div className="w-fit sm:hidden">
                <MenuIcon onClick={handleDrawerToggle} fontSize="large" />
            </div>
        </AppBar>
    )
}
