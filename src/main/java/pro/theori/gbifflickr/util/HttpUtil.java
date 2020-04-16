package pro.theori.gbifflickr.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public interface HttpUtil {

    static String urlEncodeUTF8(String s) {
        try {
            return URLEncoder.encode(s, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new UnsupportedOperationException(e);
        }
    }
}
