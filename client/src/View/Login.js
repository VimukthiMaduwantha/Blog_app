import { Box, Button, Card, Divider, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function Login() {
    const [loginDetails, setLoginDetails] = useState({
        userName: '',
        pWord: ''
    })

    function handleChange(e) {
        const target = e.target;
        const value = target.value;
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: value
        })
    }

    function handleRegister() {
        console.log("hello")
    }

    return (
        <>
            <Box sx={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={{ minWidth: 500, padding: '20px' }}>
                    <center><h1>Login</h1></center>
                    <Divider />
                    <br />
                    <form>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    // label="User Name"
                                    placeholder='User Name'
                                    name='userName'
                                    value={loginDetails.userName}
                                    id='userName'
                                    onChange={(e) => handleChange(e)}
                                    variant="standard"
                                    size="small"

                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    placeholder='Password'
                                    name='pWord'
                                    value={loginDetails.pWord}
                                    id='pWord'
                                    onChange={(e) => handleChange(e)}
                                    variant="standard"
                                    size="small"

                                />
                            </Grid>
                        </Grid>
                        <br />
                        <Box display='flex' justifyContent='center' p={2}>
                            <Button
                                variant="contained"
                                size='small'
                                type='submit'
                                fullWidth
                            >
                                LogIn
                            </Button>
                        </Box>
                        <br />
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography>Do You already have an account? </Typography>&nbsp;
                            <div onClick={handleRegister} style={{ cursor: 'pointer' }}><Typography className='hoverback' sx={{ fontWeight: 'bold' }} >Click Here</Typography></div>
                        </Box>
                    </form>
                </Card>
            </Box>

        </>
    )
}

export default Login