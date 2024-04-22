'use client';
import {
  Button,
  AlertProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  CardContent,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModel,
  GridRowModes,
  GridToolbarContainer,
  GridRowParams,
  MuiEvent,
  GridEventListener,
  GridRowId,
  GridColDef,
  GridActionsCellItem,
  DataGrid,
} from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  deleteTag,
  createTag,
  updateTag,
  findAllTags,
} from '@/service/tagService';
import { PostTag } from '@/src/modules/postTag';
import { User } from '@/src/modules/user';
import { useRouter } from 'next/navigation';
import { updateTags } from '@/src/provider/redux/features/NavData';
import { useDispatch } from 'react-redux';
interface EditToolbarProps {
  setRows: (newRows: (oldRows: any) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

let nextId = 0;
const useFakeMutation = () => {
  return React.useCallback(
    (c: Partial<PostTag>) =>
      new Promise<Partial<PostTag>>((resolve, reject) => {
        setTimeout(() => {
          if (c.name?.trim() === '') {
            reject();
          } else {
            resolve(c);
          }
        }, 200);
      }),
    []
  );
};

function computeMutation(newRow: GridRowModel, oldRow: GridRowModel) {
  if (newRow.name !== oldRow.name && newRow?.id) {
    return `Name from '${oldRow.name}' to '${newRow.name}'`;
  }
  if (newRow.active !== oldRow.active && newRow?.id) {
    return `Active status from '${oldRow.active + '' || ''}' to '${
      newRow.active + '' || ''
    }'`;
  }
  if (!newRow?.id) {
    return ` '${newRow.name}'`;
  }
  return null;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const index = nextId;
    setRows((oldRows) => [
      ...oldRows,
      { index, name: '', active: true, isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [index]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
export default function TableTag({ initialRows }: any) {
  const router = useRouter();

  const { data: session } = useSession();
  const [rows, setRows] = React.useState(initialRows ? initialRows : []);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState<{
    show: boolean;
    id: any;
  }>({ show: false, id: null });
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);
  const dispatch = useDispatch();

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);
  nextId = rows.length + 1;

  useEffect(() => {
    if (initialRows?.message == 'Signin required') {
      router.push('/');
    }
    findAllTags(null).then((c: { data: any[] }) => {
      // console.log(c);
      if (c.data)
        setRows((p: any) =>
          c.data.map((d: any, i: number) => {
            d.index = i;
            return d;
          })
        );
    });
  }, [initialRows?.message]);

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (index: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [index]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = (index: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [index]: { mode: GridRowModes.View },
    });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const srow = rows.find((row: any) => row.index == id);
    // console.log(srow);
    setShowDeleteDialog({ show: true, id: srow.id });
  };

  const handleDelete = async () => {
    if (showDeleteDialog.id) {
      const res = await deleteTag(showDeleteDialog.id);
      // console.log(res);
      if (res?.data == 'Deleted') {
        setRows(rows.filter((row: any) => row.id !== showDeleteDialog.id));
        setSnackbar({
          children: 'Tag successfully deleted',
          severity: 'success',
        });
      } else {
        setSnackbar({
          children: 'Fail',
          severity: 'warning',
        });
      }
    }
    setShowDeleteDialog({ show: false, id: null });
  };

  const handleCancelClick = (index: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [index]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.index === index);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.index !== index));
    }
  };

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve, reject) => {
        if (!newRow.isNew) newRow = { ...newRow, isNew: false };
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    let { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      // console.log(newRow);
      const ress = newRow.isNew
        ? await createTag({
            ...newRow,
            createdById: new User(session?.user).id,
            modifiedById: new User(session?.user).id,
          })
        : await updateTag({
            ...newRow,
            modifiedById: new User(session?.user).id,
          });
      newRow = { ...ress.data, isNew: false, index: newRow?.index };
      // console.log(ress);
      setRows((prv: any) =>
        rows.map((row: any) => (row.index === newRow.index ? newRow : row))
      );
      const response = await mutateRow(newRow);
      resolve(response);
      setPromiseArguments(null);
      setSnackbar({
        children: 'Tag successfully saved',
        severity: 'success',
      });
      findAllTags(true).then((r: any) => {
        if (r.data) dispatch(updateTags(r.data));
      });
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100, editable: false },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={'1'}
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="success"
            />,
            <GridActionsCellItem
              key={'2'}
              icon={<CancelIcon />}
              label="Cancel"
              // className="textPrimary"
              onClick={handleCancelClick(id)}
              color="info"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={'1'}
            icon={<EditIcon />}
            label="Edit"
            // className="textPrimary"
            onClick={handleEditClick(id)}
            color="success"
          />,
          <GridActionsCellItem
            key={'2'}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    const handleEntered = () => {
      // The `autoFocus` is not used because, if used, the same Enter that saves
      // the cell triggers "No". Instead, we manually focus the "No" button once
      // the dialog is fully open.
      // noButtonRef.current?.focus();
    };

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure? {newRow?.id}</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will ${newRow?.id ? 'change' : 'add'} ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderDeleteConfirmDialog = () => {
    // if (!promiseArguments) {
    //   return null;
    // }

    // const { newRow, oldRow } = promiseArguments;
    // const mutation = computeMutation(newRow, oldRow);

    const handleEntered = () => {
      // The `autoFocus` is not used because, if used, the same Enter that saves
      // the cell triggers "No". Instead, we manually focus the "No" button once
      // the dialog is fully open.
      // noButtonRef.current?.focus();
    };

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={showDeleteDialog.show}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will delete ${showDeleteDialog.id}.`}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteDialog({ show: false, id: null })}
          >
            No
          </Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Box
      sx={{ width: '100%', position: 'relative' }}
      className="custom-card min-h-screen"
    >
      <CardContent className="custom-card">
        <Container
          sx={{
            marginTop: 5,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
          className={'main'}
        >
          <Box className=" py-5 sm:py-10 w-full">
            <Box className="mx-auto max-w-7xl px-6 lg:px-8">
              <Box className="mx-auto max-w-2xl lg:text-center">
                <Typography className="mt-2 text-3xl font-bold tracking-tight  sm:text-3xl">
                  Tag Manage
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ minHeight: 350, marginBottom: 5, maxWidth: 800 }}>
            <Box
              sx={{
                width: '100%',
                '& .actions': {
                  color: 'text.secondary',
                },
                '& .textPrimary': {
                  color: 'text.primary',
                },
              }}
            >
              {renderConfirmDialog()}
              {renderDeleteConfirmDialog()}
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.index}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                autoHeight
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                // onProcessRowUpdateError={handleProcessRowUpdateError}
              />
            </Box>
            {!!snackbar && (
              <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
              >
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
          </Box>
        </Container>
      </CardContent>
    </Box>
  );
}
