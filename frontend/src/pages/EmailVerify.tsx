import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

const EmailVerify = () => {
  const { verifyEmail } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const token = searchParams.get("token") as string;

  useEffect(() => {
    if (token) {
      setLoading(true);
      verifyEmail(token)
        .then((response) => {
          setLoading(false);
          if (response.success) {
            toast.success("Your email is successfully verified!");
          } else {
            toast.error(response.error || "Verification failed.");
          }
        })
        .catch((error) => {
          setLoading(false);
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
        {loading && <p>Verifying...</p>}
      </Card>
    </div>
  );
};

export default EmailVerify;
