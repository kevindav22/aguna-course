'use client';
import Button from '@/app/(landing)/components/ui/button';
import { login } from '@/app/services/auth.service';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/admin/products');
    }
  }, [router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      if (data.token) {
        router.push('/admin/products');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong');
      console.error('Login Error', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#F7F9FA] w-full min-h-screen flex justify-center items-center">
      <div className="max-w-136 w-full bg-white rounded-xl border-t-4 border-primary p-12">
        <Image src="/images/logo-admin.svg" alt="logo admin" width={304} height={51} className="mx-auto mb-4" />
        <p className="opacity-50 text-sm text-center">Enter your credentials to acces the dashboard</p>
       
        <div className="py-8">
           {errorMessage && <div className="px-3 py-1 bg-primary-light border border-primary rounded-md text-primary text-sm text-center w-full mb-5">{errorMessage}</div>}
          <div className="input-group-admin mb-5">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Please type your email" className="rounded-lg!" />
          </div>
          <div className="input-group-admin">
            <label htmlFor="password">Password</label>
            <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••••" className="rounded-lg!" />
          </div>
        </div>
        <Button onClick={handleLogin} className="w-full rounded-lg! mb-5">
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </main>
  );
};
export default LoginPage;
