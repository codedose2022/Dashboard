import React from 'react';
import TabsComponent from './TabsComponent'
import useStyles from './CommonStyles';




export default function Dashboard() {
    const classes = useStyles();
    return (
        <div>
       
        <div className={classes.topPadding}/>
        <TabsComponent/>
     

        </div>
    )
}
