package pro.theori.gbifflickr.media;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pro.theori.gbifflickr.media.model.FlickrPhotoSearchResponse;
import pro.theori.gbifflickr.media.model.PhotoOutput;
import pro.theori.gbifflickr.media.util.FlickrClient;
import pro.theori.gbifflickr.user.UserService;
import pro.theori.gbifflickr.user.model.GbifFlickrUser;

import java.io.IOException;
import java.util.*;

@RestController
@Slf4j
public class MediaController {

    @Autowired
    FlickrClient flickrClient;

    @Autowired
    UserService userService;

    @RequestMapping("/media/by/user/{userId}")
    List<PhotoOutput> mediaByUser(
            @PathVariable(value="userId") String userId,
            @RequestParam(value="tags", defaultValue="") String tags
    ) throws IOException {

        GbifFlickrUser user = userService.getUserById(userId);
        if(user != null) {
            String flickUser = user.getFlickUser();
            List<String> tagsList = Arrays.asList(tags.split(","));
            FlickrPhotoSearchResponse response = flickrClient.search(flickUser, tagsList);
            ArrayList<PhotoOutput> photoOutputs = new ArrayList<>();
            response.getPhotos().getPhoto().parallelStream().forEach(ph -> {
                try {
                    PhotoOutput output = flickrClient.flickrPhotoBase64(ph);
                    photoOutputs.add(output);
                }
                catch (IOException ex){
                    log.error(ex.getMessage());
                }
            });

            return photoOutputs;
        }
        return new ArrayList<>();
    }
}
