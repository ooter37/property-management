import './DisplaySelectedHouse.scss'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {setSelectedHouseRedux} from '../../../redux/reducers/houses'
import { Typography, MenuItem, Menu, Button, List } from "@material-ui/core";

function DisplaySelectedHouse(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    // useEffect(() => {

    // },[])

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
    
    
    // const classes = useStyles();

    return (

        (props.houses.houses[0])
        ?
        <div className='header-house-selector-container'>
           <List className='header-list' component="nav" aria-label="Selected House">
               <Button
               className='header-select-button'
               variant='contained' color='primary'
                // button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label={<Typography variant='h5'>Currently Viewing</Typography>}
                onClick={handleClickListItem}
                >{props.houses.houses[0] && props.houses.houses[selectedIndex].address}
                    {/* <ListItemText primary={<Typography variant='h5'>Currently Viewing</Typography>} 
                    secondary={<Typography variant='h5'>{props.houses.houses[0] && props.houses.houses[selectedIndex].address}</Typography>}/> */}
                </Button>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                {props.houses.houses && props.houses.houses.map((house, index) => (
                <MenuItem
                key={house.house_id}
                // disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => {
                    handleMenuItemClick(event, index)
                    props.setSelectedHouseRedux(house)}}>{house.address}</MenuItem>))}
            </Menu>              
        </div>
        :
        null
    )
}

const mapDispatchToProps = {setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySelectedHouse)
