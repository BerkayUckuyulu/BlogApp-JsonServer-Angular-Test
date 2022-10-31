import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.css'],
})
export class BlogDialogComponent implements OnInit {
  isUpdate: boolean = false;
  imageUrl: string = '';
  title: string = '';
  body: string = '';
  commentData: any;

  form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<BlogDialogComponent>,
    private commentService: CommentService,
    private blogService: BlogService
  ) {
    if (data.isUpdate) {
      this.isUpdate = true;
      this.form.patchValue({ title: data.blog.title, body: data.blog.body });
    } else {
      this.imageUrl = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.commentService.getComments().subscribe((response) => {
      this.commentData = response.filter(
        (x: any) => x.postId == this.data.blog.id
      );
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    const request = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,
    };
    this.blogService
      .updatePosts(this.data.blog.id, request)
      .subscribe((res) => {
        this.dialogRef.close();
      });
  }
}
