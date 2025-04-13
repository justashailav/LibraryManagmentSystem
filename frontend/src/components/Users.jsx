import Header from '@/layout/Header';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Users() {
  const {users}=useSelector((state)=>state.user);
  console.log(users);
  const formatDate=(timeStamp)=>{
    const date=new Date(timeStamp);
    const formatDate=`${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getFullYear())}`
    const formatTime=`${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`
    const result=`${formatDate} ${formatTime}`;
    return result
  }
  return (
    <>
       <main className='relative flex-1 p-6 pt-28'>
          <Header/>
          <header className='flex flex-col gap-3 md:flex-row md:justify-between md:items-center'>
             <h2 className='text-xl font-medium md:text-2xl md:font-semibold'>Registered Users</h2>
          </header>
          {
            users && users.filter((u)=>u.role==="User").length>0?(
              <div className='mt-6 overflow-auto bg-white rounded-md shadow-lg'>
                <table className='min-w-full border-collapse'>
                  <thead>
                    <tr className='bg-gray-200'>
                      <th className='px-4 py-2 text-left'>ID</th>
                      <th className='px-4 py-2 text-left'>NAME</th>
                      <th className='px-4 py-2 text-left'>EMAIL</th>
                      <th className='px-4 py-2 text-left'>ROLE</th>
                      <th className='px-4 py-2 text-center'>No.of books borrowed</th>
                      <th className='px-4 py-2 text-center'>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.filter((u)=>u.role==="User")
                      .map((user,index)=>(
                        <tr key={user._id} className={(index+1)%2===0?"bg-gray-50":""}>
                          <td className='px-4 py-2'>{index+1}</td>
                          <td className='px-4 py-2'>{user.name}</td>
                          <td className='px-4 py-2'>{user.email}</td>
                          <td className='px-4 py-2'>{user.role}</td>
                          <td className='px-4 py-2 text-center'>{user.borrowedBooks.length}</td>
                          <td className='px-4 py-2 text-center'>{formatDate(user.createdAt)}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            ):(
              <h3 className='mt-5 text-3xl font-medium'>No registered users found in the library</h3>
            )

          }
       </main>
    </>
  )
}
