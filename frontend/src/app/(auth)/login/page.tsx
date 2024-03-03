"use client"

import React from 'react'
import { type NextPage } from 'next'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReCAPTCHA from 'react-google-recaptcha'
import { AuthScreen } from '../_component'

const Login = () => {
  const [capVal, setCapVal] = React.useState<string | null>(null)
  const loginSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters')
  })
  type Login = z.infer<typeof loginSchema>
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  })
  const handleSubmit = form.handleSubmit((data) => {

  })
  const router = useRouter()
  return (
    <AuthScreen>
      <Form {...form}>
        <form 
          onSubmit
          ={handleSubmit}
          className={``}
        >
          <FormField
            control={form.control}
            name={`email`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={`Email`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`password`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={`Password`} type={`password`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ReCAPTCHA
            className={`w-full flex items-center justify-center rounded-md h-fit`}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(val: string | null) => { setCapVal(val) }}
          />
          <Button
            disabled={form.formState.isSubmitting && !capVal}
            onClick={() => {
              router.push('/')
            }}
            className={`w-full`}
          >
            Login
          </Button>
          <Link href={`/auth/signup`}>
            Don't have an account?
          </Link>
        </form>
      </Form>
    </AuthScreen>
  )
}

export default Login