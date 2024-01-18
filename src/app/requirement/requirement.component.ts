import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../_Models/project.model';
import { HttpResponse } from '@angular/common/http';
import { UserAuthService } from '../_Services/user-auth.service';
import { Student } from '../_Models/student.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrl: './requirement.component.css'
})
export class RequirementComponent implements OnInit {

  UserRole?: string;
  Roles: any[] = []
  selectedFile: File | null = null;
  projectId?: string;
  project = new Project
  student = new Student();
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private userAuthService: UserAuthService,
    private toast: NgToastService,
    private router: Router
  ) { }


  getProjectById() {
    this.userService.getProjectById(this.projectId!).subscribe(res => {
      this.project = res
      console.log(this.project)
    })

  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  downloadDocument() {

    this.userService.downloadDocument(this.projectId!).subscribe((response) => {
      this.handleFileDownload(response);
    });
  }

  private handleFileDownload(response: HttpResponse<Blob>) {
    const contentDispositionHeader = response.headers.get('Content-Disposition');
    const fileName = contentDispositionHeader
      ? contentDispositionHeader.split(';')[1].trim().split('=')[1]
      : this.project.document.title + '.pdf';

    const blob = new Blob([response.body!], { type: 'application/pdf' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  uploadDocument(): void {
    console.log(this.selectedFile)


    if (this.selectedFile) {
      this.userService.uploadDocument(this.projectId!, this.selectedFile).subscribe(
        response => {
          console.log('Upload successful', response);
          this.getProjectById()
        },
        error => {
          console.error('Error uploading document', error);
        }
      );
    } else {
      console.warn('No file selected');
    }
  }

  getRole() {
    this.Roles = this.userAuthService.getRoles();
    if (this.Roles.length > 0) {
      this.UserRole = this.Roles[0].roleName;
      console.log(this.UserRole)

    }
  }

  getUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.UserRole == "Student") {
        this.userService.getStudentByName(this.userAuthService.getSubjectFromToken())
          .subscribe(
            (res) => {
              this.student = res;
              console.log(this.student);
              resolve();
            },
            (error) => {
              console.error("Error getting user:", error);
              reject(error);
            }
          );
      } else {
        resolve();
      }
    });
  }


  async LeaveProject() {
    try {
      await this.getUser();
      this.userService.leaveProject(this.projectId!, this.student.id!).subscribe(res => {
        console.log(res);
        this.toast.success({
          detail: "Success",
          summary: "Project Left Successfully"
        })
        this.router.navigateByUrl('/projects');
      });
    } catch (error) {
      console.error("Error getting user:", error);
    }
  }

  async validateDocument() {
    try {
      const res = await this.userService.validateDocument(this.projectId!).toPromise();
      console.log(res);

      this.toast.success({
        detail: "Success",
        summary: "Document Validated Successfully"
      });

      this.getProjectById();
    } catch (error) {
      console.error('Error validating document', error);
    }
  }




  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getRole();
    this.getProjectById();
  }

}
