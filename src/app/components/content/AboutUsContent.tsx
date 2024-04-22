import { Container, Box, Card, Typography } from '@mui/material';
import React from 'react';

export default function AboutUsContent() {
  return (
    <Container
      sx={{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minHeight: '98vh',
      }}
      className={'main'}
    >
      <Box
        sx={{
          minHeight: 350,
          marginBottom: 5,
          maxWidth: 800,
        }}
      >
        <Card
          className="p-5 m-1 shadow-none animated animatedFadeInUp fadeInUp "
          sx={{
            textAlign: 'justify',
            textJustify: 'inter-word',
            // fontFamily: 'font-sans',
          }}
        >
          <Typography
            className="flex items-center justify-center"
            sx={{
              fontSize: { xs: '25px', sm: '35px', md: '40px' },
              mb: 3,
            }}
            gutterBottom
          >
            Vajrapani Life
          </Typography>
          <Typography
            className=" font-medium"
            sx={{
              fontSize: {
                xs: '12px',
                sm: '16px',
                md: '18px',
                // fontFamily: 'font-sans',
              },
              mb: 2,
            }}
            gutterBottom
          >
            Welcome to our Vajrapani Life blog, a gateway to unlocking the
            ultimate happiness in life. We believe that true joy lies in the
            harmonious integration of various aspects that enrich our existence.
            With a scientific approach and an unwavering dedication to your
            well-being, we invite you to embark on a transformative journey
            through our carefully curated categories.
          </Typography>
          <Typography
            className=" font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Delve into the realm of Health and Wellness, where we explore the
            profound connection between physical and mental well-being. From
            fitness tips and healthy habits to self-care practices and
            mindfulness techniques, we empower you to nurture your body, mind,
            and soul, paving the way for a fulfilling and balanced life.
          </Typography>
          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Escape into the world of Travel and Exploration, where adventure
            meets inner transformation. Through captivating travel stories,
            destination guides, and nature-inspired itineraries, we encourage
            you to immerse yourself in awe-inspiring landscapes and forge
            unforgettable connections with different cultures. These experiences
            become the tapestry of a life lived to the fullest.
          </Typography>

          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Discover the transformative power of Home and Interior, where your
            living space becomes a reflection of your inner peace and
            tranquility. Our inspirations for home decor, organization tips, DIY
            projects, and sustainable living ideas will guide you towards
            creating a sanctuary that nurtures and rejuvenates your spirit.
          </Typography>

          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Nature and Outdoors beckon, inviting you to explore the breathtaking
            beauty that surrounds us. With guides to hiking trails, camping
            under starlit skies, encounters with majestic wildlife, and
            captivating nature photography, we seek to ignite your sense of
            wonder and reconnect you with the natural world.
          </Typography>

          <Typography
            className=" font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Step into the realm of Fashion and Style, where self-expression
            merges with conscious choices. From the latest fashion trends and
            style tips to outfit ideas and beauty routines, we celebrate
            sustainable fashion choices that not only make you look good but
            also contribute to a better world.
          </Typography>

          <Typography
            className=" font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Personal Development takes center stage as we provide insights on
            growth, motivation, goal-setting, productivity, and self-improvement
            strategies. Unleash your true potential, overcome obstacles, and
            design a life aligned with your passions and dreams.
          </Typography>

          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Immerse yourself in the rich tapestry of Arts and Culture, where
            creativity thrives and inspiration abounds. Our coverage of art
            exhibitions, music recommendations, book reviews, movie suggestions,
            and cultural events invites you to explore diverse expressions of
            human creativity and broaden your horizons.
          </Typography>

          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Through Sustainability and Eco-Friendly Living, we strive to make a
            positive impact on our planet. Discover eco-friendly practices, tips
            for reducing waste, sustainable product reviews, and embrace
            environmental awareness. By adopting conscious choices, we become
            custodians of a healthier, more sustainable world.
          </Typography>

          <Typography
            className="font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Find Inspiration and Motivation in the stories of ordinary
            individuals who have accomplished extraordinary feats. Delve into
            thought-provoking quotes, success stories, and interviews with
            inspiring personalities who have transformed their lives and left an
            indelible mark on the world.
          </Typography>

          <Typography
            className=" font-medium"
            sx={{
              fontSize: { xs: '12px', sm: '16px', md: '18px' },
              mb: 2,
            }}
            gutterBottom
          >
            Together, let us embark on this journey to unlock the ultimate
            happiness in life. Through these diverse categories, we provide the
            roadmap for a purpose-driven existence, where every facet of your
            being is nurtured and celebrated. Get ready to embrace a life that
            is not just extraordinary but truly extraordinary. Welcome to the
            gateway of boundless joy and fulfillment.
          </Typography>
        </Card>
        <hr className="MuiDivider-root MuiDivider-fullWidth css-1ayphmt" />
      </Box>
    </Container>
  );
}
