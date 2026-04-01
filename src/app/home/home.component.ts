import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  list: { name: string; age: number }[] = [];
  listOriginal: { name: string; age: number }[] = [];
  name: string = '';
  age: number | null = null;
  searchTerm: string = '';
  sortNameAsc: boolean = true;
  sortAgeAsc: boolean = true;

  ngOnInit(): void {
    this.listOriginal = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 },
    ];
    this.list = [...this.listOriginal];
    console.log('Component initialized with list:', this.list);
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.list = [...this.listOriginal];
      return;
    }
    this.list = this.listOriginal.filter((item) =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
    console.log('Search results:', this.list);
  }

  clearSearch() {
    this.searchTerm = '';
    this.list = [...this.listOriginal];
  }

  onAdd() {
    if (!this.name || this.age === null) {
      return;
    }
    this.listOriginal.push({ name: this.name, age: this.age });
    this.name = '';
    this.age = null;
    this.onSearch();
  }

  sortByName() {
    console.log('Sorting by name');
    this.list = this.list.sort((a, b) =>
      this.sortNameAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );
    this.sortNameAsc = !this.sortNameAsc;
  }
  sortByAge() {
    this.list = this.list.sort((a, b) =>
      this.sortAgeAsc ? a.age - b.age : b.age - a.age,
    );
    this.sortAgeAsc = !this.sortAgeAsc;
  }
}
