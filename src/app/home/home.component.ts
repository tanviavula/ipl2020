import { Component, OnInit } from '@angular/core';
import { IplService } from '../ipl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  teamDetails:TeamDetails[];
  constructor(private iplService:IplService) { }
  summaryList:TeamSummary[]=[];
  ngOnInit() {
      this.iplService.teamDetails().subscribe(data=>{
          this.teamDetails = data;
      })
      this.summaryList = this.iplService.getSummaryList();

  }

}
