'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Title from "@/components/ui/Title";
import { bricolage_grotesque } from "@/utils/fonts";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function LoginForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const loginUser = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: email,
                password: password,
            })

            if (result?.error) {
                if (result.error === 'CredentialsSignin') {
                    toast.error('Incorrect username or password')
                } else {
                    toast.error(result.error)
                }
            } else if (result?.ok) {
                // Login successful
                toast.success('Login Successful :)')
                router.replace('/blogs/manage');
            }

        } catch (error) {
            toast.error('An error occurred during login')
            console.error('Login error:', error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <section className={`h-screen w-full px-64 max-[1025px]:px-4 max-[1285px]:px-40 max-lg:px-0 max-sm:px-4 flex justify-center items-center pb-8 ${bricolage_grotesque}`}>
            <div className="dark:bg-white dark:text-black bg-black text-white px-5 pt-10 pb-16 rounded-lg max-sm:w-full">
                <Title title="Login" />
                <form className="space-y-3 mt-8" onSubmit={loginUser}>
                    <Input type="text" className='w-full h-full border dark:placeholder:text-black placeholder:text-white' placeholder='johndoe69@xyz.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <Input type="password" className='w-full h-full border dark:placeholder:text-black placeholder:text-white' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <Button className="dark:bg-black dark:text-white text-black bg-white mt-10 w-full dark:hover:bg-slate-800 hover:bg-gray-200">
                        {
                            isLoading ? 'Loading...' : 'Login'
                        }
                    </Button>
                </form>
            </div>
        </section>
    )
}