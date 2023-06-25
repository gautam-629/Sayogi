class AllUser {
  constructor(user) {
    this.id = user._id;
    this.title = user.title;
    this.address = user.address;
    this.charge = user.charge;
    this.experience = user.experience;
    this.email = user.email;
    this.cv = user.cv ? `${process.env.BASE_URL}${user.cv}` : null;
    this.phoneNumber = user.phoneNumber;
    this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}` : null;
    this.name = user.name;
    this.rating = user.rating;
  }
}

const mapUserDTO = (user) => {
  return user.map((user) => new AllUser(user));
};

export default mapUserDTO;
