import { Button, MenuItem, Typography, Card, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DropDownMenue({ page, activeLnk, drpDwnStyle }: any) {
  // const { t } = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box>
      <div className="flex items-center">
        <div className="group relative cursor-pointer">
          <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            // onMouseOver={handleClick}
            sx={(theme) => ({
              color:
                activeLnk.split(page.href).length > 1
                  ? 'text.primary'
                  : 'text.secondary',
              cursor: 'pointer',
              fontSize: '10px',
              [theme.breakpoints.up('md')]: {
                fontSize: '12px',
              },
            })}
            className={
              activeLnk.split(page.href).length > 1
                ? 'active-link flex items-center justify-between space-x-5'
                : 'flex items-center justify-between space-x-5'
            }
          >
            {page.title}
          </Button>
          <Card
            className="invisible absolute my-dr z-50 flex w-full flex-col p-0
              group-hover:visible group-hover:scale-100 min-w-max transform scale-75 
              transition duration-900 ease-in origin-right drop-shadow-2xl rounded-t-none"
            sx={drpDwnStyle}
          >
            {page.links?.map((l: any) => (
              <MenuItem
                // disabled
                key={l.title}
                onClick={() => {
                  router.push(l.href);
                }}
                className="p-2 px-6"
              >
                <Typography
                  textAlign="left"
                  sx={(theme) => ({
                    fontSize: '10px',
                    [theme.breakpoints.up('md')]: {
                      fontSize: '12px',
                    },
                  })}
                >
                  {l.title}
                </Typography>
              </MenuItem>
            ))}
          </Card>
        </div>
      </div>
    </Box>
  );
}
