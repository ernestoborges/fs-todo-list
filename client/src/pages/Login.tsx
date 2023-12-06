import { useForm } from "react-hook-form";
import { AuthenticationLayout } from "../layouts/Authentication";
import { Link } from "react-router-dom";

export function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        alert(data);
    };

    return <>
        <AuthenticationLayout>
            <div className="flex flex-col gap-10">
                <header
                    className="flex justify-center items-center"
                >
                    <h1 className="font-thin text-3xl text-[#999999]">Sign in to your account</h1>
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
                    <button
                        className="uppercase w-full p-4 bg-indigo-950 rounded-lg text-white hover:bg-indigo-800"
                    >
                        sign in
                    </button>
                </form>
                <footer
                    className="text-[#999999] flex justify-center gap-2"
                >
                    Not a member? <Link className="text-indigo-950 font-bold hover:underline" to="/register">Register</Link>
                </footer>
            </div>
        </AuthenticationLayout>
    </>
}