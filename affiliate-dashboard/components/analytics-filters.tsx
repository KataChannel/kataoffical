"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function AnalyticsFilters() {
  const [campaignOpen, setCampaignOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [deviceOpen, setDeviceOpen] = useState(false)

  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDevices, setSelectedDevices] = useState<string[]>([])

  const campaigns = [
    { label: "Samsung Summer", value: "samsung-summer" },
    { label: "Back to School", value: "back-to-school" },
    { label: "Audio Deals", value: "audio-deals" },
    { label: "Photography Pro", value: "photography-pro" },
    { label: "Apple Products", value: "apple-products" },
    { label: "Home Appliances", value: "home-appliances" },
    { label: "Gaming Gear", value: "gaming-gear" },
  ]

  const categories = [
    { label: "Điện tử", value: "electronics" },
    { label: "Máy tính", value: "computers" },
    { label: "Âm thanh", value: "audio" },
    { label: "Máy ảnh", value: "cameras" },
    { label: "Đồng hồ thông minh", value: "smartwatches" },
    { label: "Máy tính bảng", value: "tablets" },
    { label: "Gia dụng", value: "home-appliances" },
    { label: "Màn hình", value: "monitors" },
    { label: "Phụ kiện", value: "accessories" },
  ]

  const devices = [
    { label: "Di động", value: "mobile" },
    { label: "Máy tính", value: "desktop" },
    { label: "Máy tính bảng", value: "tablet" },
  ]

  const toggleCampaign = (value: string) => {
    setSelectedCampaigns((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const toggleCategory = (value: string) => {
    setSelectedCategories((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const toggleDevice = (value: string) => {
    setSelectedDevices((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const clearFilters = () => {
    setSelectedCampaigns([])
    setSelectedCategories([])
    setSelectedDevices([])
  }

  const totalFilters = selectedCampaigns.length + selectedCategories.length + selectedDevices.length

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium">Bộ lọc:</span>
      </div>

      <Popover open={campaignOpen} onOpenChange={setCampaignOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={campaignOpen} className="justify-between">
            Chiến dịch
            {selectedCampaigns.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                {selectedCampaigns.length}
              </Badge>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Tìm chiến dịch..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy chiến dịch.</CommandEmpty>
              <CommandGroup>
                {campaigns.map((campaign) => (
                  <CommandItem
                    key={campaign.value}
                    value={campaign.value}
                    onSelect={() => toggleCampaign(campaign.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCampaigns.includes(campaign.value) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {campaign.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={categoryOpen} className="justify-between">
            Danh mục
            {selectedCategories.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                {selectedCategories.length}
              </Badge>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Tìm danh mục..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    value={category.value}
                    onSelect={() => toggleCategory(category.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategories.includes(category.value) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={deviceOpen} onOpenChange={setDeviceOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={deviceOpen} className="justify-between">
            Thiết bị
            {selectedDevices.length > 0 && (
              <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                {selectedDevices.length}
              </Badge>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandGroup>
                {devices.map((device) => (
                  <CommandItem key={device.value} value={device.value} onSelect={() => toggleDevice(device.value)}>
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDevices.includes(device.value) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {device.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {totalFilters > 0 && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Xóa tất cả ({totalFilters})
          </Button>
        </>
      )}
    </div>
  )
}
