import { Link } from "react-router";

interface CardProps {
  header: string;
  subHeading: string;
  to?: string;
  label?: string;
  children: React.ReactNode;
}

export const Card = ({
  children,
  header,
  subHeading,
  label,
  to,
}: CardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg w-[400px] shadow-md">
      {/* Header */}
      <div className="w-full flex flex-col gap-y-3 items-center justify-center">
        <h1 className="text-3xl font-semibold">🔐 {header}</h1>
        <p className="text-gray-600 text-sm">{subHeading}</p>
      </div>

      {/* Content */}
      <div className="mt-5">{children}</div>

      {/* Footer */}
      {to && label && (
        <div className="w-full text-center font-semibold">
          <Link to={to} className="hover:underline underline-offset-2">
            {label}
          </Link>
        </div>
      )}
    </div>
  );
};
