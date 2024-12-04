import axios from 'axios';
import { Field, Formik, Form } from 'formik';
import {Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-gray-300 px-32 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Sign up</h1>
          <Formik
            className="w-full max-w-md"
            initialValues={{
              firstname: 'anh',
              lastname: 'hong',
              username: 'anhhong00',
              password: 'Password123!',
              email: 'anhhong@example.com',
              phoneNumber:'0372259325',
              dateOfBirth:'2004-03-30'
          
            }}
            onSubmit={async (values) => {
              try {
                const res = await axios.get("http://localhost:8080/api/v1/users", values)
                console.log(res);
                console.log(values);
                console.log(res.data);

              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({errors, touched,values}) => (
              <Form>
                <div className="grid grid-cols gap-2 items-center mt-2 w-64">
                  <Field type='text' autoComplete='off' name='firstname' placeholder='Firstname'  className='border border-black p-2 rounded-lg'  />
                  <Field type='text' autoComplete='off' name='lastname' placeholder='Lastname'  className='border border-black p-2 rounded-lg'  />
                  <Field type='text' autoComplete='off' name='username' placeholder='Username'  className='border border-black p-2 rounded-lg'  />
                  <Field type='password' name='password' placeholder="Password" className='border border-black p-2 rounded-lg'  />
                  <Field type='email' autoComplete='off' name='email' placeholder="Email" className='border border-black p-2 rounded-lg'  />
                  <Field type='tel' name='phoneNumber' placeholder="Phone Number" className='border border-black p-2 rounded-lg'  />
                  <Field type='date' name='dateOfBirth' className='border border-black p-2 rounded-lg'  />

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded mt-2 mb-0"
                    type="submit"

                  >
                    Sign up
                  </button>
                  <p className="text-sm text-gray-500 mb-1 text-center">
                    Have an account?
                    <Link to="/login" className="text-blue-500 hover:underline">
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SignUp