import { useForm } from "react-hook-form";
import { AuthenticationLayout } from "../layouts/Authentication";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async (data: any) => {

        const { email, username, password } = data

        try {
            const response = await axios.post(
                'http://localhost:3000/api/user/register',
                {
                    email,
                    username,
                    password
                }
            );
            alert(response)
        } catch (error: any) {
            setMessage(error.response.data.message);
        }

    };

    return <>
        <AuthenticationLayout>
            <div className="flex flex-col gap-10">
                <header
                    className="flex justify-center items-center"
                >
                    <h1 className="font-thin text-3xl text-[#999999]">Register a new account</h1>
                </header>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-10"
                >
                    <label
                        className="cc-label"
                    >
                        <div className={`flex align-middle gap-1 ${errors.email ? "text-red-500" : ""}`}>
                            <span>email</span>
                            {errors.email && <span className="italic font-thin text-xl normal-case text-red-500"> - email is required</span>}
                        </div>
                        <input
                            className="cc-input"
                            placeholder="Email"
                            {...register('email', { required: true })}
                        />
                    </label>
                    <label
                        className="cc-label"
                    >
                        <div className={`flex align-middle gap-1 ${errors.username ? "text-red-500" : ""}`}>
                            <span>username</span>
                            {errors.username && <span className="italic font-thin text-xl normal-case text-red-500"> - username is required</span>}
                        </div>
                        <input
                            className="cc-input"
                            placeholder="Username"
                            {...register('username', { required: true })}
                        />
                    </label>
                    <label
                        className="cc-label"
                    >
                        <div className={`flex align-middle gap-1 ${errors.email ? "text-red-500" : ""}`}>
                            <span>password</span>
                            {errors.password && <span className="italic font-thin text-xl normal-case text-red-500"> - password is required</span>}
                        </div>
                        <input
                            className="cc-input"
                            placeholder="Password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                    </label>
                    <div className="text-red-500 h-10 flex justify-center">
                        {message}
                    </div>
                    <button
                        className="uppercase w-full p-4 bg-indigo-950 rounded-lg text-white hover:bg-indigo-800"
                    >
                        Sign up
                    </button>
                </form>
                <footer
                    className="text-[#999999] flex justify-center gap-2"
                >
                    Already a member? <Link className="text-indigo-950 font-bold hover:underline" to="/login">Login</Link>
                </footer>
            </div>
        </AuthenticationLayout>
    </>
}