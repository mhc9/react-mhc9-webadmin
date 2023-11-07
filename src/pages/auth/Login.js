import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { login, resetSuccess } from '../../slices/authSlice'

const authSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
});

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { success } = useSelector(state => state.auth)

    const handleSubmit = (values, formik) => {
        dispatch(login(values));
    };
    
    useEffect(() => {
        if (success) {
            console.log('On success changed...');
            dispatch(resetSuccess());

            navigate('/');
        }
    }, [success])

    return (
        <Formik
            initialValues={{
                email: 'sanyath007@gmail.com',
                password: '4621008811'
            }}
            validationSchema={authSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>

                        <div className="h-[100vh] flex items-center justify-center bg-gray-100">
                            <div className="border w-[440px] min-h-[280px] rounded-xl shadow-md bg-white py-5">
                                <div className="flex flex-col items-center">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img
                                                src="https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"
                                                alt="avatar-img"
                                            />
                                        </div>
                                    </div>
                                    <div className="my-4">
                                        <div className="form-control mb-2">
                                            <label htmlFor="">Email</label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                placeholder="Enter email"
                                                className={`input input-bordered w-full max-w-xs ${(formik.errors.email && formik.touched.email) ? 'input-error' : ''}`}
                                            />
                                            {(formik.errors.email && formik.touched.email) && (
                                                <span className="text-red-500 text-xs">{formik.errors.email}</span>
                                            )}
                                        </div>
                                        <div className="form-control mb-2">
                                            <label htmlFor="">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                placeholder="Enter password"
                                                className={`input input-bordered w-full max-w-xs ${(formik.errors.password && formik.touched.password) ? 'input-error' : ''}`}
                                            />
                                            {(formik.errors.password && formik.touched.password) && (
                                                <span className="text-red-500 text-xs">{formik.errors.password}</span>
                                            )}
                                        </div>
                                        <div className="form-control">
                                            <button type="submit" className="btn btn-primary">Log in</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Login