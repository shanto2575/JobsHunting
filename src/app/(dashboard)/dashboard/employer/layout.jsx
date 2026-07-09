import { roleValidator } from '@/lib/session';
import React from 'react'

const EmployLayout = async({children}) => {
    await roleValidator('employer')
    return children;
}

export default EmployLayout