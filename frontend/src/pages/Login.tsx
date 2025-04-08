import { Link } from "react-router";
import { CardWrapper } from "@/components/CardWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600">
      <CardWrapper
        header="Login"
        headerLabel="Welcome Back"
        backButtonLabel="Don't have an account"
        backButtonHref="/register"
      >
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@gmail.com"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="********" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="link"
              size="sm"
              asChild
              className="px-0 mb-3 font-normal text-xs"
            >
              <Link to="/reset">Forgot Password?</Link>
            </Button>

            <Button type="submit" className="w-full cursor-pointer">
              Submit
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default Login;
