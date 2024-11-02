import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { login } from "@/features/user-slice";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  function onLogin({ email, password }: z.infer<typeof formSchema>) {
    if (email === "admin@gmail.com" && password === "admin*123") {
      dispatch(login({ firstName: "Maheer", lastName: "Shaik" }));
      navigate("/");
    } else {
      toast.error("Invalid email or password");
      form.reset();
    }
  }
  return (
    <article id="login" className="max-w-[400px]  mx-auto mt-24 flex items-center justify-center min-h-screen">
      <Toaster position="top-center" />
      <Card className="w-full max-w-sm bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-teal-900">Login</CardTitle>
          <CardDescription className="text-teal-700">Enter your email and password</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)}>
            <CardContent className="bg-green-50">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="bg-green-100 text-gray-900" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-green-100 text-gray-900" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-700 text-white">Login</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </article>
  );
}
