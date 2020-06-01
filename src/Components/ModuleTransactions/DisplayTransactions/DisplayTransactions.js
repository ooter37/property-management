import './DisplayTransactions.scss'
import React from 'react'
import {connect} from 'react-redux'
import { TableRow, TableCell, TableContainer, TableHead, TableBody, Paper, Table } from '@material-ui/core'
import moment from "moment"


import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


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
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  

function DisplayTransactions(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    const mappedHouses = (props.houses.houses.length && props.houses.transactions.length) ? props.houses.houses.map((house) => {
        // const mappedTabs = props.houses.transactions.map((trans) => {

        //     if (trans.house_id === house.house_id) 
        // })
        const mappedTransactions = props.houses.transactions.map((trans) => {
            if (trans.house_id === house.house_id && trans.date === '2020-06-01T20:08:15.064Z') {
                return (
                    <TableRow key={`mappedTransactions${trans.transaction_id}`}>
                        <TableCell>{trans.address}</TableCell>
                        <TableCell>{trans.amount}</TableCell>
                        <TableCell>{trans.date}</TableCell>
                    </TableRow>

                )
            }
        })
        return (
            mappedTransactions
        )
    }) : null

    const months = [...Array(5)].map((_, idx) => moment(moment().subtract(2, 'months')).add(idx, 'month').format('MMM'))

    const tabMaker = months.map((month,index) => {
        return (
            <Tab key={`tabMaker${month}`} label={month} {...a11yProps(index)} />
        )
    })
       
       return (
           <div>
           {console.log(months)}
            <TableContainer component={Paper}>
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

        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
              {tabMaker}
            {/* <Tab label="Apr" {...a11yProps(0)} />
            <Tab label="May" {...a11yProps(1)} />
            <Tab label="June" {...a11yProps(2)} />
            <Tab label="July" {...a11yProps(3)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
      </div>

            
            </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(DisplayTransactions)
