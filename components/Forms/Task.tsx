"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { createTask } from "@/lib/actions/task.action"
import { useRouter } from "next/navigation"

// Correct the typo 'tilte' to 'title'
const formSchema = z.object({
    title: z.string().min(10, {
      message: "Title must be at least 10 characters long",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters long",
    }),
    status: z.enum(["completed", "in-progress", "pending"], {
      message: "Please select a valid status",
    }), // Validation for valid status
  })

interface TaskProps {
  mongoUserId: string;
}

const Task = ({mongoUserId} :TaskProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "pending",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        await createTask({
            title: values.title,
            description: values.description,
            status: values.status,
            author: JSON.parse(mongoUserId)
        })
       router.push('/');
    } catch (error) {
        console.error("Failed to create task:", error);
    } finally {
        setIsSubmitting(false); 
    }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="
      flex w-full flex-col gap-10">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Task title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of your task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Task description" {...field} />
              </FormControl>
              <FormDescription>
                This is a detailed description of your task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
  control={form.control}
  name="status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Status</FormLabel>
      <FormControl>
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select task status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>
        Select the status of your task.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


        <Button type="submit" disabled={isSubmitting}>Submit</Button>
      </form>
    </Form>
  )
}

export default Task
