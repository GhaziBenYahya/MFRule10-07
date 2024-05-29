import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdWorkflowService {
  getIdWorkflow(): string | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('IdWorkflow');
  }
  getIdStep(): any | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('IdStep');
  }
  getRankStep(): any | null {
    // Récupérer le jeton à partir du localStorage
    return localStorage.getItem('RankStep');
  }

}