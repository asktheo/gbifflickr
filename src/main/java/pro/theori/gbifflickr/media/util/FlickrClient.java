package pro.theori.gbifflickr.media.util;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.bson.internal.Base64;
import org.springframework.stereotype.Service;
import pro.theori.gbifflickr.media.model.FlickrPhoto;
import pro.theori.gbifflickr.media.model.FlickrPhotoSearchResponse;
import pro.theori.gbifflickr.media.model.PhotoOutput;
import pro.theori.gbifflickr.util.HttpUtil;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;


@Service
@Slf4j
public class FlickrClient {

    private CloseableHttpClient client;
    private static String API_URL = "https://www.flickr.com/services/rest/?";
    private static String PHOTO_URL_TEMPLATE = "https://static.flickr.com/%s/%d_%s_%s.jpg";
            // example: https://static.flickr.com/65535/49634112462_81536eb01e_n.jpg



    //callback for http client
    ResponseHandler searchResponseHandler = httpResponse -> {
        Gson gson = new Gson();
        InputStream stream = httpResponse.getEntity().getContent();
        String result = IOUtils.toString(stream, StandardCharsets.UTF_8);
        FlickrPhotoSearchResponse response = gson.fromJson(result, FlickrPhotoSearchResponse.class);
        log.info("{}}: {}", response.getPhotos(), response.getStat());
        return response;
    };

    /**
     * example : // https://www.flickr.com/services/rest/?method=flickr.photos.search
     * &api_key=ac2ef27f9d4916926286daf978b7259d
     * &user_id=149662505@N04
     * &tags=asio, flammeus
     * &tag_mode=all
     * &format=json
     * &nojsoncallback=1
     * &extras=media, tags
     * @param userId
     * @param tags
     * @return
     */
    public FlickrPhotoSearchResponse search(String userId, List<String> tags) throws IOException{

        client = HttpClientBuilder.create().build();
        HashMap<String,String> params = new HashMap<>();
        params.put("method", "flickr.photos.search");
        params.put("api_key",System.getenv("FLICKR_API_KEY"));
        params.put("user_id", userId);
        params.put("tags", String.join(",+", tags));
        params.put("tag_mode", "all");
        params.put("content_type", "1"); //photos only
        params.put("format", "json");
        params.put("nojsoncallback", "1");
        params.put("extras", "media%C20+tags");

        String url = API_URL + params.entrySet().stream()
                .map(p -> p.getKey() + "=" + p.getValue())
                .reduce((p1, p2) -> p1 + "&" + p2)
                .orElse("");

        HttpGet request = new HttpGet(url);
        FlickrPhotoSearchResponse response = null;

        try{
            response = (FlickrPhotoSearchResponse) client.execute(request, searchResponseHandler);
        }catch (Exception ex){
            log.error(ex.getMessage());
            client.close();
        }finally {
            return response;
        }

    }

    //callback for http client photo request
    ResponseHandler photoResponseHandler = httpResponse -> {
        InputStream is = httpResponse.getEntity().getContent();
        byte[] imageBytes = IOUtils.toByteArray(is);
        String imageStr = Base64.encode(imageBytes);

        log.info("image read: {} bytes", imageBytes.length);

        return imageStr;
    };

    public PhotoOutput flickrPhotoBase64(FlickrPhoto flickrPhoto) throws IOException {

        client = HttpClientBuilder.create().build();
        String photoUrl = String.format(PHOTO_URL_TEMPLATE,
                flickrPhoto.getServer(),
                flickrPhoto.getId(),
                flickrPhoto.getSecret(),
                "n"
        );

        HttpGet request = new HttpGet(photoUrl);
        String base64Output = null;

        try{
            base64Output = (String) client.execute(request, photoResponseHandler);
        }catch (Exception ex){
            log.error(ex.getMessage());
            client.close();
        }finally {
            if(base64Output != null){
                return new PhotoOutput(flickrPhoto.getId(),flickrPhoto.getOwner(),base64Output);
            }
            else return null;
        }
    }

}
