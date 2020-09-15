import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import {YoutubeService} from "app/entities/mis-paginas/youtube.service";
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

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
  private youtubeService: YoutubeService,
  ) {}

  ngOnInit() {
    this.accountService.identity().then((account: Account) => {
      this.account = account;
    });
    this.registerAuthenticationSuccess();
  }

  // youtube() {
  //
  //
  //   this.youtubeService.playList().subscribe(res => {
  //     this.eventManager.broadcast({
  //       name: 'providenciaRechaza',
  //       content: 'Providencia solicitud rechaza??'
  //     });
  //
  //   });
  // }

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
