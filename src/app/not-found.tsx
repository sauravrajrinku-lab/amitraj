import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ds-bg text-ds-text1 px-6 text-center">
      <h1 className="text-6xl font-bold text-ds-accent mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-ds-text2 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 btn-primary text-sm font-medium"
      >
        Back to Home
      </Link>
    </div>
  );
}
