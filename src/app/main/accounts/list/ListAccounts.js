import withReducer from 'app/store/withReducer';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import reducer from '../store';
import { AppBar, Button, Card, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Toolbar } from '@mui/material';
import Header from 'app/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount, getAccounts } from '../store/accountSlice';
import EnhancedTable from 'app/components/table';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';
import { showMessage } from 'app/store/fuse/messageSlice';


function ListAccounts(props) {
   const dispatch = useDispatch();
   const { accounts } = useSelector((state) => state.accounts);
   const [filteredData, setFilteredData] = useState(accounts.List);
   const [totalData, setTotalData] = useState(accounts.List.length);
   const [currentPageIndex, setCurrentPageIndex] = useState(0);
   const [currentPageLength, setCurrentPageLength] = useState(10);
   const ref = useRef(false)

   const columns = useMemo(
      () => [
         {
            Header: 'ID',
            accessor: 'id',
            className: 'font-medium',
            sortable: true,
         },
         {
            Header: 'Title',
            accessor: 'title',
            className: 'font-medium',
            sortable: true,
         },
         {
            Header: 'Type',
            accessor: 'type',
            className: 'font-medium',
            sortable: true,
         },
         {
            Header: 'Actions',
            Cell: ({ row }) => {
               return (
                  <div>
                     <span
                        className="onHoverIcon material-icons"
                        onClick={(e) => {
                           e.stopPropagation(); // stop event of onRowClick
                           dispatch(
                              openDialog({
                                 children: (
                                    <>
                                       <DialogTitle id="alert-dialog-title mb-2">Delete Account ?</DialogTitle>
                                       <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                             Are you sure you want to delete this account?
                                          </DialogContentText>
                                       </DialogContent>
                                       <DialogActions>
                                          <Button onClick={() => dispatch(closeDialog())} color="primary">
                                             Disagree
                                          </Button>
                                          <Button
                                             onClick={() => {
                                                dispatch(closeDialog());
                                                onDeleteRow(row.values.id).then((data) => {
                                                   dispatch(
                                                      showMessage({
                                                         message: 'Record has been successfully deleted', // text or html
                                                         autoHideDuration: 6000, // ms
                                                         anchorOrigin: {
                                                            vertical: 'top', // top bottom
                                                            horizontal: 'right', // left center right
                                                         },
                                                         variant: 'success', // success error info warning null
                                                      })
                                                   );
                                                });
                                             }}
                                             color="primary"
                                             autoFocus
                                          >
                                             Agree
                                          </Button>
                                       </DialogActions>
                                    </>
                                 ),
                              })
                           );
                        }}
                     >
                        delete
                     </span>

                  </div>
               );
            },
         },
      ],
      [dispatch, accounts]
   );

   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(getAccounts());
   }, []);

   useEffect(() => {
      setFilteredData(accounts.List);
      setTotalData(accounts.List.length);
      setLoading(accounts.loading)
   }, [dispatch, accounts]);



   const onDeleteRow = async (id) => {
      console.log(id)
      await dispatch(deleteAccount({ record_id: id }));
      await dispatch(getAccounts());
   };

   async function handleClick(item) {
      navigate(`/auth/accounts/${item.values.id}/`);
   }

   return (<>
      <Grid container className='mb-20'>
         <Grid item xs={12} >
            <AppBar position="static" color="primary" elevation={0}>
               <Toolbar className="flex flex-wrap sm:flex-nowrap items-center px-4 sm:px-24   h-96 sm:h-64 sm:h-96 container" >
                  <Header title="Accounts list" icon="people" />
               </Toolbar>
            </AppBar>
         </Grid>
      </Grid>
      {loading ? (
         <FuseLoading />
      ) : (
         <>
            <Grid container spacing={3} className={"px-10"}>
               <Grid item xs={12}>
                  <Card>
                     <EnhancedTable
                        onRowClick={(item) => handleClick(item)}
                        columns={columns}
                        data={filteredData}
                        totalDataCount={totalData}
                        onPageChanged={(page) => onPageChanged(page)}
                        onLengthPageChanged={(page) => onLengthPageChanged(page)}
                     />
                  </Card>
               </Grid>
            </Grid>

         </>
      )}
   </>)
}
export default withReducer('accounts', reducer)(ListAccounts);
