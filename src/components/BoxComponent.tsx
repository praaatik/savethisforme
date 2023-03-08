import { Box, Drawer, Toolbar, Typography } from "@mui/material"
import Bookmarks from "./Bookmarks"

interface Props {
    mobileOpen: boolean
    handleDrawerToggle: () => void
    drawer: JSX.Element
}

export default function BoxComponent({ mobileOpen, handleDrawerToggle, drawer }: Props) {
    const drawerWidth = 330
    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
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
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)`, }, overflow: "scroll", height: "100vh", paddingTop: "10rem" }}
            >
                <Bookmarks />
            </Box>
        </Box>
    )
}
