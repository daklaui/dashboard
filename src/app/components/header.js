import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';


function Header({ title, icon }) {
 

    return (

        <div className="flex   w-full items-center justify-between ">
            <div className="flex items-center">
                <Icon
                    component={motion.span}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.2 } }}
                    className="text-24 md:text-32"
                >
                    {icon}
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className=" sm:flex text-16 md:text-24 mx-12 font-semibold"
                >
                    {title}
                </Typography>
            </div>

        </div>



    );
}

export default Header