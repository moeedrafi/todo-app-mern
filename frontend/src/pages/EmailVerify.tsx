import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useAuth } from "@/contexts/useAuth";
import { Card } from "@/components/Card";

const EmailVerify = () => {
  const { verifyEmail } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") as string;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        });
    }
  }, [token, verifyEmail]);

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
