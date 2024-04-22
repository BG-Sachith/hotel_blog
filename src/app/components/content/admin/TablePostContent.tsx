'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  AlertProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  Box,
  CardContent,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  GridRowModel,
  GridRowModesModel,
  GridRowParams,
  MuiEvent,
  GridEventListener,
  GridRowId,
  GridRowModes,
  GridColDef,
  GridActionsCellItem,
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import {
  deletePost,
  updatePostStatus,
  findAllPostPage,
} from '@/service/post/postService';
import { PostCategory } from '@/src/modules/postCategory';
import { Post, User } from '@prisma/client';
import { useRouter } from 'next/navigation';

let nextId = 0;
const useFakeMutation = () => {
  return React.useCallback(
    (c: Partial<PostCategory>) =>
      new Promise<Partial<PostCategory>>((resolve, reject) => {
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
  if (newRow.published !== oldRow.published) {
    return newRow.published ? 'Publish' : 'Unpublish';
  }
  return null;
}

export default function TablePostContent() {
  const { data: session } = useSession();
  const router = useRouter();

  const [rows, setRows] = React.useState<any>([]);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const [showDeleteDialog, setShowDeleteDialog] = React.useState<{
    show: boolean;
    id: any;
  }>({ show: false, id: null });
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef<HTMLButtonElement>(null);
  const [promiseArguments, setPromiseArguments] = React.useState<any>(null);

  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    'children' | 'severity'
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  nextId = rows.length + 1;

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
    // console.log(rows);
    const srow = rows.find((row: any) => row.index == id);
    // console.log(srow);
    setShowDeleteDialog({ show: true, id: srow.id });
  };

  const handleDelete = async () => {
    if (showDeleteDialog.id) {
      const res = await deletePost(showDeleteDialog.id);
      // console.log(res);
      if (res.data == 'Deleted') {
        setRows(rows.filter((row: any) => row.id !== showDeleteDialog.id));
        pageState.data = pageState.data.filter(
          (row: any) => row.id !== showDeleteDialog.id
        );
        setSnackbar({
          children: 'Post successfully deleted',
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
      if (!newRow.id) {
        throw Error('Invalid Id');
      }
      // Make the HTTP request to save in the backend
      const ress = await updatePostStatus(newRow.id, newRow.published);
      // console.log(ress);
      newRow = { ...newRow, isNew: false };
      // console.log(newRow);
      setRows((prv: any) =>
        rows.map((row: any) => (row.index === newRow.index ? newRow : row))
      );

      // console.log(ress);
      const response = await mutateRow(newRow);
      resolve(response);
      setPromiseArguments(null);
      setSnackbar({
        children: 'Post successfully saved',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({ children: "Id can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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

    // Otherwise filter will be applied on fields such as the hidden column id

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will ${newRow?.id ? '' : ''} ${mutation}.`}
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 100, editable: false },
    {
      field: 'title',
      headerName: 'Title',
      width: 180,
      editable: false,
      type: 'link',
      cellClassName: 'actions',
      renderCell: (params) => (
        <Link
          onClick={() =>
            router.push(`/posts/${params.row.id}`, { scroll: true })
          }
          className="cursor-pointer"
        >
          {params.row.title}
        </Link>
      ),
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 160,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      type: 'date',
      width: 160,
      editable: false,
    },
    {
      field: 'publishAt',
      headerName: 'publish Date',
      type: 'date',
      width: 160,
      editable: false,
      // renderCell: (params) => new Date(params.row.publishAt).toDateString(),
    },
    {
      field: 'published',
      headerName: 'Publish',
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
            key={'3'}
            icon={<EditIcon />}
            label="Edit"
            // className="textPrimary"
            onClick={handleEditClick(id)}
            color="success"
          />,
          <GridActionsCellItem
            key={'4'}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  const [pageState, setPageState] = React.useState({
    isLoading: true,
    data: [],
    total: 0,
    page: 0,
    pageSize: 10,
    field: 'id',
    sort: 'asc',
    quickFilterValues: null,
    run: false,
  });

  let [abortController, setAbortController] = React.useState(
    new AbortController()
  );
  React.useEffect(() => {
    // console.log('data');
    // console.log('data2');
    if (!pageState.run || pageState.isLoading) {
      setPageState((pr) => {
        return { ...pr, run: true };
      });
      const fld =
        pageState.field == 'createdBy' ? 'createdById' : pageState.field;
      // console.log(run);
      let t = setTimeout(
        () => {
          let cnt = new AbortController();
          setAbortController((pr) => {
            if (pr) pr.abort();
            return cnt;
          });
          findAllPostPage(
            pageState.page,
            pageState.pageSize,
            fld,
            pageState.sort,
            pageState.quickFilterValues,
            null,
            [],
            [],
            []
          )
            .then((p: any) => {
              if (p.data) {
                console.log(p);
                setRows(p.data.map((v: any, i: number) => new PostTabl(v, i)));
                setPageState((pr) => {
                  return {
                    ...pr,
                    data: p.data.map((v: any, i: number) => new PostTabl(v, i)),
                    total: p.count,
                    isLoading: false,
                  };
                });
              } else
                setPageState((pr) => {
                  return { ...pr, isLoading: false };
                });
              cnt.abort();
            })
            .catch((e) => {
              console.log(e);
              setPageState((pr) => {
                return { ...pr, isLoading: false };
              });
              cnt.abort();
            });

          clearTimeout(t);
        },
        pageState.run ? 1 : 900
      );
    }
  }, [
    pageState.page,
    pageState.pageSize,
    pageState.field,
    pageState.sort,
    pageState.quickFilterValues,
  ]);
  return (
    <Box sx={{ width: '100%', position: 'relative' }} className=" min-h-screen">
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
          <Box className="py-5 sm:py-10 w-full">
            <Box className="mx-auto max-w-7xl px-6 lg:px-8">
              <Box className="mx-auto max-w-2xl lg:text-center">
                <Typography className="mt-2 text-3xl font-bold tracking-tight  sm:text-3xl">
                  Post Manage
                </Typography>
              </Box>
            </Box>
          </Box>
          {renderConfirmDialog()}
          {renderDeleteConfirmDialog()}
          <Box sx={{ minHeight: 350, marginBottom: 5, maxWidth: 1200 }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ minHeight: 350, width: '100%', mb: 1 }}>
                <DataGrid
                  rows={pageState.data ? pageState.data : []}
                  columns={columns}
                  getRowId={(row) => row.index}
                  loading={pageState.isLoading}
                  rowCount={pageState.total}
                  autoHeight
                  pagination
                  disableColumnFilter
                  slots={{ toolbar: GridToolbar }}
                  rowModesModel={rowModesModel}
                  editMode="row"
                  paginationMode="server"
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  onSortModelChange={(res) => {
                    // console.log(res);
                    if (res[0]?.field)
                      setPageState((pr: any) => {
                        return { ...pr, ...res[0], isLoading: true };
                      });
                  }}
                  onFilterModelChange={(res: any) => {
                    // console.log(res.quickFilterValues[0]);
                    if (res?.quickFilterValues)
                      setPageState((pr: any) => {
                        return {
                          ...pr,
                          quickFilterValues: res.quickFilterValues[0],
                          isLoading: true,
                        };
                      });
                  }}
                  onPaginationModelChange={(res) => {
                    // console.log(res);
                    setPageState((pr) => {
                      return { ...pr, ...res, isLoading: true };
                    });
                  }}
                  slotProps={{
                    toolbar: {
                      // setRows,
                      // setRowModesModel,
                      // QuickSearchToolbar,
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                    filter: {
                      // ...pageState.data.initialState?.filter,
                      filterModel: {
                        items: [],
                        // quickFilterValues: ['ab'],
                      },
                    },
                  }}
                />
              </Box>
              {!!snackbar && (
                <Snackbar
                  open
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  onClose={handleCloseSnackbar}
                  autoHideDuration={6000}
                >
                  <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
              )}
            </Box>
          </Box>
        </Container>
      </CardContent>
    </Box>
  );
}

class PostTabl {
  index: number;
  id: Number;
  title: String;
  createdBy: User;
  createdAt: Date;
  published: boolean;
  publishAt: any;
  constructor(data: any, i: number) {
    this.index = i;
    this.id = data.id;
    let t = data?.title;
    this.title = t;
    this.createdBy = data.createdBy?.name;
    this.createdAt = new Date(data.createdAt);
    this.published = data.published;
    this.publishAt = data.publishAt ? new Date(data.publishAt) : null;
  }
}
