import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AddRuleComponent } from './addRule/add-rule.component';
import { ListRuleComponent } from './list-rule/list-rule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RuleRoutingModule } from './rule-routing.module';
import { ServiceService } from './service.service';
import { EditObjetComponent } from './edit-objet/edit-objet.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditParameterComponent } from './edit-parameter/edit-parameter.component';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    AddRuleComponent,
    ListRuleComponent,
    EditObjetComponent,
    EditParameterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    RouterModule,  
    HttpClientModule, 
    ReactiveFormsModule,
    RuleRoutingModule,
    MatDialogModule,
    MatDialogModule,
    
    


  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    AddRuleComponent,
    ListRuleComponent
  ],
  providers:[ServiceService,
    // Ajoutez votre intercepteur aux fournisseurs ici
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class RuleModule { }
