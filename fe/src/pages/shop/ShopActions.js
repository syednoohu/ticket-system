import { Box, IconButton, Tooltip } from '@mui/material';
import { Delete, Edit, Preview } from '@mui/icons-material';
// import { useValue } from '../../../context/ContextProvider';
// import { deleteRoom } from '../../../actions/room';

const ShopActions = ({ params }) => {
  // console.log(params)
  // const {
  //   dispatch,
  //   state: { currentUser },
  // } = useValue();
  return (
    <Box>
      <Tooltip title="View  details">
        <IconButton
          // onClick={() => dispatch({ type: 'UPDATE_ROOM', payload: params.row })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit">
        <IconButton onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          // onClick={() => deleteRoom(params.row, currentUser, dispatch)}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShopActions;