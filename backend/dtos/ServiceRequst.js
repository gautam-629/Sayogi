class AllServiceRequest{
    id;
    title;
    charge;
    address;
    description;
    duration;
    avatar;
    name;
    createdAt;

    constructor(serviceRequest){
        this.id=serviceRequest._id;
        this.title=serviceRequest.title;
        this.charge=serviceRequest.charge;
        this.address=serviceRequest.address;
        this.description=serviceRequest.description;
        this.createdAt=serviceRequest.createdAt;
        this.name=serviceRequest.creator.name;
        this.avatar=this.avatar=serviceRequest.creator.avatar?`${process.env.BASE_URL}${serviceRequest.creator.avatar}`:null
    }
    
}
const mapServiceRequestToDTO=(serviceRequests)=>{
    return serviceRequests.map(serviceRequest=> new AllServiceRequest(serviceRequest))
}
export default mapServiceRequestToDTO;