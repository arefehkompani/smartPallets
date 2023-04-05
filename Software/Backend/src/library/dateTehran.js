const moment = require('moment-timezone');
const jmoment = require('jalali-moment');

module.exports = new class dateTehran{
    show(timeUTC=null,format=null){
        return moment(timeUTC).tz('Asia/Tehran').format(format)
    }

    shamsi(date, format = 'YYYY/MM/DD'){
        let tehran = this.show(date)
        let t = this.show(date, 'HH:MM:ss') + " " + jmoment(tehran, 'YYYY/MM/DD').locale('fa').format(format)
        return t;
    }
}