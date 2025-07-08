import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InterService } from '../getfromAPI/international.service';
import { StyleStats } from '../const/style-stats.model';
import { CustomerStats } from '../const/customerStats';

@Component({
  selector: 'app-tableau',
  imports:[NgFor],
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit {
  styles: { name: string; stats: StyleStats }[] = [];
  customers: { name: string; stats: CustomerStats }[] = [];

  constructor(private interService: InterService) {}

  ngOnInit(): void {
    this.interService.getProduitRevenue().subscribe(data => {
      this.styles = Object.entries(data).map(([key, value]) => ({
        name: key,
        stats: value
      }));
    });
    this.interService.getCustomerMTtotal().subscribe(data => {
      this.customers = Object.entries(data).map(([key, value]) => ({
        name: key,
        stats: value
      }));
    });
    
  }
}
