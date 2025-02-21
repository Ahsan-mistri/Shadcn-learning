import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner"
import { useEffect } from "react";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/Dashboard");
        }
    }, [navigate]);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = (data) => {
        if (data.email === "admin@test.com" && data.password === "Password@123") {
            localStorage.setItem("user", JSON.stringify({ email: data.email }));
            navigate("/Dashboard");
        } else {
           
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
             <Toaster position="top-right"/>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription className="font-semibold">
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            {...register("email")}
                                        />
                                        {errors.email && (
                                            <span className="text-sm text-red-500">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your Password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...register("password")}
                                        />
                                        {errors.password && (
                                            <span className="text-sm text-red-500">
                                                {errors.password.message}
                                            </span>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        Login with Google
                                    </Button>
                                </div>

                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account? {""}
                                    <a href="#" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Login;