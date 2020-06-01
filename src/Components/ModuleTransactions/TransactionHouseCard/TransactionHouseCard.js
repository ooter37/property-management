import './TransactionHouseCard.scss'
import React from 'react'
import { Card, Avatar, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    avatar: {
      width: 100,
      height: 100,
      border: '2px solid #1b5e20'
    },
  }));

export default function TransactionHouseCard(props) {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <Typography variant='h6'>{props.address}</Typography>
                <Avatar alt="House Image" src={props.image} className={classes.avatar} />
            </Card>
        </div>
    )
}