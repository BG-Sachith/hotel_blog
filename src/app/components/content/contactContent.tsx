import {
  Card,
  CardContent,
  Container,
  Box,
  Typography,
  FormControl,
  TextField,
  Alert,
} from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import { LoadingButton } from '@mui/lab';
import { sendClientMsg } from '@/service/contact/clientMsg';

export default function ContactContent() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [res, setRes] = React.useState('');

  const [loading, setLoading] = React.useState(false);
  return (
    <Card
      sx={{
        width: '100%',
        position: 'relative',
        backgroundColor: (theme) =>
          theme.palette.mode == 'light' ? '#f1f1f1' : 'rgb(16, 24, 48)',
        minHeight: '100vh',
        borderRadius: 0,
        boxShadow: 'none',
      }}
      className="custom-card h-full"
    >
      <CardContent className="custom-card ">
        <Container
          maxWidth="md"
          sx={{
            marginTop: 15,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          className={'main'}
        >
          <Box sx={{ marginBottom: 5 }} className="w-full flex justify-center">
            <Card
              className=" custom-card shadow-none rounded-none font-sans w-full text-center px-5 pt-5"
              sx={{ maxWidth: 600, borderRadius: 0, boxShadow: 'none' }}
            >
              <Typography
                sx={{ fontSize: { xs: '25px', sm: '35px', md: '40px' } }}
                gutterBottom
              >
                Contact us
              </Typography>
              <Typography
                sx={{ fontSize: { xs: '15px', sm: '18px', md: '22px' } }}
                gutterBottom
              >
                {/* The Front will make your product look modern and professional
                while saving you precious time. */}
              </Typography>
            </Card>
          </Box>

          {/* ---------------------------------------------------- */}
          <Card
            sx={{
              maxWidth: 600,
              minHeight: 300,
              borderRadius: 0,
              boxShadow: 'none',
            }}
            className="-mt-10 px-5 custom-card shadow-none rounded-none "
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyItems: 'center',
              }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  required
                  id="standard-required"
                  label="Name"
                  // defaultValue="Hello World"
                  variant="standard"
                  onChange={(e) => {
                    e.preventDefault();
                    setName((p) => e.target.value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField
                  required
                  type="email"
                  id="standard-required"
                  label="Email"
                  // defaultValue="Hello World"
                  variant="standard"
                  onChange={(e) => {
                    e.preventDefault();
                    setEmail((p) => e.target.value);
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                <TextField
                  id="standard-multiline-flexible"
                  label="Message"
                  required
                  multiline
                  maxRows={4}
                  variant="standard"
                  onChange={(e) => {
                    e.preventDefault();
                    setMessage((p) => e.target.value);
                  }}
                />
              </FormControl>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 5,
                }}
              >
                <LoadingButton
                  size="small"
                  onClick={() => {
                    setLoading(true);
                    if (!(email && name && message)) {
                      setRes((r) => 'Invalid Data');
                      setTimeout(() => {
                        setRes((r) => '');
                        setLoading(false);
                      }, 2000);
                    } else
                      sendClientMsg({
                        email: email,
                        name: name,
                        message: message,
                      }).then((d) => {
                        console.log(d.message);
                        setRes((r) => d.message);
                        setLoading(false);
                        setTimeout(() => {
                          setRes((r) => '');
                        }, 2000);
                      });
                  }}
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="outlined"
                >
                  <span>Send</span>
                </LoadingButton>
              </Box>
              {res && res != '' && res == 'Email sent successfully' && (
                <Alert severity="success">Success 👍 </Alert>
              )}
              {res && res != '' && res != 'Email sent successfully' && (
                <Alert severity="error">Sending fail, check data!</Alert>
              )}
            </Box>
          </Card>
        </Container>
      </CardContent>
    </Card>
  );
}
