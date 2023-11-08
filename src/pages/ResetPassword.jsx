import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
const ResetPassword = () => {
  return (
    <>
       <Meta title="Reset-Password" />
      <BreadCrumb title="Reset-Password" />
      <Container class1="reset-password-wrapper py-28 set-bg">
        <div className=" flex items-center justify-center">
          <div className="reset-password-box rounded-md bg-white p-2 w-fit box-shadow-dim">
            <h3 className="text-xl font-medium text-center my-3">Reset Password</h3>
            <form className="form-box flex justify-center gap-4 flex-col" action="">
            
              <input className=" text-md font-normal rounded-md p-2 w-96" type="password" name="enter-password" placeholder='Enter Password' required />
              <input className=" text-md font-normal rounded-md p-2 w-96" type="password" name="conform-password" placeholder='Conform Password' required />
              <div className="form-buttons flex items-center justify-center gap-8 mb-4">
                <button type="submit" className="bg-slate-800 w-28 text-center mt-4 text-white font-bold py-2 px-3 rounded-full hover:bg-orange-400 dark:hover:bg-orange-500">Reset</button>

              </div>
            </form>

          </div>
        </div>

      </Container>
    </>
  )
}

export default ResetPassword
