import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Initiative } from 'src/app/user/models/initiative';
import { UserserviceService } from 'src/app/user/services/userservice.service';

@Component({
  selector: 'app-view-my-invitations',
  templateUrl: './view-my-invitations.component.html',
  styleUrls: ['./view-my-invitations.component.css']
})
export class ViewMyInvitationsComponent implements OnInit {
  initi: Initiative = new Initiative();
  data:Initiative[] = [] ;
  constructor(private route: ActivatedRoute,private serv:UserserviceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(t => {
      let Id = +t.get('id');
      this.serv.getInitiativeById(Id).subscribe(data => {
        console.log(data);
        this.data = data;
      }, error => {
        console.log(error);

      });

    });
  }

}
