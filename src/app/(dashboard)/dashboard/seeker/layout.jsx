import { roleValidator } from '@/lib/session';
import React from 'react'

const SeekerLayout = async({children}) => {
    await roleValidator('seeker')
    return children;
}

export default SeekerLayout