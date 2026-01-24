'use client';
import Button from '@/app/(landing)/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const { push } = useRouter();
    
    const handleLogin = () => {
        push('/admin/products');
    }

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary p-12">
        <Image src="/images/logo-admin.svg" alt="logo admin" width={304} height={51} className="mx-auto mb-4" />
        <p className="opacity-50 text-sm text-center">Enter your credentials to acces the dashboard</p>
        <div className="py-8">
          <div className="input-group-admin mb-5">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder="Please type your email" className="rounded-lg!" />
          </div>
          <div className="input-group-admin">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" placeholder="••••••••••••" className="rounded-lg!" />
          </div>
        </div>
        <Button onClick={handleLogin} className="w-full rounded-lg! mb-5">
          Sign In
        </Button>
      </div>
    </main>
  );
};
export default LoginPage;
