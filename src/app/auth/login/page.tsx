import { AuthForm } from "@/components/forms/auth-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { Logo } from "@/components/brand/logo";

export const metadata = createMetadata({
  title: "Sign In",
  path: "/auth/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      <Logo
        size="lg"
        href="/"
        className="mx-auto mb-8 h-20 w-auto max-w-[240px]"
      />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Member Sign In</CardTitle>
          <CardDescription>Access your dashboard, referrals, and events.</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm mode="login" />
        </CardContent>
      </Card>
    </div>
  );
}
