// 'use client'

// import { useLogOutMutation } from '@/services/account'
// import { useEffect } from 'react'

// export const LogOut = () => {
//   const [logOut, { data, isLoading, isSuccess }] = useLogOutMutation()

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       logOut()
//     }, 3000)

//     return () => {
//       clearTimeout(timeoutId)
//     }
//   }, [logOut])

//   return (
//     <>
//       {isLoading && <div>Loading...</div>}
//       {isSuccess && <div>{data.status}</div>}
//     </>
//   )
// }
