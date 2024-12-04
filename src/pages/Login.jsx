import {Field, Form, Formik} from "formik";
import {loginCheck} from "../utils/loginCheck";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  // const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border border-gray-300 p-16 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Login</h1>

          <Formik
            className="w-full max-w-md"
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={loginCheck()}
            onSubmit={async (values) => {
              try {
                const res = await axios.post(
                  "http://localhost:8080/api/v1/auths/login",
                  values
                );
                console.log(res);
                console.log(values);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({errors, touched}) => (
              <Form>
                <div className="flex flex-col items-center justify-center mt-4 ">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="border border-black p-2 rounded-lg"
                  />
                  {errors.username && touched.username ? (
                    <p className=" text-red-500 ">{errors.username}</p>
                  ) : null}
                  <br />
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-black p-2 rounded-lg"
                  />
                  {errors.password && touched.password ? (
                    <p className=" text-red-500 ">{errors.password}</p>
                  ) : null}
                  <br />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    Don't have an account?
                    <Link
                      to="/signup"
                      className="text-blue-500 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
