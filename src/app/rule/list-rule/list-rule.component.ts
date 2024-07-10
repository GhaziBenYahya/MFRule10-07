import { Component, OnInit } from '@angular/core';
import { RuleDto } from '../models/rule-dto';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../TokenService';
import {IdWorkflowService} from '../IdWorkflowService'
import { Rule } from '../models/Rule';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-rule',
 templateUrl: './list-rule.component.html',
  styleUrls: ['./list-rule.component.css']
})
export class ListRuleComponent implements OnInit{
  RuleDto: RuleDto[] = [];
  
  constructor(private srvRule: ServiceService,private router: Router,private dialog: MatDialog,private tokenService: TokenService,private IdWorkflowService: IdWorkflowService){}


  nameStep:string=''
  rules:Rule[]=[]
  filteredRule: any[] = [];
  searchTerm: string = '';
  pageIndex = 1;
  pageSize = 5;
  ngOnInit(): void {
    console.log('succes')
    /* *****service partage ****  // Accédez aux données stockées dans le service partagé et affichez-les dans la console
    console.log('Token d\'accès service partagé: ', this.sharedDataService.getAccessToken()); */
    
   
    console.log('réception de Token dans MFE_Rule ',this.tokenService.getToken())
            //get name
            const NameStep = this.IdWorkflowService.getNameStep(); 
            console.log('name Step localStorage IdStep',NameStep);
            this.nameStep=NameStep
    
    
    
            //get allRule
            this.srvRule.getAllRule().subscribe((res: any) => {
    
              console.log(res)
              this.rules = res.filter((objet: { status: string; }) => objet.status != 'false');
              this.filteredRule = this.rules
              console.log("les rules:",this.rules)
            
            
             })
    
    }
    
    filterWorkflows(): void {
      this.filteredRule = this.rules.filter(rule => 
        rule.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    
    onPageChange(event: any): void {
      this.pageIndex = event.pageIndex + 1;
    }


    Ajouter(id:any){


      // envoyer le id de rule
      const IdRule = id;

      // Stockez le token dans localStorage
      localStorage.setItem('IdRule', IdRule);
      console.log('Id Rule  localStorage Rule',localStorage);




      // get IdWorkflow and navigat vers le workflow
      const IdWorkflow = this.IdWorkflowService.getIdWorkflow(); 
      console.log('id Workflow localStorage Workflow',IdWorkflow);
      const IdStep = this.IdWorkflowService.getIdStep(); 
      console.log('id IdStep localStorage IdStep',IdStep);
      const RankStep = this.IdWorkflowService.getRankStep(); 
      console.log('id IdStep localStorage IdStep',RankStep);

      
      // pour envoyer le ids 
      localStorage.setItem('IdStep', IdStep);
      localStorage.setItem('RankStep', RankStep);

      this.router.navigate(['/mfe1/orderComponent/create-flowComponent/',IdWorkflow]);



    }




      
    deleteRule(rule: Rule) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible et supprimera le régle.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        rule.status="false"
       // console.log("aaaaaaaaaaaaaaaaa",rule)
        this.srvRule.editRule(rule,rule.id)
          .subscribe(
            (result) => { 
              console.log(result);
              Swal.fire('Régle supprimé avec succès', '', 'success');
              window.location.reload();
            },
            (err) => {
              console.log(err);
              Swal.fire('Régle supprimé avec succès', '', 'success');
              window.location.reload();
            }
          );
      } else {
        Swal.fire('Suppression annulée', '', 'info');
      }
    });
  }

 }






