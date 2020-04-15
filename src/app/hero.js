export default class Hero {
    constructor(id, name, description, imgUrl, sp) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imgUrl = imgUrl;
        this.superpower = function(){
            console.log(sp)
        }
    }


}