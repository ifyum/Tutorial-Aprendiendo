import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import {YoutubeService} from "app/home/youtube.service";
import {IPlayList} from "app/shared/model/youtube.model";

@Component({
  selector: 'jhi-home',
  templateUrl: './canal.component.html',
  styleUrls: ['home.scss']
})
export class CanalComponent implements OnInit, OnDestroy {
  account: Account;
  authSubscription: Subscription;
  modalRef: NgbModalRef;
  videos: any[];
  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private youtubeService: YoutubeService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();

      this.spinner.show()
      setTimeout(()=>
      {
        this.spinner.hide()
      },3000)
      this.videos = [];
      this.youtubeService
        .getVideosForChanel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(lista => {
          for (let element of lista["items"]) {
            this.videos.push(element)
          }
        });


  }

  youtube() {


    this.youtubeService.getVideosForChanel("ifyum",50).subscribe(res => {
      this.eventManager.broadcast({

      });

    });
  }

  registerAuthenticationSuccess() {
    this.authSubscription = this.eventManager.subscribe('authenticationSuccess', message => {
      this.accountService.identity().then(account => {
        this.account = account;
      });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  login() {
    this.modalRef = this.loginModalService.open();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.eventManager.destroy(this.authSubscription);
    }
  }
}
