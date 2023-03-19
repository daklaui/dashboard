import withReducer from 'app/store/withReducer';
import React, { useEffect, useMemo, useState } from 'react';

import reducer from '../store';
import { AppBar, Grid, Toolbar } from '@mui/material';
import Header from 'app/components/header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAccounts } from '../store/accountSlice';

function ListAccounts(props) {
   const dispatch = useDispatch();
   const { accounts } = useSelector((state) => state.accounts);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(getAccounts());
    }, []);
   useEffect(() => {
    console.log(accounts)
    }, [accounts]);
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
   </>)
}
export default withReducer('accounts', reducer)(ListAccounts);
