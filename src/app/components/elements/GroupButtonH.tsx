import { Box, ButtonGroup } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import ConfirmDialog from './ConfirmDialog';
import FullScreenPostDialog from './FullScreenPostDialog';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/provider/redux/store';

export default function GroupButtonH({
  deleteMe,
  updateMe,
  loadingD,
  loadingU,
  setOpen,
  open,
  handleClickOpen,
  updateStatus,
}: any) {
  const { selectedPost }: any = useSelector(
    (state: RootState) => state.selectedItem
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="small" aria-label="small button group ">
        {deleteMe && (
          <LoadingButton
            loading={loadingD}
            key="one"
            //   onClick={() => deleteMe(id)}
            variant="outlined"
            //   endIcon={<DeleteSweepOutlinedIcon />}
            //   disabled={loadingD}
            className="bg-slate-300 text-red-500 p-0"
          >
            <ConfirmDialog handleAgree={deleteMe} id={selectedPost?.id} />
            {/* <DeleteSweepOutlinedIcon /> */}
          </LoadingButton>
        )}
        <LoadingButton
          //   endIcon={<UpgradeOutlinedIcon />}
          loading={loadingU}
          variant="outlined"
          //   disabled={loadingU}
          key="two"
          //   onClick={() => updateMe(data)}
          className="bg-slate-300 text-emerald-500"
        >
          <Box onClick={handleClickOpen} className="text-emerald-500 m-0 p-0">
            <BorderColorIcon />
          </Box>
          {open && (
            <FullScreenPostDialog
              open={open}
              setOpen={setOpen}
              updateMe={updateMe}
              updateStatus={updateStatus}
            />
          )}
        </LoadingButton>
      </ButtonGroup>
    </Box>
  );
}
