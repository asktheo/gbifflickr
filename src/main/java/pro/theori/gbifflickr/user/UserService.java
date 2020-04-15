package pro.theori.gbifflickr.user;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pro.theori.gbifflickr.user.model.GbifFlickrUser;
import pro.theori.gbifflickr.user.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    private static UserService service;

    @Autowired
    private UserRepository userRepository;

    public GbifFlickrUser getUserById(String userId){
        ObjectId userObjectId = new ObjectId(userId);

        Optional<GbifFlickrUser> user = userRepository.findById(userObjectId);
        return user.get();
    }
}
