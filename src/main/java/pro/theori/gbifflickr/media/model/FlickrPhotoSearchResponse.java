package pro.theori.gbifflickr.media.model;

import lombok.Data;

import java.util.List;

@Data
public class FlickrPhotoSearchResponse {
    private PhotoResponse photos;
    private String stat;

    @Data
    public class PhotoResponse {
        private Short page;
        private Short pages;
        private Short perpage;
        private Integer total;
        private List<FlickrPhoto> photo;
    }

}
