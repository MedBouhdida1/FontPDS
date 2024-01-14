import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../_Models/project.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrl: './requirement.component.css'
})
export class RequirementComponent implements OnInit {


  selectedFile: File | null = null;
  projectId?: string;
  project = new Project

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
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


  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.getProjectById();
  }

}
