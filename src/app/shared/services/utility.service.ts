import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { DomSanitizer } from "@angular/platform-browser";
import { FormArray } from "@angular/forms";

@Injectable({
    providedIn: "root"
})
export class UtilityService {

    mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

    constructor(
        private readonly _domSanitizer: DomSanitizer
    ) { }

    push(list:any, item:any){
        list.push(item);
    }
    
    removeAllFormArray(formArray:FormArray){
        var length = formArray.value.length;
        for(var i = 0; i < length; i++){
            formArray.removeAt(0);
        }
    }
    /* #region  xoa theo idnex */
    removeAt(list:any, index:any, count?:number) {
        if (!count) count = 1;
        list.splice(index, count)
    }
    /* #endregion */

    /* #region  tim kiem va lay 1 gia tri trong object */
    findPick(arr:any, key:any, value:any, pick:any) {
        var found = _.find(arr, [key, value]);
        return found ? found[pick] : null;
    }
    /* #endregion */

    startsWith(str:string, value:any){
        if(!value) return true;
        return  _.startsWith(str, value);
    }

    find(arr:any, value:any) {
        return _.find(arr, item => {
            return item == value;
        });
    }


    findValueOject(arr:any, key:any, value:any) {
        return _.find(arr, [key, value]);
    }

  
    filter(arr:any, value:any) {
        return _.filter(arr, item => {
            return item == value;
        });
    }

    filterValueObjectCheckLength(arr:any, key:any, value:any, number?:number){
        if(!number) number = 0;
        return _.filter(arr, [key, value]).length > number;
    }

    filterValueObject(arr:any, key:any, value:any) {
        return _.filter(arr, [key, value]);
    }

    filterContains(arr:any, key:any, value:any) {
        if (!value) return arr;
        return _.filter(arr, item => {
            if (item[key]) {
                return this.convertViToEng(JSON.stringify(item[key])).toLowerCase().indexOf(this.convertViToEng(value.toLowerCase())) != -1;
            }
            return false;
        })
    }

    copy(data:any) {
        return _.cloneDeep(data);
    }

    convertViToEng(str:string) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        return str;
    }

    subString(str:string, from:any, to?:any){
        to = !to ? 0 : to;
        if(!str || str == '') return '';
        if(str.length < from) return str;
        return str.substring(to, from) + '...';
    }

    safeCode(code:any) {
        return this._domSanitizer.bypassSecurityTrustHtml(code);
    }

    formatNumber(value:any) {
        if (!value || value == '') return null;
        var v = value.tostring();
        return v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }

    docSo(so:number, currency?:any) {

        if (so == 0 || !so)
            return currency ? this.mangso[0] + ' đồng' : this.mangso[0];
        var chuoi = "", hauto = "";
        do {
            var ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = this.dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = this.dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);

        if (currency) chuoi += ' đồng';
        return chuoi;
    }

    private dochangchuc(so:number, daydu:any) {
        var chuoi = "";
        var chuc = Math.floor(so / 10);
        var donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + this.mangso[chuc] + " mươi";
            if (donvi == 1) {
                chuoi += " mốt";
            }
        } else if (chuc == 1) {
            chuoi = " Mười";
            if (donvi == 1) {
                chuoi += " một";
            }
        } else if (daydu && donvi > 0) {
            chuoi = " Lẻ";
        }
        if (donvi == 5 && chuc > 1) {
            chuoi += " lăm";
        } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            chuoi += " " + this.mangso[donvi];
        }
        return chuoi;
    }

    private docblock(so:number, daydu:any) {
        var chuoi = "";
        var tram = Math.floor(so / 100);
        so = so % 100;
        if (daydu || tram > 0) {
            chuoi = " " + this.mangso[tram] + " trăm";
            chuoi += this.dochangchuc(so, true);
        } else {
            chuoi = this.dochangchuc(so, false);
        }
        return chuoi;
    }

    private dochangtrieu(so:number, daydu:any) {
        var chuoi = "";
        var trieu = Math.floor(so / 1000000);
        so = so % 1000000;
        if (trieu > 0) {
            chuoi = this.docblock(trieu, daydu) + " triệu";
            daydu = true;
        }
        var nghin = Math.floor(so / 1000);
        so = so % 1000;
        if (nghin > 0) {
            chuoi += this.docblock(nghin, daydu) + " nghìn";
            daydu = true;
        }
        if (so > 0) {
            chuoi += this.docblock(so, daydu);
        }
        return chuoi;
    }

    convertUndefinedToNull(obj:any){
        if(obj){
            var listKey = Object.keys(obj).map(m => m);
            _.each(listKey, key => {
                if (typeof obj[key] === "undefined") {
                    obj[key] = null;
                }
            })
        }
    }
}
