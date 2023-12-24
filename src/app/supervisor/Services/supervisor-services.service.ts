import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../_Models/project.model';

@Injectable({
  providedIn: 'root'
})
export class SupervisorServicesService {


  baseUrl = "http://localhost:8282/api/v1";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' })

  constructor(private http: HttpClient) { }


  // Get all projects
  getAllProjects() {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }

  //getProjectssBySupervisorId
  getprojectsBySupervisorId(supervisorId: number) {
    return this.http.get<Project[]>(`${this.baseUrl}/supervisors/${supervisorId}/projects`);
  }



  //get Supervisor by name
  getSupervisorByName(name: string) {
    return this.http.get(`${this.baseUrl}/supervisors/${name}/name`);
  }


  //add project
  addProject(project: Project, supervisorId: number) {
    return this.http.post(`${this.baseUrl}/supervisors/${supervisorId}/projects`, project, { responseType: 'text' });
  }


  //delete project
  deleteProject(projectId: string) {
    return this.http.delete(`${this.baseUrl}/projects/${projectId}`, { responseType: 'text' });
  }




}
