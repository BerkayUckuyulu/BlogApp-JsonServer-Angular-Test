import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlogService } from '../services/blog.service';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pageSize = 8;
  page = 0;

  blogData: Array<any> = [];
  constructor(private blogService: BlogService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe((response) => {
      console.log(response);
      this.blogData = response;
      this.page = Math.ceil(this.blogData.length / 100);
    });
  }
  openDialog(element: any, isEdit: any) {
    const dialogRef = this.dialog.open(BlogDialogComponent, {
      data: { blog: element, isUpdate: isEdit },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getBlogList();
    });
  }
  getBlogList() {
    this.blogService.getPosts().subscribe((response) => {
      console.log(response);
      this.blogData = response;
      this.page = Math.ceil(this.blogData.length / 100);
    });
  }
}
