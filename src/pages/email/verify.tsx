import ForbiddenIllustration from '@common/assets/svgs/ForbiddenIllustration';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import Routes from '@common/defs/routes';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';

const VerificationPage = () => {
    const router = useRouter();
    const { verify } = useAuth();
    useEffect(() => {
        const { id, hash, expires, signature } = router.query;
        const verifyFunction = async () => {
            let res;
            if (id && hash && expires && signature) {
                res = await verify({ id:Number(id), hash:String(hash), expires:String(expires), signature:String(signature) }); // Call the function to verify the email
            } else {
                router.push('/'); // Redirect to homepage if query parameters are missing
            }
            if (res?.success) {
                router.push(Routes.Auth.Login);
            }
        }
        verifyFunction();
    }, [router.query]);
    return (
        <Container sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}} maxWidth="xs">
            <Typography variant="h3" paragraph className="mb-6" textAlign="center">
                Email Verification
            </Typography>
            <Typography
                variant="body1"
                paragraph
                className="mb-6 text-center"
                textAlign="center"
                sx={{ color: 'text.secondary' }}
            >
                Thank you for signing up! We are verifying your email address as of now.
                <br />
                Please click on the link below if you didn't redirected automatically to loging page.
            </Typography>
            <CircularProgress color='primary'  />
            <ForbiddenIllustration
                sx={{
                    width: '100%',
                    marginTop: '2rem',
                    marginBottom: '4rem',
                }}
            />
            <Box sx={{ textAlign: 'center' }}>
                <Button component={NextLink} href={Routes.Auth.Login} size="large" variant="contained">
                    Return to Login
                </Button>
            </Box>
        </Container>
    );
};

export default VerificationPage