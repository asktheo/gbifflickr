package pro.theori.gbifflickr.media.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class FlickrPhoto {

    @Id
    private ObjectId _id;

    private Long id;
    private String owner;
    private String secret;
    private String server;
    private Integer farm;
    private String title;
    private Short ispublic;
    private Short isFriend;
    private Short isFamily;
    private String tags;
    private String media;
    private String media_status;

}
