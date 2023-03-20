import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

const LandingPage = () => {
    return (
        <div>
            <Navbar isFull={true} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: '#f7fafc',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '4rem',
                    }}
                >
                    <Typography
                        variant="h1"
                        style={{
                            fontSize: '5rem',
                            fontWeight: 'bold',
                            // marginBottom: '2rem',
                            color: '#2d3748',
                            textAlign: "center"
                        }}
                    >
                        Save This For Me
                    </Typography>
                    <Typography
                        variant="body1"
                        style={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            color: '#4a5568',
                            padding: "0.5rem",
                            marginBottom: "2rem"

                        }}
                    >
                        Never lose a website link again
                    </Typography>
                    <svg width="50" height="50" viewBox="0 0 24 24">
                        <path
                            fill="#2d3748"
                            d="M19,0H5C3.9,0,3,0.9,3,2v20c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5L19,0z M17,18.414l-3.707-3.707 C13.106,14.918,12.553,15,12,15s-1.106-0.082-1.293-0.293L7,18.414V4h10V18.414z"
                        />
                    </svg>

                </div>
                <Link to="/login">
                    <Button
                        variant="contained"
                        style={{
                            fontSize: '1.2rem',
                            padding: '1rem 2rem',
                            marginBottom: '2rem',
                            backgroundColor: '#2d3748',
                            color: '#fff',
                            borderRadius: '0',
                            boxShadow: 'none',
                            textTransform: 'none',
                        }}
                    >
                        Get started
                    </Button>
                </Link>

            </div>
            <Footer />
        </div>
    );
};

export default LandingPage;
