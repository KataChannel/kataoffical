"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Check, ChevronsUpDown, Copy, ExternalLink, Link2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

const campaigns = [
  { label: "Samsung Summer", value: "samsung-summer" },
  { label: "Back to School", value: "back-to-school" },
  { label: "Audio Deals", value: "audio-deals" },
  { label: "Photography Pro", value: "photography-pro" },
  { label: "Apple Products", value: "apple-products" },
  { label: "Home Appliances", value: "home-appliances" },
  { label: "Gaming Gear", value: "gaming-gear" },
  { label: "Fitness Tech", value: "fitness-tech" },
]

const products = [
  { label: "Điện thoại Galaxy S23", value: "galaxy-s23" },
  { label: "Laptop Dell XPS 13", value: "dell-xps-13" },
  { label: "Tai nghe Sony WH-1000XM5", value: "sony-wh-1000xm5" },
  { label: "Máy ảnh Canon EOS R6", value: "canon-eos-r6" },
  { label: "Apple Watch Series 8", value: "apple-watch-8" },
  { label: "iPad Pro 12.9", value: "ipad-pro-12-9" },
  { label: "Máy hút bụi Dyson V12", value: "dyson-v12" },
  { label: "Màn hình Samsung Odyssey G9", value: "samsung-odyssey-g9" },
  { label: "Bàn phím cơ Keychron Q1", value: "keychron-q1" },
  { label: "Loa Marshall Stanmore III", value: "marshall-stanmore-3" },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Tên liên kết phải có ít nhất 2 ký tự.",
  }),
  productId: z.string({
    required_error: "Vui lòng chọn sản phẩm.",
  }),
  campaignId: z.string({
    required_error: "Vui lòng chọn chiến dịch.",
  }),
  targetUrl: z.string().url({
    message: "URL không hợp lệ. Vui lòng nhập một URL đầy đủ (bao gồm https://).",
  }),
  description: z
    .string()
    .max(200, {
      message: "Mô tả không được vượt quá 200 ký tự.",
    })
    .optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  addUtmParams: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function CreateLinkForm() {
  const [open, setOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState("")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetUrl: "",
      description: "",
      utmSource: "affiliate",
      utmMedium: "referral",
      utmCampaign: "",
      addUtmParams: false,
    },
  })

  function onSubmit(data: FormValues) {
    // Tạo liên kết với các tham số UTM nếu được chọn
    let finalUrl = data.targetUrl

    if (data.addUtmParams) {
      const url = new URL(data.targetUrl)
      url.searchParams.append("utm_source", data.utmSource || "affiliate")
      url.searchParams.append("utm_medium", data.utmMedium || "referral")
      url.searchParams.append("utm_campaign", data.utmCampaign || data.campaignId)
      finalUrl = url.toString()
    }

    // Thêm ID người dùng affiliate vào URL (giả lập)
    const affiliateId = "AF123456"
    const finalLinkWithId = finalUrl + (finalUrl.includes("?") ? "&" : "?") + "aff_id=" + affiliateId

    setGeneratedLink(finalLinkWithId)

    // Trong thực tế, bạn sẽ gửi dữ liệu này đến API để lưu trữ
    console.log("Form data:", data)
    console.log("Generated link:", finalLinkWithId)

    toast({
      title: "Liên kết đã được tạo thành công!",
      description: "Liên kết tiếp thị mới đã được tạo và sẵn sàng sử dụng.",
    })
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedLink)
    toast({
      title: "Đã sao chép!",
      description: "Liên kết đã được sao chép vào clipboard.",
    })
  }

  function resetForm() {
    form.reset()
    setGeneratedLink("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tạo liên kết mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo liên kết tiếp thị mới</DialogTitle>
          <DialogDescription>
            Điền thông tin bên dưới để tạo một liên kết tiếp thị mới. Liên kết sẽ được tạo tự động với ID người dùng của
            bạn.
          </DialogDescription>
        </DialogHeader>

        {!generatedLink ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên liên kết</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên liên kết" {...field} />
                    </FormControl>
                    <FormDescription>Đặt tên dễ nhớ để dễ dàng quản lý liên kết của bạn.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Sản phẩm</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? products.find((product) => product.value === field.value)?.label
                              : "Chọn sản phẩm"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Tìm sản phẩm..." />
                          <CommandList>
                            <CommandEmpty>Không tìm thấy sản phẩm.</CommandEmpty>
                            <CommandGroup>
                              {products.map((product) => (
                                <CommandItem
                                  value={product.label}
                                  key={product.value}
                                  onSelect={() => {
                                    form.setValue("productId", product.value)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      product.value === field.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {product.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="campaignId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chiến dịch</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chiến dịch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {campaigns.map((campaign) => (
                          <SelectItem key={campaign.value} value={campaign.value}>
                            {campaign.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Chọn chiến dịch mà liên kết này thuộc về.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL đích</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/product" {...field} />
                    </FormControl>
                    <FormDescription>URL của trang sản phẩm hoặc trang đích bạn muốn liên kết đến.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả (tùy chọn)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả ngắn về liên kết này" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Thêm mô tả ngắn để dễ dàng nhận biết mục đích của liên kết.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addUtmParams"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Thêm tham số UTM</FormLabel>
                      <FormDescription>Thêm các tham số UTM vào URL để theo dõi hiệu quả tiếp thị.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("addUtmParams") && (
                <div className="space-y-4 rounded-lg border p-4">
                  <FormField
                    control={form.control}
                    name="utmSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Source</FormLabel>
                        <FormControl>
                          <Input placeholder="affiliate" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmMedium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Medium</FormLabel>
                        <FormControl>
                          <Input placeholder="referral" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="utmCampaign"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UTM Campaign</FormLabel>
                        <FormControl>
                          <Input placeholder="summer_sale" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">Tạo liên kết</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Liên kết của bạn đã sẵn sàng!</h3>
              <p className="text-sm text-muted-foreground">
                Sao chép liên kết bên dưới và bắt đầu chia sẻ để kiếm hoa hồng.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input value={generatedLink} readOnly className="pr-10" />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Sao chép</span>
                </Button>
              </div>
              <Button size="icon" variant="outline" asChild>
                <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Mở liên kết</span>
                </a>
              </Button>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Thông tin liên kết:</span>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Tên:</span> {form.getValues("name")}
                </p>
                <p>
                  <span className="font-medium">Sản phẩm:</span>{" "}
                  {products.find((p) => p.value === form.getValues("productId"))?.label}
                </p>
                <p>
                  <span className="font-medium">Chiến dịch:</span>{" "}
                  {campaigns.find((c) => c.value === form.getValues("campaignId"))?.label}
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={resetForm}>
                Tạo liên kết khác
              </Button>
              <Button onClick={() => setOpen(false)}>Hoàn tất</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
