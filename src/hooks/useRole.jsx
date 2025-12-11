import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading, data: role } = useQuery({ 
        queryKey: ['user-role', user?.email],
        enabled: !!user?.email, 
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            
            return res.data.role; 
        }
    })
    
    
    return { role: role || 'user', isLoading };
};

export default useRole;


// const useRole = () => {
//     const {user} = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { isLoading,data: role = 'user' } = useQuery({
//         queryKey: ['user-role', user?.email],
//         queryFn: async() => {
//             const res = await axiosSecure.get(`/users/${user.email}/role`);
//             return res.data
//         }
//     })
//     return {role, isLoading};
// };

// export default useRole;