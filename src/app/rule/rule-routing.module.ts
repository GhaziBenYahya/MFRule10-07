import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddRuleComponent } from './addRule/add-rule.component';
import { RuleComponent } from './rule.component';
import { ListRuleComponent } from './list-rule/list-rule.component';


const ruleRoutes: Routes = [


  { path: '', redirectTo: 'ruleComponent/listRuleComponent', pathMatch: 'full' },

    {
        path: 'ruleComponent',
        component: RuleComponent,
        children:[
          {
            path: "addRuleComponent",
            component: AddRuleComponent
          },
          {
            path: 'listRuleComponent',
            component: ListRuleComponent
          },
          
        ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ruleRoutes)
  ]
})
export class RuleRoutingModule { }
