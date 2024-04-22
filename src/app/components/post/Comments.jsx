import React, { useEffect } from 'react';
import moment from 'moment';
// import parse from 'html-react-parser';

// import { getComments } from '../services';
import { Box, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSession } from 'next-auth/react';

const Comments = ({ cmns, deleteComt }) => {
  // const [comments, setComments] = useState(cmns);
  const { data: session, status } = useSession();
  useEffect(() => {
    // console.log(comments);
    // console.log(cmns);
    // getComments(slug).then((result) => {
    //   setComments(result);
    // });
  }, []);

  return (
    <>
      {cmns?.length > 0 && (
        <Box className="shadow-lg rounded-lg p-8 pb-12 mb-8 border-t  w-full">
          <Typography
            component="h3"
            className="text-xl mb-8 font-semibold border-b pb-4"
          >
            {cmns.length} Comments
          </Typography>
          {cmns.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <Typography className="mb-4">
                <span className="font-semibold">
                  {comment?.createdBy?.name}
                </span>{' '}
                on {moment(comment.createdAt).format('MMM DD, YYYY')}
              </Typography>
              <Box sx={{ display: 'flex' }} className="w-full">
                <Typography className="whitespace-pre-line text-lime-600">
                  {comment.message}{' '}
                </Typography>
                <HighlightOffIcon
                  sx={{
                    display:
                      session?.user?.email == comment?.createdBy?.email ||
                      session?.user?.role == 'ADMIN'
                        ? 'inherit'
                        : 'none',
                  }}
                  className="cursor-pointer ml-3"
                  fontSize="small"
                  color="disabled"
                  onClick={(e) => {
                    deleteComt(e, comment.id);
                  }}
                />
              </Box>
              {/* {JSON.stringify(comment?.createdBy)}
              {JSON.stringify(session?.user)}
              {(session?.user?.email == comment?.createdBy ||
                session?.user?.role == 'ADMIN') + ''} */}
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default Comments;
