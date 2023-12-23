import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServices {


  baseUrl = "http://localhost:8282/api/v1/";
  constructor(private http: HttpClient) { }



  getStudentById(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${studentId}`);
  }

  // Add stage to a Project
  addStage(projectId: string, stageDto: any): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/projets/${projectId}/stages`, stageDto);
  }

  // Upload specification book PDF
  uploadDoc(projectId: string, pdf: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('pdf', pdf, pdf.name);

    const headers = new HttpHeaders({
      'Accept': 'application/json',
    });

    return this.http.post<string>(`${this.baseUrl}/projets/${projectId}/document`, formData, { headers });

  }

  // Delete Stage
  deleteStage(stageId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/projets/stages/${stageId}`);
  }

  // Remove a task with stageId
  removeTaskStageById(stageId: string, taskId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/projets/stages/${stageId}/tasks/${taskId}`);
  }

  // Remove a task with projectId
  removeTaskProjectById(projectId: string, taskId: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${projectId}/projets/tasks/${taskId}`);
  }

  // Update task state
  updateTaskState(projectId: string, taskId: string): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${projectId}/projets/tasks/${taskId}`, {});
  }


}
