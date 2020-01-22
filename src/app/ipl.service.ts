import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IplService {

  players:PlayerDetails[];
  summaryList:TeamSummary[] = [];
  constructor(private http:HttpClient) {
      this.initPlayerSummaryDetails();
      
  }

  teamDetails():Observable<TeamDetails[]>{
      return this.http.get<TeamDetails[]>("./assets/teams.json");
  }
   
  initPlayerSummaryDetails(){
      this.http.get<PlayerDetails[]>("./assets/all_players.json")
      .subscribe(data=>{
          this.players = data;
          this.getSummaryDetails();
      })
  }

  getSummaryDetails(){
    let team_map = new Map();
    for(let player of this.players){
        let team = player.label;
        if(team_map.get(team) == null ){
            let arr = [player];
            team_map.set(team,arr);
        }else{
          let arr = team_map.get(team);
          arr.push(player);
          team_map.set(team,arr);
        }
    }
    
    team_map.forEach((v,k)=>{
        let team = k;
        let arr = this.findMaxMinTotalAmout(v);
        let minAmount = arr[0];
        let maxAmount = arr[1];
        let amount = arr[2];
        let tSummary = {"label":team,"amount":amount,"minAmount":minAmount,"maxAmount":maxAmount};
        this.summaryList.push(tSummary);
    });
     
  }

  findMaxMinTotalAmout(a_players:PlayerDetails[]){
      let minmaxtotal=[]
      let min=a_players[0].price;
      let max=a_players[0].price;
      let total = 0;
      for(let p of a_players){
         if(max  < p.price){
            max = p.price;
          }
          if(min  > p.price){
            min = p.price;
          }
          total += p.price;
      }
      minmaxtotal.push(min);
      minmaxtotal.push(max);
      minmaxtotal.push(total)
      return minmaxtotal;
  }
  
  getSummaryList(){
    return this.summaryList;
  }

}
