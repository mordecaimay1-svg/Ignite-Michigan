import { AuthForm } from "@/components/forms/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Logo } from "@/components/brand/logo";

export const metadata = createMetadata({
  title: "Join the Movement",
  path: "/auth/signup",
  noIndex: true,
});

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function SignupPage({ searchParams }: Props) {
  const { ref } = await searchParams;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <Logo
        size="lg"
        href="/"
        className="mx-auto mb-8 h-20 w-auto max-w-[240px]"
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join the Movement</CardTitle>
          <CardDescription>
            Create your account and start reaching your twelve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="signup" defaultReferralCode={ref} />
        </CardContent>
      </Card>
    </div>
  );
}
