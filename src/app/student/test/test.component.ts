import { Component, OnInit } from '@angular/core';
import { StudentServices } from '../Services/student-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {



  constructor(
    private studentService: StudentServices,
  ) { }
  ngOnInit(): void {

    this.studentService.getStudentById("1").subscribe(res => {
      console.log(res);
    })
  }




}
