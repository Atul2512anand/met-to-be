import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="bg-sand py-32 text-center">
      <div className="container-x max-w-xl">
        <Logo className="mx-auto mb-8 h-14 w-14" />
        <p className="eyebrow justify-center">404</p>
        <h1 className="font-display text-4xl font-medium">
          This path hasn’t met its match yet.
        </h1>
        <p className="mt-4 text-mocha">
          The page you’re looking for doesn’t exist — but your journey does.
        </p>
        <Link href="/" className="btn btn-solid mt-8">
          Back to Met To Be
        </Link>
      </div>
    </section>
  );
}
