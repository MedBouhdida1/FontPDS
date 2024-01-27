import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Stage } from '../_Models/stage.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8282/api/v1';

  sharedData: string = ""

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
    return this.http.get(`${this.baseUrl}/projects/${projectId}/stages`);
  }

  // Get stage by ID
  getStage(stageId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/stages/${stageId}`);
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
    return this.http.get<Comment[]>(`${this.baseUrl}/projects/stages/${stageId}/comments`);
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

  //get Supervisor by name
  getSupervisorByName(name: string) {
    return this.http.get(`${this.baseUrl}/supervisors/${name}/name`);
  }

  uploadDocument(projectId: string, pdfFile: File) {
    const formData: FormData = new FormData();
    formData.append('pdf', pdfFile, pdfFile.name);

    const url = `${this.baseUrl}/projects/${projectId}/document`;

    return this.http.post(url, formData, { responseType: 'text' })
  }


  //leave a project 
  leaveProject(projectId: string, studentid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${studentid}/projects/${projectId}`, { responseType: 'text' });
  }


  validateDocument(projectId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/document/${projectId}`, null, { responseType: 'text' });
  }

  addStage(projectId: string, stage: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects/${projectId}/stages`, stage, { responseType: 'text' });
  }


  deleteStage(stageId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/stages/${stageId}`, { responseType: 'text' });
  }

  addTask(stageId: string, task: any, studentId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/students/${studentId}/stages/${stageId}/tasks`, task, { responseType: 'text' });

  }

  getTasksByStageId(stageId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects/stages/${stageId}/tasks`);
  }


  updateTaskState(projectId: string, taskId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${projectId}/tasks/${taskId}`, null, { responseType: 'text' });
  }


  deleteTask(taskId: string, stageId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/stages/${stageId}/tasks/${taskId}`, { responseType: 'text' });
  }

  addComment(supervisorId: string, stageId: string, comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/supervisors/${supervisorId}/stages/${stageId}/comments`, comment, { responseType: 'text' });
  }

  setTaskPending(projectId: string, taskId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${projectId}/tasks/${taskId}/pending`, null, { responseType: 'text' });
  }


} 
