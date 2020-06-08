import './DisplaySelectedHouse.scss'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {setSelectedHouseRedux} from '../../../redux/reducers/houses'
import {  MenuItem, Menu, Button, List, Typography } from "@material-ui/core";

function DisplaySelectedHouse(props){
  const {selectedHouse} = props.houses
  const {house_id} = props.houses.selectedHouse
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(115);
  
  useEffect(() => {
    setSelectedIndex(house_id)
  },[selectedHouse, house_id])

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (houseId) => {
    setSelectedIndex(houseId);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    return (

        (props.houses.houses.find(e => e.house_id === selectedIndex))
        ?
        <div className='header-house-selector-container'>
           <List className='header-list' component="nav" aria-label="Selected House">
               <Button
               className='header-select-button'
               variant='contained' color='primary'
                // button
                aria-haspopup="true"
                aria-controls="lock-menu"
                // aria-label={<Typography variant='h5'>Currently Viewing</Typography>}
                onClick={handleClickListItem}
                >
                  <Typography noWrap={true}>{selectedIndex && props.houses.houses.find(e => e.house_id === selectedIndex).address}</Typography>
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
                // selected={index === selectedIndex}
                onClick={(event) => {
                    handleMenuItemClick(house.house_id, index)
                    // console.log(house.house_id)
                    props.setSelectedHouseRedux(house)}}>
                      <Typography className='header-menu-item' noWrap={true}>{house.address}</Typography>
                      </MenuItem>))}
            </Menu>              
        </div>
        :
        null
    )
}

const mapDispatchToProps = {setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySelectedHouse)
