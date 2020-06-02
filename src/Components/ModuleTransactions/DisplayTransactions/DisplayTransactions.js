import './DisplayTransactions.scss'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import { TableRow, TableCell, TableContainer, TableHead, TableBody, Table, makeStyles, AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import moment from "moment"
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh',
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
  }));
  

function DisplayTransactions(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    // const mappedHouses = (props.houses.houses.length && props.houses.transactions.length) ? props.houses.houses.map((house) => {
    //     // const mappedTabs = props.houses.transactions.map((trans) => {

    //     //     if (trans.house_id === house.house_id) 
    //     // })
    //     const mappedTransactions = props.houses.transactions.map((trans) => {
    //         if (trans.house_id === house.house_id && trans.date === '2020-06-01T20:08:15.064Z') {
    //             return (
    //                 <TableRow key={`mappedTransactions${trans.transaction_id}`}>
    //                     <TableCell>{trans.address}</TableCell>
    //                     <TableCell>{trans.amount}</TableCell>
    //                     <TableCell>{trans.date}</TableCell>
    //                 </TableRow>

    //             )
    //         } else {
    //             return null
    //         }
    //     })
    //     return (
    //         mappedTransactions
    //     )
    // }) : null

    const months = [...Array(5)].map((_, idx) => moment(moment().add(1,'months')).subtract(idx, 'month').format('MM'));
    // const months = [...Array(5)].map((_, idx) => moment(moment().subtract(4, 'months')).add(idx, 'month').format('MM'))
    const tabMaker = months.reverse().map((month, index) => {
        // console.log(moment(month).format('MM'))
        // console.log(moment().month(month).format('MMM'))
        return (
            <Tab key={`tabMaker${month}`} label={moment(month).format('MMM')} {...a11yProps(index)} />
        )
    })

    const panelMaker = months.map((month, index) => {
        const mappedHouses = (props.houses.houses.length && props.houses.transactions.length) ? props.houses.houses.map((house) => {
            const mappedTransactions = props.houses.transactions.map((trans) => {
                if (trans.house_id === house.house_id && month === moment(trans.date).format('MM')) {
                    return (
                        <TableRow key={`mappedTransactions${trans.transaction_id}`}>
                            <TableCell>{trans.address}</TableCell>
                            <TableCell>{trans.amount}</TableCell>
                            <TableCell>{moment(trans.date).format('MM/DD/YYYY')}</TableCell>
                        </TableRow>
                    )
                } else {
                    return null
                }
            })
            return (
                mappedTransactions
            )
        }) : null

        return (
            <TabPanel key={`panelMaker${month}`} value={value} index={index}>
                <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>House</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Date</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>{mappedHouses}</TableBody>
                </Table>
            </TableContainer>
            </TabPanel>
        )
    })
       
       return (
        <div className={classes.root}>
          {/* {console.log(years.reverse())} */}
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="rent payment history"
          >
              {tabMaker}
          </Tabs>
        </AppBar>
        {panelMaker}
      </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayTransactions)
