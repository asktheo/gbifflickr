package pro.theori.gbifflickr.media.model;

import lombok.Data;

@Data
public class PhotoOutput {
    private String base64Str;
    private String userId;
    private Long photoId;

    public PhotoOutput(Long photoId, String userId,String base64Str){
        this.photoId = photoId;
        this.userId = userId;
        this.base64Str = base64Str;
    }
}
