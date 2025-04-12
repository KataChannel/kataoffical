import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FarmComponent } from './farm/farm.component';
import { ShopComponent } from './shop/shop.component';
import { StatusComponent } from './status/status.component';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
    declarations: [AppComponent, FarmComponent, ShopComponent, StatusComponent, WalletComponent],
    imports: [BrowserModule, HttpClientModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {}
