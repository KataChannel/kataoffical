"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Tên phải có ít nhất 2 ký tự.",
  }),
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  bio: z.string().max(160).optional(),
})

const paymentFormSchema = z.object({
  paymentMethod: z.string({
    required_error: "Vui lòng chọn phương thức thanh toán.",
  }),
  accountName: z.string().min(2, {
    message: "Tên tài khoản phải có ít nhất 2 ký tự.",
  }),
  accountNumber: z.string().min(5, {
    message: "Số tài khoản không hợp lệ.",
  }),
  bankName: z.string().min(2, {
    message: "Tên ngân hàng phải có ít nhất 2 ký tự.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PaymentFormValues = z.infer<typeof paymentFormSchema>

export function SettingsForm() {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Nguyen Van A",
      email: "nguyenvana@example.com",
      bio: "Affiliate marketer chuyên về sản phẩm công nghệ và thiết bị điện tử.",
    },
  })

  const paymentForm = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "bank",
      accountName: "Nguyen Van A",
      accountNumber: "1234567890",
      bankName: "Vietcombank",
    },
  })

  function onProfileSubmit(data: ProfileFormValues) {
    console.log(data)
  }

  function onPaymentSubmit(data: PaymentFormValues) {
    console.log(data)
  }

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
        <TabsTrigger value="payment">Thanh toán</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Hồ sơ</CardTitle>
            <CardDescription>Cập nhật thông tin cá nhân của bạn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập họ và tên" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giới thiệu</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Giới thiệu về bạn" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>Giới thiệu ngắn gọn về bạn. Tối đa 160 ký tự.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Cập nhật hồ sơ</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="payment">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin thanh toán</CardTitle>
            <CardDescription>Cập nhật thông tin thanh toán của bạn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                <FormField
                  control={paymentForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phương thức thanh toán</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phương thức thanh toán" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bank">Chuyển khoản ngân hàng</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="momo">Ví MoMo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentForm.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên chủ tài khoản</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên chủ tài khoản" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentForm.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tài khoản</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số tài khoản" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={paymentForm.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên ngân hàng</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên ngân hàng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Cập nhật thông tin thanh toán</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <p className="text-sm text-muted-foreground">
              Thanh toán hoa hồng được thực hiện vào ngày 1 hàng tháng cho các khoản đạt ngưỡng tối thiểu 1,000,000đ.
            </p>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
