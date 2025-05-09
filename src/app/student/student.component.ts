import { Component, inject, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {




  students: Student[] = [];

  formGroupStudent: FormGroup;

  isEditing: boolean = false;

  constructor(private service: StudentService,
    private FormBuilder: FormBuilder
  ) {
    this.formGroupStudent = FormBuilder.group(
      {
        id: [''],
        name: [''],
        course: ['']
      }
    )
  }


  ngOnInit(): void {
    this.loadStudents();


  }
  loadStudents() {
    this.service.getAll().subscribe({
      next: json => this.students = json
    })

  }
  onClicksave() {
    this.service.save(this.formGroupStudent.value).subscribe({
      next: json => {
        this.students.push(json);
        this.formGroupStudent.reset();
      }
    })
  }
  onClickdelete(student: Student) {
    this.service.delete(student).subscribe(
      {
        next: () => this.loadStudents()
      }
    );
  }
  onClickupdate(student: Student) {
    this.formGroupStudent.setValue(student);
    this.isEditing = true;
  }
  onClickconfirmupdate() {
    this.service.update(this.formGroupStudent.value).subscribe({
      next: () => {
        this.loadStudents();
        this.clear();
        this.isEditing = false;
      }

    });

  }
  onClickclear() {
    this.clear();
  }

  clear() {
    this.formGroupStudent.reset();
  }
}



