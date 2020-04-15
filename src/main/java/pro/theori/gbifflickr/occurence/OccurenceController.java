package pro.theori.gbifflickr.occurence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pro.theori.gbifflickr.occurence.model.GbifOccurence;
import pro.theori.gbifflickr.occurence.model.OccurenceResponse;
import pro.theori.gbifflickr.occurence.repository.OccurenceRepository;
import pro.theori.gbifflickr.occurence.util.GbifClient;
import pro.theori.gbifflickr.user.UserService;
import pro.theori.gbifflickr.user.model.GbifFlickrUser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class OccurenceController {

    @Autowired
    private OccurenceRepository occurenceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GbifClient gbifClient;

    @RequestMapping("/occurrences/crawl/by/user/{userId}")
    public HashMap<String, Integer> crawl(
            @PathVariable(value="userId") String userId
    ){
        Integer limit = 100;
        Integer totalCount = 0;
        GbifFlickrUser user = userService.getUserById(userId);
        if(user != null){
            //delete all occurrences recorded by this user to refresh
            List<GbifOccurence> occurences = occurenceRepository.findByRecordedBy(user.getFullName());
            occurenceRepository.deleteAll(occurences);
            //do sequential search in GBIF with offset and limit
            OccurenceResponse occurenceResponse = gbifClient.search(0, limit, user.getFullName());
            totalCount += occurenceResponse.getResults().size();
            occurenceRepository.saveAll(occurenceResponse.getResults());

            while(!occurenceResponse.getEndOfRecords()){
                occurenceResponse = gbifClient.search(occurenceResponse.getOffset()+limit, limit, user.getFullName());
                totalCount += occurenceResponse.getResults().size();
                occurenceRepository.saveAll(occurenceResponse.getResults());
            }
            HashMap<String, Integer> result = new HashMap<>();
                    result.put("total count",totalCount);
            return result;
        }

        return null;
    }

    @RequestMapping("/occurrences/by/user/{userId}")
    public List<GbifOccurence> occurencesByUser(
            @PathVariable(value="userId") String userId
    ){
        GbifFlickrUser user = userService.getUserById(userId);
        if(user != null){
            return occurenceRepository.findByIdentifiedBy(user.getFullName());
        }
        return new ArrayList<>();
    }
}
