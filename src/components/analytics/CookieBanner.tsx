'use client';

import Link from 'next/link'
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])


  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied'

    window.gtag("consent", 'update', {
      'analytics_storage': newValue
    });

    setLocalStorage("cookie_consent", cookieConsent)

    console.log("Cookie Consent: ", cookieConsent)

  }, [cookieConsent]);
  return (
    <>
        <Card className={`my-10 mx-auto max-w-max md:max-w-screen-sm
      fixed bottom-0 left-0 right-0 text-white
      flex px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
      bg-gray-700 rounded-lg shadow ${cookieConsent ? "hidden" : "flex"}`}
        >
          <CardContent
            className={`flex flex-row gap-4 justify-between items-center w-full py-0`}
          >

            <div className='text-center'>
              <Link href="/info/cookies"><p>We use <span className='font-bold text-sky-400'>cookies</span> on our site.</p></Link>
            </div>


            <menu className='flex gap-2 '>
              <li
                className={`

                `}
              >
                <Button className='...' onClick={() => setCookieConsent(false)}>Decline</Button>
              </li>
              <li>
                <Button className='...' onClick={() => setCookieConsent(true)}>Allow Cookies</Button>
              </li>
            </menu>
          </CardContent>
        </Card>
    </>
  )
}