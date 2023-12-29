import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.baseUrl}/${projectId}`);
  }

  // Get stages by project ID
  getStagesByProjectId(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${projectId}/stages`);
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
  downloadDoc(projectId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf',
    });

    return this.http.get(`${this.baseUrl}/${projectId}/document`, {
      responseType: 'blob',
      headers: headers,
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


} 
