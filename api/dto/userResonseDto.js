class UserResponseDto{
    constructor({
        _id,
        fullname,
        profileImage,
        email,
        phone,
        dob,
        verified,
        country,
        province,
        city,
        about,
        overview,
        interests,
        skills,
    }){
        this._id = _id;
        this.fullname = fullname;
        this.profileImage = profileImage;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.verified = verified;
        this.country = country;
        this.province = province;
        this.city = city;
        this.about = about;
        this.overview = overview;
        this.interests = interests;
        this.skills = skills;
    }
}
module.exports = UserResponseDto;