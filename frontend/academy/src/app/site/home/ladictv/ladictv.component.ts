  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { RouterModule } from '@angular/router';
  
  interface Course {
    id: number;
    title: string;
    instructor: string;
    price: number;
    rating: number;
    duration: number; // in hours
    category: string;
    imageUrl: string;
    students: number;
    lastUpdated: Date;
  }
  
  @Component({
    selector: 'app-ladictv',
    imports: [CommonModule, FormsModule, RouterModule], // Import các module cần thiết vào đây 
    templateUrl: './ladictv.component.html',
    styleUrls: ['./ladictv.component.scss'],
  })
  export class LadictvComponent implements OnInit {
    // Course data - in real app this would come from a service
    courses: Course[] = [
      {
        id: 1,
        title: 'Angular Fundamentals',
        instructor: 'John Doe',
        price: 49.99,
        rating: 4.7,
        duration: 12,
        category: 'Web Development',
        imageUrl: 'https://picsum.photos/300/200?random=1',
        students: 1250,
        lastUpdated: new Date('2023-05-15')
      },
      {
        id: 2,
        title: 'Advanced React Patterns',
        instructor: 'Jane Smith',
        price: 59.99,
        rating: 4.9,
        duration: 15,
        category: 'Web Development',
        imageUrl: 'https://picsum.photos/300/200?random=2',
        students: 980,
        lastUpdated: new Date('2023-06-20')
      },
      {
        id: 3,
        title: 'Python for Data Science',
        instructor: 'Mike Johnson',
        price: 39.99,
        rating: 4.5,
        duration: 20,
        category: 'Data Science',
        imageUrl: 'https://picsum.photos/300/200?random=3',
        students: 2100,
        lastUpdated: new Date('2023-04-10')
      },
      {
        id: 4,
        title: 'DevOps Essentials',
        instructor: 'Sarah Williams',
        price: 69.99,
        rating: 4.8,
        duration: 18,
        category: 'DevOps',
        imageUrl: 'https://picsum.photos/300/200?random=4',
        students: 750,
        lastUpdated: new Date('2023-07-05')
      }
    ];
  
    filteredCourses: Course[] = [];
    searchTerm: string = '';
    sortField: string = 'title';
    sortDirection: 'asc' | 'desc' = 'asc';
    categories: string[] = ['All', 'Web Development', 'Data Science', 'DevOps'];
    selectedCategory: string = 'All';
  
    ngOnInit(): void {
      this.filteredCourses = [...this.courses];
      this.sortCourses();
    }
  
    applyFilters(): void {
      this.filteredCourses = this.courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                             course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase());
        const matchesCategory = this.selectedCategory === 'All' || course.category === this.selectedCategory;
        return matchesSearch && matchesCategory;
      });
      this.sortCourses();
    }
  
    sortCourses(): void {
      this.filteredCourses.sort((a, b) => {
        let comparison = 0;
        
        if (this.sortField === 'price') {
          comparison = a.price - b.price;
        } else if (this.sortField === 'rating') {
          comparison = a.rating - b.rating;
        } else if (this.sortField === 'duration') {
          comparison = a.duration - b.duration;
        } else if (this.sortField === 'students') {
          comparison = a.students - b.students;
        } else if (this.sortField === 'lastUpdated') {
          comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime();
        } else {
          // Default sort by title
          comparison = a.title.localeCompare(b.title);
        }
  
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
  
    changeSort(field: string): void {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }
      this.sortCourses();
    }
  
    getSortIcon(field: string): string {
      if (this.sortField !== field) return '';
      return this.sortDirection === 'asc' ? '↑' : '↓';
    }
  } 