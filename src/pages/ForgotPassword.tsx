import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

const schema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Handle password reset request
      console.log('Reset password for:', data.email);
    } catch (error) {
      console.error('Password reset error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/auth" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4 mr-1" />
            返回登录
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            找回密码
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            输入您的邮箱，我们将向您发送重置密码的链接
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="请输入邮箱"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              发送重置链接
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <p className="text-gray-500">
            记起密码了？{' '}
            <Link to="/auth" className="font-medium text-indigo-600 hover:text-indigo-500">
              返回登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}