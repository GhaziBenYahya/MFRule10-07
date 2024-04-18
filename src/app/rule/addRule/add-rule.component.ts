import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ServiceService } from '../service.service';
import { RuleDto } from '../models/rule-dto';
import { ParamDto } from '../models/param-dto';
import { ObjectDto } from '../models/object-dto';
import { Rule, RuleObjet } from '../models/Rule';
import { MatDialog } from '@angular/material/dialog';
import { EditObjetComponent } from '../edit-objet/edit-objet.component'; // Importez votre composant edit-objet
import { EditParameterComponent } from '../edit-parameter/edit-parameter.component';
import { SharedDataService } from 'C:/Users/dell/Desktop/INSY2S/ApresGit/front/MicroFrontendHost/src/app/auth/SharedDataService'
import { TokenService } from '../TokenService'



@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css'],
  //standalone: true,
  //imports: [FormsModule, CommonModule, NgClass, NgFor]
})
export class AddRuleComponent implements OnInit {
  
    token: string | null | undefined;

  // constructor( private srvParam: ParamService ,private srvRule: RuleService,private router: Router,){}
  constructor(private srvRule: ServiceService,private router: Router,private dialog: MatDialog,private sharedDataService: SharedDataService,private tokenService: TokenService){}
     IdObje : any = 0;
   selectedObjectType: string = ''; 

  
  showAddFormulaButton: boolean = false;
  showFormulaInputs: boolean = false;
  showFormulaObjectInputs: boolean = false;

  showObjectInputs: boolean =false;
  //objects: { name: string, order: string }[] = [];
  selectedItem = '2';
  Rule1 : RuleDto=new RuleDto()

  
  


  //ParamDto: ParamDto =new ParamDto();
  

  
  
  // Autres propriétés...

 



    
  ngOnInit(): void {
console.log('succes')
/* *****service partage ****  // Accédez aux données stockées dans le service partagé et affichez-les dans la console
console.log('Token d\'accès service partagé: ', this.sharedDataService.getAccessToken()); */

// Récupérer le jeton à partir du service
this.token = this.tokenService.getToken();
console.log('réception de Token dans MFE_Rule ',this.tokenService.getToken())
}



  
  
  addRule(): void{
    // console.log(this.Rule);
    // this.srvRule.addRule(this.Rule)
    //   .subscribe(
    //     (result) => { // success
    //       console.log(result);

    //       this.router.navigate(['/mfe-rule/orderComponent/listRuleComponent']);
    //       Swal.fire('Valider', '', 'success');  
    //     },
    //     (_err) => {
    //       // traitement du cas d'erreur
    //      console.log('err');
    //       Swal.fire('Invalid ', '', 'error');
    //     }
      
    //     ); 
    this.router.navigate(['/mfe-rule/ruleComponent/listRuleComponent']);


  }

  
  objectDto: ObjectDto = new ObjectDto(this.selectedObjectType)
  onObjectTypeChange(event: Event) {
    this.selectedObjectType = (event.target as HTMLSelectElement).value;
    console.log(this.selectedObjectType)
    this.showFormulaInputs = false
    
  }

  //Formula for Add Objects
  onAddFormulaObjectClick( ): void {

    this.showFormulaObjectInputs = true;
  }
  //End
  

  onAddFormulaClick( ): void {

    this.showFormulaInputs = true;
  }





  /*******************************************************************Tableau des objet pour le regle ************************************************************************ */

  //tableau des objet de regle 
  ObjectDto: ObjectDto = new ObjectDto(this.selectedObjectType);
  Objects: ObjectDto[] = [];

  addObject(): void {
    // Créez une nouvelle instance d'ObjectDto avec les valeurs actuelles de ObjectDto
    let newObject: ObjectDto = {
      name: this.ObjectDto.name, content: this.ObjectDto.content,
      id:'' ,
      type: this.selectedObjectType,
      creationDate: undefined
    };
  
    // Enregistrez l'objet dans la base de données
    this.ObjectDto.type= this.selectedObjectType;
    this.srvRule.addObjet(this.ObjectDto)
      .subscribe(
        (result) => { // En cas de succès
          console.log(result);
          Swal.fire('Valider', '', 'success');  
          console.log('Data saved');
          newObject.id = result
        },
        (error) => { // En cas d'erreur
          console.log('Error:', error);
          Swal.fire('Erreur', '', 'error');
        }
      );
  
    // Ajoutez la nouvelle instance d'ObjectDto au tableau Objects
    this.Objects.push(newObject);
    console.log(this.Objects)
  
    // Réinitialisez ObjectDto pour effacer les champs de saisie
    this.ObjectDto = { name: '', content: '' ,type:this.selectedObjectType , id:'' ,creationDate:''};
  }
  
  //**********************************************End Tableau des objet pour le regle**************************************************************************** */ 


//*********************************************************************Add Rule With Objects************************************************************************************************************************ */
 ruleObjets: RuleObjet[] = [];
ruleObjet = new RuleObjet('','')

 rule = new Rule(
  '',
  '',
  '',
  '',
  this.ruleObjets
);
Formule1: string = '';
//methode test
addRuleWithObjectstest(): void {
  // Liste pour stocker les RuleObjet
  const ruleObjets: RuleObjet[] = [];

    // Chaîne de caractères pour stocker les noms des ObjectDTO
    let Formule = '';

  // Parcourir le tableau d'objets ObjectDTO
  this.Objects.forEach((objectDTO, index) => {
    // Créer un RuleObjet à partir de l'ObjectDTO en cours de traitement
    const ruleObjet = new RuleObjet(objectDTO.id, index + 1); // Utilisez index + 1 comme rank

    // Ajouter le RuleObjet à la liste
    ruleObjets.push(ruleObjet);

        // Concaténer le nom de l'ObjectDTO à la chaîne de caractères
    // Concaténer le nom ou le contenu de l'ObjectDTO à la chaîne de caractères
    if (objectDTO.type === 'Operateur') {
      Formule += objectDTO.content + ' ';
    } else {
      Formule += objectDTO.name + ' ';
    }
  });

  // Afficher la liste de RuleObjet pour vérification
  
  this.Formule1 =Formule
  // Maintenant, tretement de Rule
  this.rule.formula=Formule
  this.rule.ruleObjets = ruleObjets
  console.log('Le Rule :', this.rule);

  // Enregistrez l'objet dans la base de données
   this.srvRule.addRuleWithObjects(this.rule)
    .subscribe(
      (result) => { // En cas de succès
        console.log(result);
        Swal.fire('Valider', '', 'success');  
        console.log(result);
       

   // Vider le tableau Parametres
  //this.Parametres.splice(0, this.Parametres.length);

      },
      (error) => { // En cas d'erreur
        console.log('Error:', error);
        Swal.fire('Erreur', '', 'error');
      }
    ); 
}
//fin methode test 




//*******************************************************************End Add Rule With Objects ************************************************************************************** */




























  //**********************************************AddObjectVAR---WithParameter**************************************************** */
  addObjectWithParametertest(): void {
    // Utilisez le tableau Parametres dans cette méthode
    console.log(this.Parametres);
        // Parcourir le tableau Parametres
        for (let i = 0; i < this.Parametres.length; i++) {
          // Attribuer à chaque ParamDto.objet.id la valeur i
          this.Parametres[i].objet.id = i;
        }
    
        // Afficher les Parametres mis à jour
        console.log(this.Parametres);
      
    
    // Ajoutez votre logique pour utiliser les Parametres ici
  }
  
  
  
  
  addObjectWithParameter(): void {
    // Créez une nouvelle instance d'ObjectDto avec les valeurs actuelles de ObjectDto
    const newObject: ObjectDto = {
      name: this.ObjectDto.name, content: this.ObjectDto.content,
      id: undefined,
      type: this.selectedObjectType,
      creationDate: undefined
    };
    
    // Enregistrez l'objet dans la base de données
    this.ObjectDto.type= this.selectedObjectType;
    this.srvRule.addObjet(this.ObjectDto)
      .subscribe(
        (result) => { // En cas de succès
          console.log(result);
          Swal.fire('Valider', '', 'success');  
          console.log(result);
          newObject.id=result
              // Parcourir le tableau Parametres
              for (let i = 0; i < this.Parametres.length; i++) {
              // Attribuer à chaque ParamDto.objet.id la valeur i
                this.Parametres[i].objet.id = result;

                //Save Parameter in DB
                this.srvRule.addParameter(this.Parametres[i])
                  .subscribe(
                     (result) => { // success
                        console.log(result);       
                       // Swal.fire('Valider', '', 'success');  
                        console.log('data saved');
                        // window.location.reload();
                      },
                      (_err) => {
                        // traitement du cas d'erreur
                        console.log('err');
                        Swal.fire('Invalid Parameter', '', 'error');
                                }
    
                               ); 

              }
     // Vider le tableau Parametres
    this.Parametres.splice(0, this.Parametres.length);

        },
        (error) => { // En cas d'erreur
          console.log('Error:', error);
          Swal.fire('Erreur', '', 'error');
        }
      );
  
    // Ajoutez la nouvelle instance d'ObjectDto au tableau Objects
    this.Objects.push(newObject);
  
    // Réinitialisez ObjectDto pour effacer les champs de saisie
    this.ObjectDto = { name: '', content: '' ,type:this.selectedObjectType , id:'' ,creationDate:''};
  }
  
//********************************************************End AddObjectWithParameter****************************************************************** */















//*******************************************************************Tableau des paramters de regle ************************************************************************************** */
ParamDto: ParamDto = new ParamDto('', '', 0, 0); // Initialisation de ParamDto avec des valeurs par défaut
Parametres: ParamDto[] = [];

AddParamteter(): void {
  // Créez une nouvelle instance d'ObjectDto avec les valeurs actuelles de ObjectDto
  const newParamDto = new ParamDto(
    this.ParamDto.name,
    this.ParamDto.content,
    this.ParamDto.rank, // Assurez-vous de convertir rank en nombre si nécessaire
    this.ParamDto.objet.id) // ID de l'objet, vous devez fournir cette valeur ici
    
    
  

  // Enregistrez l'objet dans la base de données
/*   this.ObjectDto.type= this.selectedObjectType;
  this.srvRule.addObjet(this.ObjectDto)
    .subscribe(
      (result) => { // En cas de succès
        console.log(result);
        Swal.fire('Valider', '', 'success');  
        console.log('Data saved');
      },
      (error) => { // En cas d'erreur
        console.log('Error:', error);
        Swal.fire('Erreur', '', 'error');
      }
    ); */

  // Ajoutez la nouvelle instance d'ObjectDto au tableau Objects
  this.Parametres.push(newParamDto);

  // Réinitialisez ObjectDto pour effacer les champs de saisie
  this.ParamDto = new ParamDto('', '', 0, 0);
    }
//*******************************************************************End Tableau des paramters de regle ************************************************************************************** */




//*****************************************************************Supprimer un Parametre******************************************************** */
deleteParametre(index: number): void {
 

  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Cette action est irréversible et supprimerade parametre.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // L'utilisateur a cliqué sur "Oui, supprimer"
      this.Parametres.splice(index, 1); // Supprimez l'élément à l'index spécifié

   
    } else {
      // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
      Swal.fire('Suppression annulée', '', 'info');
    }
  });
}
//*****************************************************************End Supprimer un Parametre******************************************************** */


//*****************************************************************Supprimer un Parametre******************************************************** */
deleteObject(index: number , idObjet: any): void {
  // Afficher un message d'alerte de confirmation avant la suppression
   Swal.fire({
     title: 'Êtes-vous sûr?',
     text: 'Cette action est irréversible et supprimera l Objet.',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonText: 'Oui, supprimer!',
     cancelButtonText: 'Annuler'
   }).then((result) => {
     if (result.isConfirmed) {
       // L'utilisateur a cliqué sur "Oui, supprimer"
       this.srvRule.deleteObjet(idObjet)
         .subscribe(
           (result) => { // succès
             console.log(result);
             Swal.fire('l objet est supprimée avec succès', '', 'success');
             //window.location.reload();
               //supprimez l'element de tableau
              this.Objects.splice(index, 1); // Supprimez l'élément à l'index spécifié
           },
           (err) => {
             // traitement du cas d'erreur//             console.log(err);
             Swal.fire('L objet est supprimée avec succès', '', 'success');
            // window.location.reload();
           }
         );
     } else {
       // L'utilisateur a cliqué sur "Annuler" ou a cliqué en dehors de la boîte de dialogue
       Swal.fire('Suppression annulée', '', 'info');
     }
   });


}
//*
//************************************************************Edit Objets********************************************************** */
openEditObjetDialog(objet: any): void {
  const dialogRef = this.dialog.open(EditObjetComponent, {
    width: '500px', // Largeur de la boîte de dialogue
    data: { objet } // Passer les données au composant edit-objet
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Boîte de dialogue fermée'); // Logique à exécuter après la fermeture de la boîte de dialogue
  });
}



//*************************************************************Fin Edit Objet************************************************************** */


//************************************************************Edit Parametres********************************************************** */
openEditParametreDialog(objet: any): void {
  const dialogRef = this.dialog.open(EditParameterComponent, {
    width: '500px', // Largeur de la boîte de dialogue
    data: { objet } // Passer les données au composant edit-objet
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Boîte de dialogue fermée'); // Logique à exécuter après la fermeture de la boîte de dialogue
  });
}



//*************************************************************Fin Edit Parametres************************************************************** */





















































































  //ObjectDto: ObjectDto = new ObjectDto(this.selectedObjectType);
  
  AddObjectClick(): void{

//save Object 
    this.ObjectDto.type= this.selectedObjectType;
    console.log(this.objectDto.type)
    console.log(this.ObjectDto);
    this.srvRule.addObjet(this.ObjectDto)
      .subscribe(
        (result) => { // success
          console.log(result);

          
          Swal.fire('Valider', '', 'success');  
          console.log('data saved');
          //window.location.reload();
        },
        (_err) => {
          // traitement du cas d'erreur
         console.log('err');
          Swal.fire('Invalid ', '', 'error');
        }
      
        ); 


  }


  
 
  AddObjet(): void{
    
    console.log(this.ObjectDto);
    //Ajouter un Objet 
    this.srvRule.addObjet(this.ObjectDto)
      .subscribe(
        (result) => { // success
          console.log(result);
           this.IdObje = result
           

          
          Swal.fire('Valider', '', 'success');  
          console.log('data saved');
         // window.location.reload();
        },
        (_err) => {
          // traitement du cas d'erreur
         console.log('err');
          Swal.fire('Invalid ', '', 'error');
        }
      
        ); 


  }
    //ParamDto: ParamDto = new ParamDto();

 /*  AddParam(): void{
    
    console.log(this.ObjectDto);
    //Ajouter un Param 
    this.srvRule.addParam(this.ParamDto)
      .subscribe(
        (result) => { // success
          console.log(result);
           

          
          Swal.fire('Valider', '', 'success');  
          console.log('data saved');
         // window.location.reload();
        },
        (_err) => {
          // traitement du cas d'erreur
         console.log('err');
          Swal.fire('Invalid ', '', 'error');
        }
      
        ); 

  }

 */

}