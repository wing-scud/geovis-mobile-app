class RowSource{
    constructor(fields,rows){
        this._fields = fields;
        this._rows = rows;
    }


    get lonKey(){
    }

    get lonIndex(){
        return this._fields.indexOf(this._lonKey);
    }


    get latKey(){

    }

    get latIndex(){

    }

    set lonkey(){

    }

    set latKey(){

    }
}