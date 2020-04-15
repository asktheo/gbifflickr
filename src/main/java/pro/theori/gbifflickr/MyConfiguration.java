package pro.theori.gbifflickr;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class MyConfiguration {
    private static String Cors_Allowed_Origins;
    private static String Cors_Path_Mapping;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        Cors_Allowed_Origins = System.getenv("CORS_ALLOWED_ORIGINS");
        Cors_Path_Mapping = System.getenv("CORS_PATH_MAPPING");

        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry
                        .addMapping(Cors_Path_Mapping)
                        .allowedOrigins(Cors_Allowed_Origins);
            }
        };
    }
}
