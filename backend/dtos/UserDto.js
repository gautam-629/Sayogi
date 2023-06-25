class UserDto{
    id;
    phoneNumber;
    name;
    avatar;
    activated;
    createdAt;
    title;
    address;
    charge;
    experience;
    duration;
    email;
    cv;
    skills;
constructor(user){
    this.id=user._id;
    this.name=user.name;
    this.title=user.title;
    this.address=user.address;
    this.charge=user.charge;
    this.experience=user.experience;
    this.email=user.email;
    this.rating=user.rating;
    this.duration=user.duration
    this.skills=user.skills
    this.avatar=user.avatar?`${process.env.BASE_URL}${user.avatar}`:null;
    this.phoneNumber=user.phoneNumber;
    this.cv=user.cv?`${process.env.BASE_URL}${user.cv}`:null;
    this.activated=user.activated;
    this.createdAt=user.createdAt;
}

}

// module.exports=UserDto;
export default UserDto;