package pro.theori.gbifflickr.occurence.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pro.theori.gbifflickr.occurence.model.*;

import java.util.List;

public interface OccurenceRepository extends MongoRepository<GbifOccurence, Object> {
    List<GbifOccurence> findByIdentifiedBy(String IdentifiedBy);
    List<GbifOccurence> findByRecordedBy(String recordedBy);
}
