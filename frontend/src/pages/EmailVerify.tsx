import { Card } from "@/components/ui/Card";

const EmailVerify = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600">
      <Card
        header="Verify Email"
        subHeading="Enter the code in your email to verify"
      >
        <form className="space-y-6">
          <div className="flex justify-center gap-3">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  maxLength={1}
                  className="w-10 h-10 text-center rounded-lg outline-2 outline-gray-400 focus:outline-2 focus:outline-black"
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full p-2 font-semibold rounded-lg bg-black hover:bg-gray-800 text-white cursor-pointer"
          >
            Verify
          </button>
        </form>
      </Card>
    </div>
  );
};

export default EmailVerify;
