import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tainguyenctv',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './tainguyenctv.component.html',
  styleUrl: './tainguyenctv.component.scss',
})
export class TainguyenctvComponent {
  Listfilters:any= [
    { label: 'All Types', active: true },
    { label: 'Banners', active: false },
    { label: 'Social Media', active: false },
    { label: 'Email', active: false },
    { label: 'Video', active: false },
  ]
  ListData: any =[
      {
        title: 'Summer Sale Banner',
        type: 'Banner',
        badge: {
          text: 'Banner',
          bgColor: 'blue-100',
          textColor: 'blue-800',
        },
        file: 'JPG • 728x90',
        image: {
          src: 'https://images.pexels.com/photos/3943746/pexels-photo-3943746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Summer Sale Banner',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Product Showcase',
        type: 'Banner',
        badge: {
          text: 'Banner',
          bgColor: 'blue-100',
          textColor: 'blue-800',
        },
        file: 'PNG • 300x250',
        image: {
          src: 'https://images.pexels.com/photos/4755048/pexels-photo-4755048.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Product Showcase',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Social Media Post',
        type: 'Social',
        badge: {
          text: 'Social',
          bgColor: 'purple-100',
          textColor: 'purple-800',
        },
        file: 'PNG • 1080x1080',
        image: {
          src: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Social Media Post',
        },
        actions: {
          download: '#',
        },
      },
      {
        title: 'Email Header',
        type: 'Email',
        badge: {
          text: 'Email',
          bgColor: 'green-100',
          textColor: 'green-800',
        },
        file: 'JPG • 600x200',
        image: {
          src: 'https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Email Header',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Product Video',
        type: 'Video',
        badge: {
          text: 'Video',
          bgColor: 'red-100',
          textColor: 'red-800',
        },
        file: 'MP4 • 1920x1080',
        image: {
          src: 'https://images.pexels.com/photos/7345433/pexels-photo-7345433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Product Video',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Special Offer Banner',
        type: 'Banner',
        badge: {
          text: 'Banner',
          bgColor: 'blue-100',
          textColor: 'blue-800',
        },
        file: 'PNG • 468x60',
        image: {
          src: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Special Offer Banner',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Holiday Campaign',
        type: 'Banner',
        badge: {
          text: 'Banner',
          bgColor: 'blue-100',
          textColor: 'blue-800',
        },
        file: 'JPG • 970x250',
        image: {
          src: 'https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Holiday Campaign',
        },
        actions: {
          download: '#',
          getCode: '#',
        },
      },
      {
        title: 'Instagram Story Template',
        type: 'Social',
        badge: {
          text: 'Social',
          bgColor: 'purple-100',
          textColor: 'purple-800',
        },
        file: 'PNG • 1080x1920',
        image: {
          src: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          alt: 'Instagram Story Template',
        },
        actions: {
          download: '#',
        },
      },
    ]
 toggleFilter(index: number) {
    this.Listfilters.forEach((filter: any, i: number) => {
      filter.active = i === index;
    });
  }   
}
