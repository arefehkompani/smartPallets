module.exports = new class station {

    stations() {
        return [
            {
                id : 1,
                name : 'سنگ ابزار',
            },
            {
                id : 2,
                name : 'تراشکاری',
            },
            {
                id : 3,
                name : 'عملیات حرارتی',
            },
            {
                id : 4,
                name : 'فولادزنی',
            },
        ]
    }

    find_station(id){
        let res = this.stations().filter(rows => id == rows.id);
        return res ? res[0] : null
    }
    
}