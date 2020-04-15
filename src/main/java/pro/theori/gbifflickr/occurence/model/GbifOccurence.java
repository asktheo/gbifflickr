package pro.theori.gbifflickr.occurence.model;

import java.util.List;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "occurence")

public class GbifOccurence {

    @Id
    private ObjectId _id;

    private Long key;
    private String datasetKey;
    private String publishingOrgKey;
    private String installationKey;
    private String publishingCountry;
    private String protocol;
    private String lastCrawled;
    private String lastParsed;
    private Integer crawlId;
    private String basisOfRecord;
    private Integer individualCount;
    private Integer taxonKey;
    private Integer kingdomKey;
    private Integer phylumKey;
    private Integer classKey;
    private Integer orderKey;
    private Integer familyKey;
    private Integer genusKey;
    private Integer speciesKey;
    private Integer acceptedTaxonKey;
    private String scientificName;
    private String acceptedScientificName;
    private String kingdom;
    private String phylum;
    private String order;
    private String family;
    private String genus;
    private String species;
    private String genericName;
    private String specificEpithet;
    private String taxonRank;
    private String taxonomicStatus;
    private Double decimalLongitude;
    private Double decimalLatitude;
    private Double coordinateUncertaintyInMeters;
    private Integer year;
    private Integer month;
    private Integer day;
    private String eventDate;
    private List<Object> issues = null;
    private String lastInterpreted;
    private String references;
    private String license;
    private List<Object> identifiers = null;
    private List<Object> media = null;
    private List<Object> facts = null;
    private List<Object> relations = null;
    private String geodeticDatum;
    private String _class;
    private String countryCode;
    private String country;
    private String locationAccordingTo;
    private String identifier;
    private String recordedBy;
    private String vernacularName;
    private String locationID;
    private String locality;
    private String gbifID;
    private String occurrenceID;
    private String behavior;
    private String identifiedBy;
    private String taxonID;
}
