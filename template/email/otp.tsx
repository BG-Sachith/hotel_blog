import { Html } from '@react-email/html';
import { Text } from '@react-email/text';
import { Section } from '@react-email/section';
import { Container } from '@react-email/container';
import React from 'react';

export default function OTPTemplate(message: string) {
  return (
    <Html>
      <Section style={main}>
        <Container style={container}>
          <Text style={heading}>Hi there! 👋 </Text>
          {/* <Text style={paragraph}>Your Code ⏬ </Text> */}
          <Text style={paragraph}>Code : {message} </Text>
        </Container>
      </Section>
    </Html>
  );
}
// Styles for the email template
const main = {
  backgroundColor: '#ffffff',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
};

const heading = {
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  fontSize: '14px',
  lineHeight: '1.4',
  color: '#484848',
};
