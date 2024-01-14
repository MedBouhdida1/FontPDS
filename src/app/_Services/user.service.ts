import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8282/api/v1';

  constructor(
    private http: HttpClient,
  ) { }



  // Get all projects
  getAllProjects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects`);
  }


  // Get project by ID
  getProjectById(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/${projectId}`);
  }

  // Get stages by project ID
  getStagesByProjectId(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects${projectId}/stages`);
  }

  // Get stage by ID
  getStage(stageId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stages/${stageId}`);
  }

  // Get tasks by stage ID
  getTasksStage(stageId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/stages/${stageId}/tasks`);
  }

  // Get tasks by project ID
  getTasksProject(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${projectId}/tasks`);
  }

  // Get comments by stage ID
  getCommentsStage(stageId: string): Observable<any> {
    return this.http.get<Comment[]>(`${this.baseUrl}/stages/${stageId}/comments`);
  }

  // Download specification book PDF
  // downloadDoc(projectId: string): Observable<Blob> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/pdf',
  //     'Accept': 'application/pdf',
  //   });

  //   return this.http.get(`${this.baseUrl}/${projectId}/document`, {
  //     responseType: 'blob',
  //     headers: headers,
  //   });
  // }
  downloadDocument(projectId: string): Observable<HttpResponse<Blob>> {
    const url = `http://localhost:8080/api/v1/projects/${projectId}/document`;

    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  // Delete Project
  deleteProject(projectId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${projectId}`);
  }

  //enroll a project
  enrollProject(projectId: string, studentid: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/students/${studentid}/projects/${projectId}`, null, { responseType: 'text' });
  }


  //getStudentByName
  getStudentByName(name: string) {
    return this.http.get(`${this.baseUrl}/students/${name}/name`);
  }

  uploadDocument(projectId: string, pdfFile: File) {
    const formData: FormData = new FormData();
    formData.append('pdf', pdfFile, pdfFile.name);

    const url = `${this.baseUrl}/projects/${projectId}/document`;

    return this.http.post(url, formData, { responseType: 'text' })
  }


} 
