import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/CardWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const Register = () => {
  const form = useForm();

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-sky-400 to-blue-600">
      <CardWrapper
        header="Register"
        headerLabel="Create an Account"
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
      >
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="john_doe" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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

export default Register;
