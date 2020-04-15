package pro.theori.gbifflickr.user.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import pro.theori.gbifflickr.user.model.GbifFlickrUser;

public interface UserRepository extends MongoRepository<GbifFlickrUser, ObjectId> {
}
