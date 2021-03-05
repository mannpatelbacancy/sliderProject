import React from 'react';


import './SideDrawer.css';


const sideDrawer = ( props ) => {
    let attachedClasses = ['SideDrawer','Close'];
    if (props.open) {
        
        attachedClasses = ['SideDrawer', 'Open'];
    }
    return (
        
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                
              {props.children}
            </div>
       
    );
};

export default sideDrawer;