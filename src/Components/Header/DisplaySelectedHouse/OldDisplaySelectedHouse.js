import './DisplaySelectedHouse.scss'
import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {setSelectedHouseRedux} from '../../../redux/reducers/houses'
import { Typography, InputLabel, Select, MenuItem, Menu, Button, List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = {

    labelRoot: {
    //   ...defaultFont,
    //   color: grayColor[3] + " !important",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "1.42857",
      letterSpacing: "unset",
      minWidth: '300px'
    },
    select: {
        maxWidth: 0
    }
}
const useStyles = makeStyles(styles);

function DisplaySelectedHouse(props){
    const [houseId, setHouseId] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

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
    
    
    const classes = useStyles();

    return (
        <div>
           <List component="nav" aria-label="Device settings">
               <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
                >
                    <ListItemText primary="When device is locked" secondary={props.houses.houses[0] && props.houses.houses[selectedIndex].address} />
                </ListItem>
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
                disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => {
                    handleMenuItemClick(event, index)
                    props.setSelectedHouseRedux(house)}}>{house.address}</MenuItem>))}
            </Menu>              
        </div>
    )
}

const mapDispatchToProps = {setSelectedHouseRedux}

const mapStateToProps = state => state

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySelectedHouse)
