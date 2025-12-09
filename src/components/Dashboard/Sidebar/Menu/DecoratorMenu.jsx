import React from 'react';
import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
import MenuItem from './MenuItem';
// import MenuItem from './MenuItem';

const DecoratorMenu = () => {
    return (
        <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add Decoration'
        address='add-decoration'
      />
      <MenuItem icon={MdHomeWork} label='My Inventory' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Orders'
        address='manage-orders'
      />
    </>
    );
};

export default DecoratorMenu;