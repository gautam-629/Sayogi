
class ServiceSeeker{
     name;
     phoneNumber;
     avatar;
     id;
     title;
     address;
     charge;
     experience;
     duration;
     email;
     cv;
     activated;
     createdAt;
     skills;
     constructor(serviceSeeker){
         this.id=serviceSeeker._id;
         this.title=serviceSeeker.title;
         this.address=serviceSeeker.address;
         this.charge=serviceSeeker.charge;
         this.experience=serviceSeeker.experience;
         this.email=serviceSeeker.email;
         this.cv=serviceSeeker.cv?`${process.env.BASE_URL}${serviceSeeker.cv}`:null;
         this.phoneNumber=serviceSeeker.user.phoneNumber;
         this.avatar=serviceSeeker.user.avatar?`${process.env.BASE_URL}${serviceSeeker.user.avatar}`:null
         this.name=serviceSeeker.user.name;
         this.rating=serviceSeeker.rating;
         this.duration=serviceSeeker.duration
         this.skills=serviceSeeker.skills
     }
}

export default ServiceSeeker;