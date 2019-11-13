export interface User {
    email:string;
    password:string;
    nickname:string;
    name:string;
    surname:string;
    birthdate: Date;
    description:string;
    instagram:string;
    facebook:string;
    twitter:string;
}

export class User {
    email:string;
    password:string;
    nickname:string;
    name:string;
    surname:string;
    birthdate: Date;
    description:string;
    instagram:string;
    facebook:string;
    twitter:string;
  
    constructor(email:string, password:string, nickname:string, name:string, surname:string, birthdate: Date, description:string, instagram:string, facebook:string, twitter:string){
      this.email = email;
      this.password = password;
      this.nickname = nickname;
      this.name = name;
      this.surname = surname;
      this.birthdate = birthdate;
      this.description = description;
      this.instagram = instagram;
      this.facebook = facebook;
      this.twitter = twitter;
    }
  }