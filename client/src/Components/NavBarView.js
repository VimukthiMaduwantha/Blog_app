import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

function NavBarView() {
    const navigate = useNavigate();

    function HandleOpenLoginDialog() {
        navigate('/login')
    }

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'white', }}>
                <Container maxWidth="100%" >
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { md: 'contents' },
                                    flexGrow: 1,
                                    fontFamily: "Anta, sans-serif",
                                    fontWeight: 'Bold',
                                    letterSpacing: '.1rem',
                                    color: 'black',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    marginLeft: '5px',

                                }}
                            >
                                Blog
                            </Typography>
                        </Box>

                        <Box sx={{ flexGrow: 0, }}>
                            <Tooltip title="Favourite">
                                <IconButton /* onClick={handleOpenUserMenu}  */ sx={{ p: 1 }}>
                                    <FavoriteBorderIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="SignIn">
                                <IconButton onClick={HandleOpenLoginDialog} sx={{ p: 1 }}>
                                    <LoginIcon sx={{ color: 'black' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </>
    )
}

export default NavBarView