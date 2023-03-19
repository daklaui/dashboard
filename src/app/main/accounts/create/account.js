import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDeepCompareEffect } from '@fuse/hooks';
import { showMessage } from 'app/store/fuse/messageSlice';

import withReducer from 'app/store/withReducer';
import reducer from '../store';
import { AppBar, Autocomplete, Box, Button, Card, CardContent, Chip, FormControl, Grid, Icon, InputAdornment, InputLabel, ListSubheader, MenuItem, OutlinedInput, Select, TextField, Toolbar } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import Header from 'app/components/header';
function Account() {
  const dispatch = useDispatch();
  const { accounts } = useSelector((state) => state.accounts);
  const routeParams = useParams();
  const [loading, setLoading] = useState(true)
  const { accountId } = routeParams;

  const schema = yup.object().shape({
    title: yup.string().required('You must enter a title'),
    type: yup.string().required('You must enter a type')
  });
  const defaultValues = {
    title: '',
    type: ''
  }
  const { control, formState, handleSubmit, reset, getValues, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useDeepCompareEffect(() => {
    function updateProductState() {
      if (accountId !== 'new') {
        setLoading(false)
      }
      else {
        setLoading(false)
      }
    }
    updateProductState();
  }, [dispatch, routeParams]);


  useEffect(() => {
    if (accounts.message.length > 0) {
      dispatch(
        showMessage({
          message: accounts.message,//text or html
          autoHideDuration: 6000,//ms
          anchorOrigin: {
            vertical: 'top',//top bottom
            horizontal: 'right'//left center right
          },
          variant: !accounts.error && accounts.message.length > 0 ? 'success' : 'error'//success error info warning null
        })
      )
      dispatch(clearMessage())
      if (!accounts.error && accountId === 'new') {
        reset(defaultValues)
      }
      setLoading(false)
    }
  }, [accounts]);

  async function onSubmit(values) { }
  return (
    <div>
      <Grid container className='mb-20'>
        <Grid item xs={12} >
          <AppBar position="static" color="primary" elevation={0}>
            <Toolbar className="flex items-center justify-between px-4 sm:px-24 h-48 sm:h-64 sm:h-96 container">
              <Header title={accountId === 'new' ? "New Account" : "Update Account"}
                icon={accountId === 'new' ? "album" : "update"} />
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
        </Grid>
        <Grid item xs={10}>
          <Card>
            <CardContent>
              <div className='w-full pt-20'
              >
                <Grid container spacing={4}>
                  <Grid item xs={12} md={12}>
                    <form noValidate className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
                      <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Controller
                          name="title"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="mb-16 "
                              label="Title"
                              type="name"
                              error={!!errors.title}
                              helperText={errors?.title?.message}
                              variant="outlined"
                              required
                              fullWidth
                            />
                          )}
                        />
                        <FormControl sx={{ mb: 3 }}>
                          <InputLabel id="demo-multiple-name-label">Artist*</InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={[]}
                            onChange={() => { }}
                            input={<OutlinedInput label="Name" />}
                          >

                            <MenuItem disabled value="">
                              <em>Type</em>
                            </MenuItem>

                            <MenuItem
                              key={0}
                              value={"personal"}
                            >
                              Personal
                            </MenuItem>
                            <MenuItem
                              key={0}
                              value={"organization"}
                            >
                              Organization
                            </MenuItem>

                          </Select>
                        </FormControl>
                      </Box>

                      <div className="flex flex-1 items-end justify-end px-12 py-20">
                        <Button
                          variant="contained"
                          color="primary"
                          className=" mt-16"
                          style={{ width: "25rem" }}
                          aria-label="Register"
                          size="large"
                          type="submit"
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
    </div>
  )
}

export default withReducer('accounts', reducer)(Account);