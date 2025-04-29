import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";

import { Card } from "@/components/Card";
import { useAuth } from "@/contexts/AuthContext";
import { verifyEmail } from "@/services/authService";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, setIsLoading } = useAuth();
  const token = searchParams.get("token") as string;

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      verifyEmail(token)
        .then((response) => {
          setIsLoading(false);
          if (response.success) {
            toast.success("Your email is successfully verified!");
          } else {
            toast.error(response.error || "Verification failed.");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error || "Something went wrong.");
        })
        .finally(() => setIsLoading(false));
    }
  }, [token, setIsLoading]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600">
      <Card
        header="Verify Email"
        subHeading="Enter the code in your email to verify"
      >
        {isLoading && <p>Verifying...</p>}
      </Card>
    </div>
  );
};

export default EmailVerify;
