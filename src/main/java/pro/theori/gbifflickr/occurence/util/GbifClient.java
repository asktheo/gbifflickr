package pro.theori.gbifflickr.occurence.util;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;
import pro.theori.gbifflickr.occurence.model.OccurenceResponse;
import pro.theori.gbifflickr.util.HttpUtil;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

@Service
@Slf4j
public class GbifClient {

    private CloseableHttpClient client;
    private String gbifSearchUrl = "http://api.gbif.org/v1/occurrence/search?";

    //callback for http client
    ResponseHandler responseHandler = httpResponse -> {
        Gson gson = new Gson();
        InputStream stream = httpResponse.getEntity().getContent();
        String result = IOUtils.toString(stream, StandardCharsets.UTF_8);
        OccurenceResponse response = gson.fromJson(result, OccurenceResponse.class);
        log.info("count: {}, offset: {}", response.getResults().size(),response.getOffset());
        return response;
    };

    public OccurenceResponse search(Integer offset, Integer limit, String recordedBy){
        client = HttpClientBuilder.create().build();
        HashMap<String,String> params = new HashMap<>();
        params.put("dataset_key",System.getenv("GBIF_DATASET_KEY"));
        params.put("offset", offset.toString());
        params.put("limit", limit.toString());
        params.put("recorded_by", recordedBy);

        String url = gbifSearchUrl + params.entrySet().stream()
                .map(p -> HttpUtil.urlEncodeUTF8(p.getKey()) + "=" + HttpUtil.urlEncodeUTF8(p.getValue()))
                .reduce((p1, p2) -> p1 + "&" + p2)
                .orElse("");

        HttpGet request = new HttpGet(url);
        OccurenceResponse response = null;
        try{
            response = (OccurenceResponse) client.execute(request, responseHandler);
        }catch (Exception ex){
            log.error(ex.getMessage());
            client.close();
        }finally {
            return response;
        }

    }


}
