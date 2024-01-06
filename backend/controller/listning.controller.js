import Listing from '../models/listing.model.js';

export const createListning = async (req, res,next) => {

    try{

        const listing = await Listing.create(req.body);
    }catch(error){
        next(error);
    }

}