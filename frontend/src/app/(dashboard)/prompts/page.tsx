import React from 'react'
import { type NextPage } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const Prompts: NextPage = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Prompts
          </CardTitle>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </>
  )
}

const Bot = () => {
  return (
    <>
      <picture
        className={`
          w-24 h-24
          flex items-center justify-center
          bg-gray-100
          rounded-full
        `}
      >
        <BotSVG />
      </picture>
    </>
  )
}
const BotSVG = () => {
  return (
    <svg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M106.949 51.904C105.872 49.3013 103.563 48.6773 102 48.528V32.6666C102 26.784 97.216 22 91.3333 22H59.3333V14.5866C60.96 13.1253 62 11.024 62 8.66663C62 6.54489 61.1572 4.51006 59.6569 3.00977C58.1566 1.50948 56.1217 0.666626 54 0.666626C51.8783 0.666626 49.8434 1.50948 48.3432 3.00977C46.8429 4.51006 46 6.54489 46 8.66663C46 11.024 47.04 13.1253 48.6667 14.5866V22H16.6667C10.784 22 6.00001 26.784 6.00001 32.6666V48.6506L5.56268 48.6826C4.21853 48.7797 2.96095 49.3819 2.04277 50.3684C1.12459 51.3548 0.613888 52.6523 0.613342 54V64.6666C0.613342 66.0811 1.17525 67.4377 2.17544 68.4379C3.17563 69.4381 4.53219 70 5.94668 70H6.00001V96.6666C6.00001 102.549 10.784 107.333 16.6667 107.333H91.3333C97.216 107.333 102 102.549 102 96.6666V70C103.415 70 104.771 69.4381 105.771 68.4379C106.771 67.4377 107.333 66.0811 107.333 64.6666V54.3306C107.395 53.5029 107.263 52.6723 106.949 51.904ZM16.6667 96.6666V32.6666H91.3333L91.3387 53.9786L91.3333 54V64.6666L91.3387 64.6933L91.344 96.6666H16.6667Z" fill="black" />
      <path d="M35.3333 64.6667C39.7516 64.6667 43.3333 59.8911 43.3333 54C43.3333 48.109 39.7516 43.3334 35.3333 43.3334C30.9151 43.3334 27.3333 48.109 27.3333 54C27.3333 59.8911 30.9151 64.6667 35.3333 64.6667Z" fill="black" />
      <path d="M72.6667 64.6667C77.085 64.6667 80.6667 59.8911 80.6667 54C80.6667 48.109 77.085 43.3334 72.6667 43.3334C68.2484 43.3334 64.6667 48.109 64.6667 54C64.6667 59.8911 68.2484 64.6667 72.6667 64.6667Z" fill="black" />
      <path d="M32.6667 75.3334H75.3333V86H32.6667V75.3334Z" fill="black" />
    </svg>
  )
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { ChevronUpIcon } from '@radix-ui/react-icons'
import axios from 'axios'
export const PromptForm = () => {
  const promptSchema = z.object({
    prompt: z.string().nonempty('Prompt is required'),
  })
  type Prompt = z.infer<typeof promptSchema>
  const form = useForm<Prompt>({
    resolver: zodResolver(promptSchema),
  })
  const handleSubmit = form.handleSubmit((data) => {
    axios.post('/api/prompts', data)
  })
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your question..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className={`
              
            `}
            size={`icon`}
            variant={`secondary`}
          >
            <ChevronUpIcon />
          </Button>
        </form>
      </Form>
    </>
  )
}